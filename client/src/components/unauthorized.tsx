import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function Unauthorized() {
  const location = useLocation();
console.log("unauthorized component called");

  return (
    <div className='container flex flex-col space-y-6 max-w-screen-lg'>
      <h1 className='text-center font-semibold text-red-700'>
         Unauthorized access to { location.pathname }. Please
        <Link className='text-blue-700 text-center font-semibold underline'to='/login'> login</Link>
      </h1> 
    </div>
  )
}
