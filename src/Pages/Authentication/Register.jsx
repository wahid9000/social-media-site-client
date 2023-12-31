import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, loading } = useContext(AuthContext)
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const response = createUser(data);
        console.log(response);
        toast.success("Registration Successful. Please Login");
        navigate('/login');
        reset();
    }

    return (
        <div className="card flex-shrink-0 w-full mx-auto mt-20 max-w-sm shadow-2xl bg-base-100">
            <div className="text-center p-4">
                <h2 className="text-3xl font-bold">Sign Up</h2>
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <input type="text" id="user_name" placeholder="*Enter your Username" className="input input-bordered"  {...register("user_name", {
                            required: true,
                            pattern: /^[A-Za-z][A-Za-z0-9]*$/,
                        })} required autoComplete="off" />
                        {errors.user_name && <span className="mt-2 text-red-500">Username should start with Letter</span>}
                    </div>

                    <div className="form-control">
                        <input type="email" id="email" placeholder="*Enter your Email" className="input input-bordered" {...register("email", { required: true })} required autoComplete="off" />
                        {errors.email && <span className="mt-2 text-red-500">Provide Your Email</span>}
                    </div>

                    <div className="form-control">
                        <input type="password" id="password" placeholder="*Enter your Password" className="input input-bordered" {...register("password", {
                            required: true,
                            minLength: 8,
                            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                        })}
                            required autoComplete="off" />
                        {errors.password && <span className="mt-2 text-red-500">Password must contain at least 8digits having one uppercase letter, one lowercase letter, one digit, and one special character.</span>}
                    </div>

                    <input type="submit" value={loading ? "Signing Up..." : "Sign Up"} disabled={loading} className="btn btn-sm btn-primary bg-blue-600 text-white btn-block mt-4" />
                </form>
                <p className="mb-3">Already Have an Account? Please <Link to={'/login'} className="text-blue-600">Sign In</Link></p>
            </div>

        </div>
    );
};

export default Register;