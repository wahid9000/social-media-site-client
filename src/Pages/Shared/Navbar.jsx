import { FaHome } from 'react-icons/fa';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import useProfile from '../../Hooks/useProfile';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const Navbar = () => {
    const user = useProfile();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout?',
            text: "You will be redirected to the Login page",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
        Cookies.remove("user");
        navigate('/login');
        Swal.fire(
            'Success',
            'Logout successful',
            'success'
          )
        }
      })
    };
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a><FaHome></FaHome></a></li>
                        <li><a><IoIosNotificationsOutline></IoIosNotificationsOutline></a></li>
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost normal-case text-xl">Social media</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-2xl">
                    <li><a><FaHome></FaHome></a></li>
                    <li><a><IoIosNotificationsOutline></IoIosNotificationsOutline></a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>

                    {
                        user ? <div className="flex justify-center items-center">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
                                </div>
                            </label>
                            <button onClick={handleLogout} className='btn btn-sm btn-primary text-white'>Logout</button>
                        </div> : <div className='flex justify-center items-center'>
                            <Link to={'/login'}><button className='btn btn-sm btn-primary text-white'>Login</button></Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;