import { useForm } from "react-hook-form";
import MainModal from "./MainModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const UpdatePostModal = ({ isOpen, setIsOpen, post, refetch, closeModal}) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { data: postData } = useQuery({
        queryKey: ['post', post?.id],
        queryFn: async () => {
            const res = await axios.get(`http://127.0.0.1:3333/posts/${post?.id}`)
            return res?.data;
        }
    })

    const onSubmit = async (data) => {
        try {  
          
          const res = await axios.put(`http://localhost:3333/posts/${post?.id}`, data, {withCredentials: true});
      
          if (res.status === 200) {
            toast.success("Post updated successfully");
            console.log('Post updated successfully');
            refetch();
            closeModal();
          } else {
            console.error('Failed to update the post');
          }
        } catch (error) {
          console.error('An error occurred while updating the post:', error);
        }
      };

    return (
        <div>
            <MainModal isOpen={isOpen} setIsOpen={setIsOpen} title={"Update Post"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <textarea type="text" id="post_details" defaultValue={postData?.post_details} className="textarea textarea-bordered h-60 textarea-lg w-full" placeholder="What's on your mind..." {...register("post_details", { required: true })} />
                        {errors.post_details && <span className="mt-2 text-red-500">Please add your post!</span>}
                    </div>

                    <input type="submit" className="btn btn-sm btn-primary bg-blue-600 text-white btn-block mt-4" />
                </form>

            </MainModal>
        </div>
    );
};

export default UpdatePostModal;