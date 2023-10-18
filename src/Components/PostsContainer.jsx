import moment from "moment/moment";
import { BiComment, BiLike, BiShare, BiSolidLike } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

const PostsContainer = ({ postsData }) => {
    return (
        <div>
            {
                postsData?.map(post => (
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
                            <div className="dropdown dropdown-end">
                                <p tabIndex={0} className="cursor-pointer"><BsThreeDots></BsThreeDots></p>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Edit Post</a></li>
                                    <li><a>Delete Post</a></li>
                                </ul>
                            </div>
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
        </div>

    );
};

export default PostsContainer;