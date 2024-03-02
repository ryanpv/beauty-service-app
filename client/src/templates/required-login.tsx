import React from 'react'
import { Link } from 'react-router-dom';
import Unauthorized from '../components/unauthorized';

export default function RequiredLogin() {
  return (
    <>
      <Unauthorized />
      
      <div className='container flex mt-10 text-xl'>
        <div className='flex flex-1 flex-col justify-center'>
          <div className='mx-auto font-bold'>
            <h2>An account with us is required in order to use the online booking feature.</h2>
          </div>

          <div className='mx-auto'>
            <p>You can follow this link to <Link to='/services' className='font-bold text-pink-300 hover:text-pink-700'>signup</Link></p>
          </div>

          <div className='mx-auto'>
            <p>For any other questions/concerns you can use our <Link to='/contact' className='font-bold text-pink-300 hover:text-pink-700'>contact page</Link></p>
          </div>      

          <div className='mt-10 text-center'>
            <Link to='/login' className='font-semibold text-pink-300 hover:text-pink-900'>Go to the login page</Link>
          </div>
        </div>
      </div>
    </>
  )
}
