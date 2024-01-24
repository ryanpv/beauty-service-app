import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

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
            console.log("sijgnup cookie: ", document.cookie)
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
      setError("Error signing up");
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

          { error !== "" && <div className='flex justify-center text-red-700 font-semibold'><i>***{ error }***</i></div> }

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
