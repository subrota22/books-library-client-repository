import React, { useContext, useState } from 'react';
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { AuthProvider } from '../../../UserContext/UserContext';
import { toast } from "react-toastify";
import authToken from '../../../hooks/authToken';
import BeatLoader from 'react-spinners/BeatLoader';
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  //navigate
  const navigate = useNavigate();
  //get user data from user context
  const { loginUser, googelSignIn, githubSignIn } = useContext(AuthProvider);

  //save user information in the mongo atlas 
  const createMongoDBUser = (userData: any) => {
    setLoading(true);
    fetch("https://books-libarary.vercel.app/users", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.existed) {
          toast.info(data.existed);
          setLoading(false);
          return;
        }
        if (data.acknowledged) {
          setLoading(false);
          toast.success("Congratulation your account was created successfully 😀 ");
          navigate("/");
        }
      }).catch(error => {
        setLoading(false);
        console.log(" Error: ", error)
      })
  }

  //submit form data 
  const onSubmit = (userFormData: any) => {
    //create new user email and password based 
    setLoading(true);
    loginUser(userFormData.email, userFormData.password)
      .then((result: any) => {
        const name = result?.user?.displayName;
        const email = result?.user?.email;
        const profileImage = result?.user?.photoURL;
        authToken(email);
        toast.success("Congratulation your are login successfully 😀 ");
        createMongoDBUser({ name: name, email: email, profileImage: profileImage, date: new Date() });
        navigate("/");
      }).catch((error: any) => {
        toast.error(error.message, { position: "top-center" });
        setLoading(false);
      })

  }

  //create user by google sign in 
  const handleGoogleSignIn = () => {
    setLoading(true);
    googelSignIn()
      .then((result: any) => {
        toast.success("Congratulation your login successfully by Google 😀 ");
        navigate("/");
        const name = result?.user?.displayName;
        const email = result?.user?.email;
        const profileImage = result?.user?.photoURL;

        authToken(email);
        createMongoDBUser({ name: name, email: email, profileImage: profileImage, date: new Date() });
      })
      .catch(({ error }: any) => {
        if (error) { setLoading(false); toast.error(error.message); }
      })
  }


  //create user by google sign in 
  const handleGithubSignIn = () => {
    setLoading(true);
    toast.success("Congratulation your login successfully by Github 😀 ")
    navigate("/");
    githubSignIn()
      .then((result: any) => {
        console.log("result", result);
        const name = result?.user?.displayName;
        const email = result?.user?.email;
        const profileImage = result?.user?.photoURL;
        authToken(email);
        createMongoDBUser({ name: name, email: email, profileImage: profileImage, date: new Date() });

      })
      .catch((error: any) => {
        if (error) { setLoading(false) }
        toast.error(error.message);
      })
  }

  return (
    <>
      <Helmet>
        <title>Login page </title>
      </Helmet>

      <div className="hero min-h-96 my-8"  >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div data-aos="fade-left">
            <img src="https://i.ibb.co/yRVxQkH/register.png"
              alt="login" className='bg-base-100  h-screen w-full ' />
          </div>
          <div className="card flex-shrink-0 w-full rounded-none max-w-lg  shadow-2xl" data-aos="fade-right">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full text-info">
              <h2 className='text-2xl text-center my-1 animate-pulse uppercase'>Login now !</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="Please enter your  email" {...register("email", {
                  required: true,
                })} className="input input-bordered" />
                {errors.email && <p className='bg-error p-3 rounded-md text-white
               my-3'> Please enter your email address before submit this form  </p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="Please enter your password"
                  {...register("password", {
                    required: true
                  })}
                  className="input input-bordered" />

                {errors.password && <p className='bg-error p-3 rounded-md text-white
           my-4'> Please enter password before submit this form  </p>}
              </div>


              <NavLink to="/register" >
                <label className="flex my-3 hover:cursor-pointer">
                  <span> Have no account new  please ? </span>
                  <span className='mx-2'>  Register  </span>
                </label>
              </NavLink>

              <NavLink to="/reset-password" >
                <label className="flex my-3 hover:cursor-pointer">
                  <span> If you forgot password click on ? </span>
                  <span className='mx-2'>  forgot password  </span>
                </label>
              </NavLink>
              <div className="form-control mt-6">
                <button className="btn btn-primary text-primary" type='submit'>
                  {
                    loading ? <div className='text-sm'>
                      <BeatLoader color="white" />
                    </div> : "Login"
                  }
                </button>
              </div>
              <div className="divider">Or sign in with </div>
              <div className='btn btn-primary rounded-md flex justify-between' onClick={handleGoogleSignIn}>
                <>
                  <FcGoogle className='text-2xl'> </FcGoogle>
                  <span> Google </span>
                </>


              </div>
              <div className='btn btn-primary rounded-md flex justify-between'
                onClick={handleGithubSignIn}>
                <BsGithub className='text-2xl'> </BsGithub>
                <span> Github  </span>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;