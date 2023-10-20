import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {loggedUser, loading} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const response = loggedUser(data);
        console.log(response);
        toast.success("Login Successful");
        navigate('/');
        reset();
    }

    return (
        <div className="card flex-shrink-0 w-full mx-auto mt-20 max-w-sm shadow-2xl bg-base-100">
            <div className="text-center p-4">
                <h2 className="text-3xl font-bold">Sign In</h2>
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <input type="email" id="email" placeholder="*Enter your Email" className="input input-bordered" {...register("email", { required: true })} required autoComplete="off" />
                        {errors.email && <span className="mt-2 text-red-500">Provide Your Email</span>}
                    </div>

                    <div className="form-control">
                        <input type="password" id="password" placeholder="*Enter your Password" className="input input-bordered" {...register("password", {
                            required: true,
                            minLength: 8,
                        })}
                            required autoComplete="off" />
                        {errors.password && <span className="mt-2 text-red-500">Incorrect Password. Please Try Again.</span>}
                    </div>

                    <input type="submit" value={loading ? "Signing In..." : "Sign In"} disabled={loading} className="btn btn-sm btn-primary bg-blue-600 text-white btn-block mt-4" />
                </form>

                <p className="mb-3">New To Social media? Please <Link to={'/register'} className="text-green-600">Sign Up</Link></p>
            </div>

        </div>
    );
};

export default Login;