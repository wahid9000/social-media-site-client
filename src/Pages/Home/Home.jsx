import { useQuery } from "@tanstack/react-query";
import PostsContainer from "../../Components/PostsContainer";
import axios from "axios";
import { useState } from "react";
import AddPostModal from "../../Components/Modals/AddPostModal";

const Home = () => {
    let [isOpen, setIsOpen] = useState(false)
    const { data: postsData, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axios.get('http://127.0.0.1:3333/posts')
            return res.data.data;
        }
    })
    function closeModal() {
        setIsOpen(false)
    }
    return (
        <div className="bg-slate-200 min-h-screen">
            <div className="w-2/6 mx-auto">

                <div className="bg-white p-8 rounded-b-2xl flex justify-between gap-4">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-20 rounded-full">
                            <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
                        </div>
                    </label>
                    <div onClick={() => setIsOpen(!isOpen)} className="input bg-slate-200 flex items-center justify-start rounded-full cursor-pointer input-bordered w-full">
                        <p>{"What's on your mind..."}</p>
                    </div>
                    <AddPostModal refetch={refetch} closeModal={closeModal} isOpen={isOpen} setIsOpen={setIsOpen}></AddPostModal>
                </div>

                <div>
                    <PostsContainer postsData={postsData}></PostsContainer>
                </div>

            </div>
        </div>
    );
};

export default Home;