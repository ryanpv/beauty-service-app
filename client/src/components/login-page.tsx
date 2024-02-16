import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/state-contexts';
import { BarLoader } from 'react-spinners';
import { setUser } from '../utils/set-user';

export default function LoginPage() {
  const { currentUser, setCurrentUser } = useStateContext();
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

      if (loginResponse !== 200) {
        setError("Invalid login credentials");
      } else {
        const decodedUser = setUser();
        setCurrentUser(decodedUser);
        setError("");
        navigate('/');
      }
      
      setLoading(false);
    } catch (error) {
      console.log("Login error: ", error);
      setLoading(false);
      setError("Error with login, please check credentials.");
    }
  };

  return (
    <>
      <div className='container flex'>
        <div className='flex flex-1 flex-col px-6 py-12 lg:px-8'>
          <div className='text-center text-gray-900 sm:py-2 sm:mx-auto sm:w-full sm:max-w-sm'>
            <img
              className='mx-auto h-10 w-auto'
              src={ require('./logo192.png') }
              alt='logo'
            />
            {/* <h2 className='mt-10 text-2xl font-bold text-gray-900'>
              Sign In to your account
            </h2> */}
          </div>

          { error !== "" ? 
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">ERROR: </strong>
            <span className="block sm:inline">{ error }</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
          : null }

        { typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role !== 0 ? <span>already logged in </span> : null }
          <div className='shadow-xl space-y-10 shadow-gray-300 overflow-hidden rounded-sm border border-gray-100 mt-10 p-16 sm:mx-auto sm:w-full sm:max-w-lg sm:min-h-80 text-sm font-medium'>

          {/* <div className='text-center border-2 text-gray-900 sm:py-2 sm:mx-auto sm:w-full sm:max-w-sm'> */}

            <h2 className='text-2xl font-bold text-gray-900'>
              Sign in to your account
            </h2>
          {/* </div> */}
          
            <form className='space-y-8' onSubmit={ submitLogin }>
              <div>
                <label className='font-bold'>
                  Email
                </label>
                <div className='mt-2'>
                  <input 
                    className='block w-full py-2.5 px-3.5 border-0 transition-all duration-300 rounded-sm ring-pink-300 focus:ring-gray-300 focus:ring-offset-2 ring-2 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                    required
                    type='email'
                    name='email'
                    onChange={ handleInput }
                  />
                </div>
              </div>

              <div>
                <div className='flex justify-between'>
                  <label className='font-bold'>
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
                    className='block w-full py-2.5 px-3.5 border-0 transition-all duration-300 rounded-sm ring-pink-300 focus:ring-gray-300 focus:ring-offset-2 ring-2 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                    required
                    type='password'
                    name='password'
                    onChange={ handleInput }
                  />
                </div>
              </div>

              { loading ? <div className='flex justify-center'><BarLoader color='#fbb6ce' /></div> :
              <div className='pt-4'>
                <button
                  type='submit'
                  className='flex w-full bg-pink-300 justify-center rounded-sm ring-2 ring-pink-300 hover:ring-pink-400 py-2.5 px-3.5 text-white hover:bg-pink-400 font-semibold'>
                    Sign In
                  </button>
              </div> }
                
            </form>
          </div>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Don't have an account? {' '}
            <a href='/signup' className='font-semibold text-sm text-pink-300 hover:text-pink-900'>
              Sign up here
            </a>
          </p>

        </div>
      </div>
    </>
  )
}
