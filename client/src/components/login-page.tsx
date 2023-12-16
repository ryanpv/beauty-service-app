import React from 'react'

export default function LoginPage() {

  return (
    <div className='container flex h-screen'>
      <div className='flex m-auto flex-1 flex-col px-6 py-12 lg:px-8 border-solid border-2 border-pink-300 rounded-md'>
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

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-sm font-medium border-solid border-2'>

          <form className='space-y-6' action='#'>
            <div>
              <label className=''>
                Email Address
              </label>
              <div className='mt-2'>
                <input 
                  className='block w-full py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
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
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full bg-pink-300 justify-center rounded-md px-3 py-1.5 text-white hover:bg-pink-200 font-semibold'>
                  Sign In
                </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Don't have an account? {' '}
            <a href='#' className='font-semibold text-sm text-pink-300 hover:text-pink-900'>
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
