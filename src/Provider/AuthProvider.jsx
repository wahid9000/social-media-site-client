import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    let [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const createUser = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, data);
            if (response.status === 200) {
                const userData = response.data;
                
                console.log(userData);
            } else {
                console.log("Error Occured");
                toast.error("Error Occured")
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error("Error Occcured")
        } finally{
            setLoading(false)
        }
    }

    const loggedUser = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, data);
            if (response.status === 200) {
                const userData = response.data;
                setUser(userData)
                console.log(userData);
                Cookies.set("user", JSON.stringify(userData));
                localStorage.setItem("user", JSON.stringify(userData))
            } else {
                console.log("Error Occured");
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally{
            setLoading(false);
        }
    }

    const logoutUser = () => {
        setUser(null)
        Cookies.remove("user");
        localStorage.removeItem('user')
    }


    const authInfo = {
        createUser,
        loggedUser,
        logoutUser,
        user,
        setUser,
        loading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;