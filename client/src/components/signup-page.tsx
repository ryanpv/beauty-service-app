import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { useStateContext } from '../contexts/state-contexts';
import { setUser } from '../utils/set-user';

export default function SignupPage() {
  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
  const navigate = useNavigate();
  type SignupForm = {
    email: string;
    phone_number: string;
    password: string;
    confirm_password: string;
  };

  const [signupFormData, setSignupFormData] = useState<SignupForm>({
    email: "",
    phone_number: "",
    password: "",
    confirm_password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setCurrentUser } = useStateContext();

  const handleFormInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (signupFormData.password.length < 8) {
        setError("Minimum password length is 8 characters");
        setLoading(false);
        return ;
      } else if (
        signupFormData.password === signupFormData.confirm_password
        && signupFormData.password !== ""
        && signupFormData.confirm_password !== ""
        ) {
          const signUp = await fetch(`${ serverUrl }/users`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(signupFormData)
          });
    
          const responseStatus = await signUp.status;
    
          if (responseStatus === 201) {
            const decodedUser = setUser();
            setCurrentUser(decodedUser);

            navigate("/")
          } else if (responseStatus === 409) {
            console.log("User already exists.");
            setError("User already exists.");
          } else { 
            throw Error;
          }
        } else {
          console.log("passwords do not match")
          setError("Passwords do not match.");
        }

      setLoading(false);
    } catch (error) {
      console.log("Error with signup: ", error); 
      setError("Unable to signup. Please try again later.");
      setLoading(false);
  }
};

  return (
    <div className='container flex flex-col px-6 py-12 max-w-md sm:max-w-lg'>
      <div className='text-center text-gray-900 '>
        {/* <img
          className='mx-auto h-10 w-auto'
          src={ require('./logo192.png') }
          alt='logo'
        /> */}
        <h1 className='text-4xl text-[#d64f92] font-semibold'>PolishByCin</h1>
      </div>

      <div className='border border-pink-100 rounded bg-pink-100 space-y-6 mt-10 py-16 px-8 sm:mx-auto sm:w-full sm:w-full sm:max-w-lg shadow-xl shadow-gray-300'>
        
        <div className='text-gray-600'>
          <h1 className='text-2xl font-bold text-[#d64f92]'>Create an account</h1>
          <p><i>Track your appointments or request a new one!</i></p>
        </div>
        
        <form className='space-y-6' onSubmit={ submitSignup }>
          <div>
            <label className='font-semibold text-gray-600'>Full Name</label>
            <input 
              className='block mt-2 w-full py-1.5 px-2.5 border-0 transition-all duration-300 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='name'
              type='text'
              onChange={ handleFormInputs }
            />
          </div>

          <div>
            <label className='font-semibold text-gray-600'>Email</label>
            <input 
              className='block mt-2 w-full py-1.5 px-2.5 border-0 transition-all duration-300 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='email'
              type='email'
              onChange={ handleFormInputs }
            />
          </div>

          <div>
            <label className='font-semibold text-gray-600'>Phone Number</label>
            <input 
              className='block mt-2 w-full py-1.5 px-2.5 border-0 transition-all duration-300 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='phone_number'
              type='text'
              onChange={ handleFormInputs }
            />
          </div>

          <div>
            <label className='font-semibold text-gray-600'>Password</label>
            <input 
              className='block mt-2 w-full py-1.5 px-2.5 border-0 transition-all duration-300 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='password'
              type='password'
              onChange={ handleFormInputs }
            />
          </div>

          <div>
            <label className='font-semibold text-gray-600'>Confirm Password</label>
            <input 
              className='block mt-2 w-full py-1.5 px-2.5 border-0 transition-all duration-300 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='confirm_password'
              type='password'
              onChange={ handleFormInputs }
            />
          </div>

          { loading ? <div className='flex justify-center'><BarLoader color='#fbb6ce' /></div> :
          <div className='pt-4'>
            <button
              type='submit'
              className='flex w-full bg-pink-700 justify-center rounded-full ring-2 ring-pink-700 hover:ring-pink-400 px-3.5 py-2.5 text-white hover:bg-pink-400 font-semibold'            
            >Create account</button>
          </div>
          }
        </form>

        { error !== "" && 
          <>
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-1.5 rounded relative" role="alert">
            <strong className="font-bold">ERROR: </strong>
            <span className="block sm:inline">{ error }</span>
          </div>
          </>
        }
      </div>

    <div className='mt-10 text-center text-sm text-gray-500'>
      Have an account? {' '}
      <Link to='/login' className='font-semibold text-sm text-pink-400 hover:text-pink-900'>Go to the login page</Link>
    </div>

    </div>
  )
}
