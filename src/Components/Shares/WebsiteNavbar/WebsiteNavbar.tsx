import  { useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import logo from "../../../assets/book_store_logo.jpg";
import { AuthProvider } from '../../../UserContext/UserContext';
const WebsiteNavbar = () => {
    const { user, signOutUser, setUser } = useContext(AuthProvider);
    const navigate = useNavigate() ;
    const accountLogOut = () => {
        signOutUser();
        setUser({});
        toast.success("Your account log out successfully !! ");
        navigate("/") ;
    }
    const menu = <>
            <li><NavLink to="/">Home</NavLink></li>
        {
            user.uid && <>
                <li><NavLink to="/my-books"> My books </NavLink></li>
                <li><NavLink to="/add-books"> Add books </NavLink></li>
                <li><NavLink to="/all-books"> All books </NavLink></li>
                <li><NavLink to="/our-users"> Our users </NavLink></li>
                <li><button onClick={() => accountLogOut()} className='btn btn-success text-white mx-8 text-md py-4 '> Log Out </button></li>
            </>
        }
        <> {
            !user.uid && <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
            </>
        } </>

    </>
    return (
        <>
            <div className="navbar text-lg font-bold shadow-lg py-5" data-aos="fade-down">
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menu}
                        </ul>
                    </div>
                    <NavLink to="/" className="normal-case text-xl  py-2">
                        <img src={logo} alt="logo" className='w-14 h-14 Navphoto animate-pulse duration-700    rounded-full border-2 border-indigo-600 ' />
                    </NavLink>
                </div>
                <div className="navbar-center navLinkResponsive ">
                    <ul className="menu menu-horizontal px-1">
                     {menu}       
                    </ul>
                </div>

                {
                    user.uid &&
                    <>
                        <div className="tooltip tooltip-info pro  float-end tooltip-left hidden lg:block ml-40" data-tip={user?.displayName}>
                            <div className="avatar Navphoto rounded-full">
                           <NavLink to="/profile">
                           <div className="mx-4 rounded-full h-16 w-16  border-primary border-2">
                                    <img src={user?.photoURL ? user?.photoURL : "https://i.ibb.co/RSCmwXf/imagenot.jpg"} alt='user' className='rounded-full h-16 w-16' />
                                </div>
                           </NavLink>
                            </div>
                        </div>
                    </>
                }


            </div>
        </>
    );
};

export default WebsiteNavbar;