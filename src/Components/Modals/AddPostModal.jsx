import { useForm } from "react-hook-form";
import MainModal from "./MainModal";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AddPostModal = ({ isOpen, setIsOpen, closeModal, refetch }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const user =  JSON.parse(localStorage.getItem("user"))
    console.log(user);
    const [loading, setLoading] = useState(false)

    const onSubmit = async(data) => {
        const post_data = { user_id: user?.id, ...data }
        setLoading(true)
        try {
            const response = await axios.post('http://127.0.0.1:3333/posts', post_data, {withCredentials: true})
            console.log(response);
            refetch();
            if (response.status === 200) {
                toast.success("Post created successfully")
                closeModal();
                reset();
            } else {
                toast.error('Failed to create the post')
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error("Something errror occured")
        } finally{
            setLoading(false)
        }
    }

    return (
        <div>
            <MainModal isOpen={isOpen} setIsOpen={setIsOpen} title={"Create Post"}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control">
                        <textarea type="text" id="post_details" className="textarea textarea-bordered h-60 textarea-lg w-full" placeholder="What's on your mind..." {...register("post_details", { required: true })} />
                        {errors.post_details && <span className="mt-2 text-red-500">Please add your post!</span>}
                    </div>

                    <input type="submit" value={loading ? "Creating Post..." : "Post"} disabled={loading} className="btn btn-sm btn-primary bg-blue-600 text-white btn-block mt-4" />

                </form>
            </MainModal>
        </div>
    );
};

export default AddPostModal;