import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import BeatLoader from 'react-spinners/BeatLoader';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../UserContext/UserContext';


const ResetPassword = () => {
  const { resetPassword } = useContext(AuthProvider);
  const [resetLoad, setResetLoad] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setResetLoad(true);
    const email = event.target.email.value;
    resetPassword(email)
      .then(() => {
        toast.success("Please check your inbox or spam to reset your password.");
        setResetLoad(false);
      })
      .catch(error => { toast.error(error.message); setResetLoad(false); });

  }
  return (
    <>
      <Helmet><title>Reset password </title></Helmet>
      <div className="my-5 ">
          <div style={{ width: "30%" }} className="bg-success text-white shadow-md text-xl rounded-sm  text-center  m-auto uppercase fw-bolder py-6"> Reset password  </div>
          <form autoComplete='off' style={{ width: "30%" }} className='was-validated border rounded-sm shadow-md   w mx-auto rounded-2 p-3 text-white' onSubmit={handleSubmit}>
            <div className="my-5">
              <input type="email" name='email' id="email" className='input input-border input-info w-full' placeholder="Enter your valid email address" required />
            </div>


            <div>
              <div className="d-flex my-4">
                <input id="remember" type="checkbox" className='form-check-input' required />
                <label for="remember" className="ml-2 mx-2 text-sm form-check-label"> Agree to change password </label>
              </div>
            </div>

            <button type="submit" className="text-white px-5 py-2 my-3 btn btn-info">
              {resetLoad ? <BeatLoader color="white" /> : "Send reset password request"}

            </button>

          </form>
        </div>

    </>
  );
};

export default ResetPassword;