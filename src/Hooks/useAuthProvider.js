import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAuthProvider = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (url, data, successMessage, errorMessage, redirectPath) => {
    setLoading(true);
    try {
      const response = await axios.post(url, data);
      if (response.status === 200) {
        toast.success(successMessage);
        reset();
        navigate(redirectPath);
      } else {
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast('An error occurred. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return { register, handleSubmit, onSubmit, loading, errors };
};

export default useAuthProvider;