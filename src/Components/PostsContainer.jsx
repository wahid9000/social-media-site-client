import moment from "moment/moment";
import { BiComment, BiLike, BiShare, BiSolidLike } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import useProfile from "../Hooks/useProfile";
import UpdatePostModal from "./Modals/UpdatePostModal";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PostsContainer = ({ postsData, refetch }) => {
    const user = useProfile();
    let [isOpen, setIsOpen] = useState(false);
    const [updatePost, setUpdatePost] = useState(null)

    const openUpdateModal = (post) => {
        setIsOpen(!isOpen)
        setUpdatePost(post)
    }
    function closeModal() {
        setIsOpen(false)
    }

    const handleDelete = async (post_id) => {
        try {
          const response = await axios.delete(`http://127.0.0.1:3333/posts/${post_id}`);
          if (response.status === 200) {
            toast.success("Post deleted successfully");
            refetch()
            console.log('Post deleted successfully');
          } else {
            console.error('Failed to delete the post');
          }
        } catch (error) {
          console.error('An error occurred while deleting the post:', error);
        }
      };

    return (
        <div>
            {postsData?.map(post => (
                <div key={post?.id} className="bg-white mt-6 rounded-2xl p-4">
                    <div className="flex justify-between">
                        <div className="flex gap-4">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-20 rounded-full">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
                                </div>
                            </label>
                            <div>
                                <h4>{post?.users?.user_name}</h4>
                                <p className="text-sm">{moment(post.created_at).startOf('day').fromNow()}</p>
                            </div>
                        </div>
                        {
                            post?.user_id === user?.id &&
                            <div className="dropdown dropdown-end cursor-pointer">
                                <p tabIndex={0} className="cursor-pointer"><BsThreeDots></BsThreeDots></p>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li onClick={() => openUpdateModal(post)}>Edit Post</li>
                                    <li onClick={() => handleDelete(post?.id)} >Delete Post</li>
                                </ul>
                            </div>
                        }
                        
                    </div>
                    <div className="mt-4">
                        <p>{post?.post_details}</p>
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                        <div className=" flex items-center gap-1"><BiSolidLike className="text-blue-500 text-xl"></BiSolidLike>{post.meta.totalLikes}</div>
                        {
                            post?.meta?.totalComments === 0 ? "" : <div className="flex items-center gap-1"><p>{post?.meta?.totalComments} comments</p></div>
                        }
                    </div>
                    <div className="divider"></div>
                    <div className="flex justify-between items-center px-4 pb-4">
                        <div className="cursor-pointer">
                            <p className="flex gap-1 items-center"><BiLike className="text-xl"></BiLike>Like</p>
                        </div>
                        <div className="cursor-pointer">
                            <p className="flex gap-1 items-center"><BiComment className="text-xl"></BiComment>Comment</p>
                        </div>
                        <div className="cursor-pointer">
                            <p className="flex gap-1 items-center"><BiShare className="text-xl"></BiShare>Share</p>
                        </div>
                    </div>
                </div>
            ))
            }
            <UpdatePostModal closeModal={closeModal} isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} post={updatePost}/>
            
        </div>

    );
};

export default PostsContainer;