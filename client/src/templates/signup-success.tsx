import React from 'react';
import { Link } from 'react-router-dom';


const SignupSuccess = () => {
  return (
    <div className='container flex mt-10'>
      <div className='flex flex-1 flex-col justify-center'>
        <div className='mx-auto font-bold'>
          <h2>Sign up is successful</h2>
        </div>

        <div className='mx-auto'>
          <p>Thank you for signing up!</p>
        </div>
        
        <div className='mx-auto'>
          <p>You can check out offered nail services <Link to='/services' className='font-bold text-pink-300'>Here</Link></p>
        </div>

        <div className='mx-auto'>
          <p>Or send a <Link to='/book-appointment' className='font-bold text-pink-300'>booking request</Link> and we'll respond within 24 hours</p>
        </div>
      </div>
    </div>
  )
};

export default SignupSuccess;