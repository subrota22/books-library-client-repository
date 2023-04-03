import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from 'UserContext/UserContext';

const Profile = () => {
    const { user }: any = useContext(AuthProvider);
    // console.log(user);
    const { sendEmailVerify } = useContext(AuthProvider);
    const [emailVerifyLoad, setEmailVerifyLoad] = useState(false);

    const handleVerifyEmail = (event: any) => {
        event.preventDefault();
        setEmailVerifyLoad(true);
        sendEmailVerify()
            .then(() => {
                toast.success("Please check your inbox or spam to verify your email");
                setEmailVerifyLoad(false);
            })
            .catch((error: any) => { toast.error(error.message); setEmailVerifyLoad(false); });

    }
    return (
        <>
            <Helmet><title>Profile</title></Helmet>
            <div className="card mx-auto text-dark my-12 border-2" style={{ width: "40%" }}>
                <img src={user?.photoURL ? user?.photoURL : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}
                    className="card-img-top rounded-tr-lg rounded-tl-lg"
                    style={{ height: "280px" }}
                    alt="profile_image" />

                <div className="card-body bg-dark text-info fs-4 fw-bolder">
                    <p className="card-text"> Name: {user?.displayName ? user?.displayName : "Name not found"}</p>
                    <p className="card-text"> Email : {user?.email ? user?.email : "Name not found"}</p>
                    <div className="card-text">
                        <div className="container">
                            <div className="row">
                                <div className="d-flex flex-column justify-content-center">
                                    <div className='my-2'>
                                        {user?.emailVerified ?
                                            <button className="btn btn-outline-success mt-2 w-100 mx-2">
                                                Well done email is verified
                                            </button> :

                                            <button type="submit" onClick={handleVerifyEmail} className="text-white px-5 w-100  py-2 mt-2 btn btn-info">
                                                {emailVerifyLoad ? <ClipLoader color='white' className='pb-3 text-center'></ClipLoader> : "Verify email"}

                                            </button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;