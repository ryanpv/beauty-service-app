import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { useStateContext } from '../contexts/state-contexts';
import { setUser } from '../utils/set-user';

export default function SignupPage() {
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
          const signUp = await fetch(`https://localhost:3001/users`, {
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
    <div className='container border-2 flex flex-col px-6 py-12 lg:px-8'>
      <div className='text-center text-gray-900 '>
        <img
              className='mx-auto h-10 w-auto'
              src={ require('./logo192.png') }
              alt='logo'
            />
      </div>

      <div className='border border-gray-100 space-y-6 mt-10 p-16 sm:mx-auto sm:w-full sm:w-full sm:max-w-lg shadow-xl shadow-gray-300'>
        
        <div className='text-gray-900'>
          <h1 className='text-2xl font-bold text-gray-900'>Create an account</h1>
          <p><i>Track your appointments or book a new one</i></p>
        </div>
        
        <form className='space-y-6' onSubmit={ submitSignup }>
          <div>
            <label className='font-semibold'>Full Name</label>
            <input 
              className='block mt-2 w-full py-1.5 px-2.5 border-0 transition-all duration-300 rounded-sm ring-pink-300 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='name'
              type='text'
              onChange={ handleFormInputs }
            />
          </div>

          <div>
            <label className='font-semibold'>Email</label>
            <input 
              className='block mt-2 w-full py-1.5 px-2.5 border-0 transition-all duration-300 rounded-sm ring-pink-300 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='email'
              type='email'
              onChange={ handleFormInputs }
            />
          </div>

          <div>
            <label className='font-semibold'>Phone Number</label>
            <input 
              className='block mt-2 w-full py-1.5 px-2.5 border-0 transition-all duration-300 rounded-sm ring-pink-300 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='phone_number'
              type='text'
              onChange={ handleFormInputs }
            />
          </div>

          <div>
            <label className='font-semibold'>Password</label>
            <input 
              className='block mt-2 w-full py-1.5 px-2.5 border-0 transition-all duration-300 rounded-sm ring-pink-300 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='password'
              type='password'
              onChange={ handleFormInputs }
            />
          </div>

          <div>
            <label className='font-semibold'>Confirm Password</label>
            <input 
              className='block mt-2 w-full py-1.5 px-2.5 border-0 transition-all duration-300 rounded-sm ring-pink-300 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'            
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
              className='flex w-full bg-pink-300 justify-center rounded-sm ring-2 ring-pink-300 hover:ring-pink-400 px-3 py-1.5 text-white hover:bg-pink-400 font-semibold'            
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
      <a href='/login' className='font-semibold text-sm text-pink-300 hover:text-pink-900'>Go to the login page</a>
    </div>

    </div>
  )
}
