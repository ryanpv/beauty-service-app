import React from 'react'

export default function SignupPage() {
  return (
    <div className='container flex flex-col px-6 py-12 lg:px-8 border-solid border-2 border-pink-300'>
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
        <form className='space-y-6'>
          <div>
            <label>Email Address</label>
            <input 
              className='block w-full py-1.5 px-2.5 border-0 rounded-md ring-1 ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'            
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input 
              className='block w-full py-1.5 px-2.5 border-0 rounded-md ring-1 ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'            
            />
          </div>

          <div>
            <label>Password</label>
            <input 
              className='block w-full py-1.5 px-2.5 border-0 rounded-md ring-1 ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'            
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input 
              className='block w-full py-1.5 px-2.5 border-0 rounded-md ring-1 ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'            
            />
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full bg-pink-300 justify-center rounded-md px-3 py-1.5 text-white hover:bg-pink-200 font-semibold'            
            >Continue</button>
          </div>
        </form>
      </div>

    <div className='mt-10 text-center text-sm text-gray-500'>
      Have an account? {' '}
      <a href='/login' className='font-semibold text-sm text-pink-300 hover:text-pink-900'>Go to the login page</a>
    </div>

    </div>
  )
}
