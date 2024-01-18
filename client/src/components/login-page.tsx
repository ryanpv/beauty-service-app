import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/state-contexts';
import { BarLoader } from 'react-spinners';

export default function LoginPage() {
  const { userId, setUserId, currentUser, setCurrentUser } = useStateContext();
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  type LoginForm = {
    email: string;
    password: string;
  };

  const [loading, setLoading] = React.useState(false);
  const [loginFormData, setLoginFormData] = React.useState<LoginForm>({
    email: "",
    password: ""
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginFormData((prev) => {
      return ({
        ...prev,
        [name]: value
      });
    });
  };

  const submitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const login = await fetch(`https://localhost:3001/sessions`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(loginFormData)
      });
  
      const loginResponse = login.status;
  
      if (loginResponse === 200) {
        const cookies = document.cookie.split("; "); 
        const userCookie = cookies?.find((cookie) => cookie.startsWith("user="));
        // const user = userCookie?.split("=")[1].replace("%40", "@");
        const user = userCookie ? userCookie.split("=")[1] : null;

        setCurrentUser(user);
        navigate('/');
      } else {
        throw Error;
      }
      setLoading(false);
    } catch (error) {
      console.log("Login error: ", error);
      setLoading(false);
      setError("Error with login, please check credentials.");
    }
  };

  return (
    <div className='container flex'>
      <div className='flex flex-1 flex-col px-6 py-12 lg:px-8'>
        <div className='text-center text-gray-900 sm:py-2 sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-10 w-auto'
            src={ require('./logo192.png') }
            alt='logo'
          />
          <h2 className='mt-10 text-2xl font-bold text-gray-900'>
            Login Page
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-sm font-medium'>

          <form className='space-y-6' onSubmit={ submitLogin }>
            <div>
              <label className=''>
                Email Address
              </label>
              <div className='mt-2'>
                <input 
                  className='block w-full py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
                  required
                  type='email'
                  name='email'
                  onChange={ handleInput }
                />
              </div>
            </div>

            <div>
              <div className='flex justify-between'>
                <label className=''>
                  Password
                </label>
                <div>
                  <a href='/request-new-password' className='font-semibold text-sm text-pink-300 hover:text-pink-900'>
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className='mt-2'>
                <input 
                  className='block w-full py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
                  required
                  type='password'
                  name='password'
                  onChange={ handleInput }
                />
              </div>
            </div>

            { loading ? <div className='flex justify-center'><BarLoader color='#fbb6ce' /></div> :
            <div>
              <button
                type='submit'
                className='flex w-full bg-pink-300 justify-center rounded-md px-3 py-1.5 text-white hover:bg-pink-200 font-semibold'>
                  Sign In
                </button>
            </div> }
              
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Don't have an account? {' '}
            <a href='/signup' className='font-semibold text-sm text-pink-300 hover:text-pink-900'>
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
