import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const NewPasswordRequest:React.FC = () => {
  const emailInputRef = React.useRef<HTMLInputElement | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const submitForm = async(event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const emailInputValue = emailInputRef.current!.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (emailRegex.test(emailInputValue)) {
  
        const newPasswordRequest = await fetch("https://localhost:3001/password-resets",{
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email: emailInputValue })
        });
  
        if (newPasswordRequest.status === 404) {
          setError("User does not exist");
        } else if (newPasswordRequest.status === 400) {
          setError("Unable to send password reset request. Please try again later.")
        } else {
          setError("");
          navigate('/login');
        }
      } 

      setLoading(false);
    } catch (error) {
      console.log("Error for password reset: ", error);
      setLoading(false);
      setError("Error resetting password");
    }
  };

  return (
    <div className='container flex'>
      <div className='flex flex-1 flex-col py-12 px-8 max-w-md sm:max-w-lg mx-auto'>
        <div className='shadow-xl space-y-10 bg-pink-100 shadow-gray-300 rounded border border-pink-100 mt-10 w-full px-6 sm:px-10 py-16 mx-auto sm:w-full sm:max-w-md sm:min-h-80 font-medium'>
          <h2 className='font-bold text-2xl'>Request Password Reset</h2>
          <i className='text-pink-700'>Forgot your password? Enter your email address to receive a password reset link.</i>

          <form onSubmit={ submitForm } className='space-y-8'>
            <div>
              <label className='font-semibold'>
                Email Address
              </label>
              <input 
                type='email' 
                ref={ emailInputRef } 
                className='mt-2 block w-full py-2.5 px-3.5 transition-all duration-300 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                />
            </div>

          { loading ? <div className='flex justify-center'><BarLoader color='#fbb6ce' /></div> :
            <div className='pt-4'>
              <button 
                type='submit'
                className='flex w-full bg-pink-300 justify-center rounded-full ring-2 ring-pink-300 hover:ring-pink-400 py-2.5 px-3.5 text-white hover:bg-pink-400 font-semibold'
                >Submit Request
              </button>
            </div> }
          </form>

            { error !== "" ? 
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">ERROR: </strong>
                <span className="block sm:inline">{ error }</span>
              </div>
              : null 
            }
        </div>
        
        <Link to='/login' className='mt-10 text-center font-semibold text-md text-pink-400 hover:text-pink-900'>
          Return to login
        </Link>
      </div>
    </div>
  )
};

export default NewPasswordRequest;
