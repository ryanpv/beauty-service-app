import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/state-contexts';
import { BarLoader } from 'react-spinners';
import { setUser } from '../utils/set-user';

export default function LoginPage() {
  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
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
      const login = await fetch(`${ serverUrl }/sessions`, {
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
        <div className='flex flex-1 flex-col py-12 px-8 max-w-md sm:max-w-lg mx-auto'>
          <div className='text-center sm:py-2 sm:mx-auto sm:max-w-sm'>
            {/* <img
              className='mx-auto h-10 w-auto'
              src={ require('./logo192.png') }
              alt='logo'
            /> */}
            <h1 className='text-4xl text-[#d64f92] font-semibold'>PolishByCin</h1>
          </div>

        { typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role !== 0 ? <span>already logged in </span> : null }
          <div className='shadow-xl space-y-10 bg-pink-100 shadow-gray-300 rounded border border-pink-100 mt-10 w-full px-6 sm:px-10 py-16 mx-auto sm:w-full sm:max-w-md sm:min-h-80 font-medium'>

          {/* <div className='text-center border-2 text-gray-900 sm:py-2 sm:mx-auto sm:w-full sm:max-w-sm'> */}

            <h2 className='text-2xl font-bold text-[#d64f92]'>
              Sign in to your account
            </h2>
          {/* </div> */}
          
            <form className='space-y-8' onSubmit={ submitLogin }>
              <div>
                <label className='font-semibold text-gray-600'>
                  Email
                </label>
                <div className='mt-2'>
                  <input 
                    className='block w-full py-2.5 px-3.5 transition-all duration-300 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                    required
                    type='email'
                    name='email'
                    onChange={ handleInput }
                  />
                </div>
              </div>

              <div>
                <div className='flex justify-between'>
                  <label className='font-semibold text-gray-600'>
                    Password
                  </label>
                  <div>
                    <Link to='/request-new-password' className='font-semibold text-sm text-pink-400 hover:text-pink-900'>
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div className='mt-2'>
                  <input 
                    className='block w-full py-2.5 px-3.5 border-0 transition-all duration-300 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
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
                  className='flex w-full bg-pink-700 justify-center rounded-full ring-2 ring-pink-700 hover:ring-pink-400 py-2.5 px-3.5 text-white hover:bg-pink-400 font-semibold'>
                    Sign In
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

          <p className='mt-10 text-center text-sm text-gray-500'>
            Don't have an account? {' '}
            <Link to='/register' className='font-semibold text-sm text-pink-400 hover:text-pink-900'>
              Sign up here
            </Link>
          </p>

        </div>
      </div>
    </>
  )
}
