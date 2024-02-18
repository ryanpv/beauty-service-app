import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const ResetPassword:React.FC = () => {
  const newPassRef = React.useRef<HTMLInputElement | null>(null);
  const confirmNewPassRef = React.useRef<HTMLInputElement | null>(null);
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('recovery-token');

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  
  const seeValue = (event: React.FormEvent) => {
    event.preventDefault();
    const newPassVal = newPassRef.current?.value;
    console.log(newPassVal);
  };

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const newPassValue = newPassRef.current?.value;
      const confirmPassValue = confirmNewPassRef.current?.value;
  
      if (newPassValue !== undefined && newPassValue === confirmPassValue) {
        const resetPassword = await fetch(`https://localhost:3001/password-resets/${ token }`,{
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ newPassword: newPassValue })
        });
  
        if (resetPassword.status === 201) {
          setError("");
          navigate('/password-reset-success')
        } else {
          throw new Error();
        }
  
      } else {
        setError("Passwords do not match.");
      }
      
      newPassRef.current!.value = '';
      confirmNewPassRef.current!.value = '';

      setLoading(false);
    } catch (error) {
      setError("Unable to reset password. Please try again later");
      setLoading(false);
    }
  };


  return (
    <div className='container flex'>
      <div className='flex flex-1 flex-col py-12 px-8 max-w-md sm:max-w-lg mx-auto'>
        <div className='shadow-xl space-y-10 bg-pink-100 shadow-gray-300 rounded border border-pink-100 mt-10 w-full px-6 sm:px-10 py-16 mx-auto sm:w-full sm:max-w-md sm:min-h-80 font-medium'>
          <h1 className='font-bold text-2xl'>Reset your password</h1>
          
          <form onSubmit={submitForm} className='space-y-8'>
            <div>
              <label className='font-semibold'>
                New Password
              </label>
              <input 
                type='password' 
                onChange={(e) => seeValue(e)} 
                ref={ newPassRef }
                className='mt-2 block w-full py-2.5 px-3.5 transition-all duration-300 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
              />
            </div>

            <div>
              <label className='font-semibold'>
                Confirm New Password
              </label>
              <input 
                type='password' 
                ref={ confirmNewPassRef }
                className='mt-2 block w-full py-2.5 px-3.5 transition-all duration-300 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
              />
            </div>

            { loading ? <div className='flex justify-center'><BarLoader color='#fbb6ce' /></div> :
            <div className='pt-4'>
              <button 
                type='submit'
                className='flex w-full bg-pink-300 justify-center rounded-full ring-2 ring-pink-300 hover:ring-pink-400 py-2.5 px-3.5 text-white hover:bg-pink-400 font-semibold'
                >Change Password
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
      </div>
    </div>
  )
};

export default ResetPassword;
