import React from 'react'
import { Link } from 'react-router-dom';

export default function UserLoggedIn() {

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Already logged in. </strong>
      <span className="block sm:inline">Back to <Link className='text-blue-700 text-center font-semibold underline'to='/'> home</Link>.</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
      </span>
    </div>
  )
};
