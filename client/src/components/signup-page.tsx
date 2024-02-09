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
    <div className='container flex flex-col px-6 py-12 lg:px-8'>
      <div className='text-center text-gray-900 '>
        <img
              className='mx-auto h-10 w-auto'
              src={ require('./logo192.png') }
              alt='logo'
            />
        <h1 className='mt-10 text-2xl font-bold text-gray-900'>Sign Up</h1>
        <p><i>Create an account to track your appointments or book a new one</i></p>
      </div>

      { error !== "" && 
        <>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">ERROR: </strong>
          <span className="block sm:inline">{ error }</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
        </>
      }

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={ submitSignup }>
          <div>
            <label>Display Name</label>
            <input 
              className='block w-full py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='name'
              type='text'
              onChange={ handleFormInputs }
            />
          </div>

          <div>
            <label>Email</label>
            <input 
              className='block w-full py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='email'
              type='email'
              onChange={ handleFormInputs }
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input 
              className='block w-full py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='phone_number'
              type='text'
              onChange={ handleFormInputs }
            />
          </div>

          <div>
            <label>Password</label>
            <input 
              className='block w-full py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='password'
              type='password'
              onChange={ handleFormInputs }
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input 
              className='block w-full py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'            
              required
              name='confirm_password'
              type='password'
              onChange={ handleFormInputs }
            />
          </div>

          { loading ? <div className='flex justify-center'><BarLoader color='#fbb6ce' /></div> :
          <div>
            <button
              type='submit'
              className='flex w-full bg-pink-300 justify-center rounded-md px-3 py-1.5 text-white hover:bg-pink-200 font-semibold'            
            >Continue</button>
          </div>
          }
        </form>
      </div>

    <div className='mt-10 text-center text-sm text-gray-500'>
      Have an account? {' '}
      <a href='/login' className='font-semibold text-sm text-pink-300 hover:text-pink-900'>Go to the login page</a>
    </div>

    </div>
  )
}
