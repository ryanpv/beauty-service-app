import React,  { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar: FC = () => {
  const navigate = useNavigate();

  const logout = async() => {
    try {
      const logoutRequest = await fetch(`https://localhost:3001/sessions`, {
        method: "DELETE",
        credentials: "include"
      });
  
      if (logoutRequest.status !== 200) {
        throw Error("Failed to logout.")
      } else {
        navigate('/')
      }
    } catch (error) {
      console.log("Logout error: ", error)
    }
  };

  return (
    <>
      <nav className='sticky top-0 min-w-screen flex bg-pink-300 text-white text-center'>
        <div className='flex sm:flex-row flex-col flex-1 justify-between items-center'>

          <div className='grow-0 justify-start items-center px-5 text-2xl'>
            <a href='/'>
              PolishByCin
            </a>
          </div>

          <div className='flex-1'>
            <div className='flex flex-row h-16 items-center px-5 justify-end gap-5'>
              <div className='hover:text-gray-200'>
                <a href='/'>
                  Home
                </a>
              </div>
              <div className=''>
                <a href='/services'>
                  Services
                </a>
              </div>
              <div className=''>
                <Link to='/appointments'>
                  Appointments
                </Link>
              </div>
              <div className=''>
                <a href='/photo-gallery'>
                  Photo Gallery
                </a>
              </div>
              <div className=''>
                <a href='/contact'>
                  Contact
                </a>
              </div>
              <div className=''>
                <a href='/about'>
                  About
                </a>
              </div>
              <div className=''>
                <a href='/login'>
                  Login
                </a>
              </div>
              <div className=''>
                <button
                onClick={ logout }
                >
                  Logout
                </button>
              </div>
              <div className=''>
                <a href='/signup'>
                  Sign Up
                </a>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar