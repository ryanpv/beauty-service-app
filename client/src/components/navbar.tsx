import React,  { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../utils/set-user';
import { useStateContext } from '../contexts/state-contexts';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useStateContext();

  const logout = async() => {
    try {
      const logoutRequest = await fetch(`https://localhost:3001/sessions`, {
        method: "DELETE",
        credentials: "include"
      });
  
      if (logoutRequest.status !== 200) {
        throw Error("Failed to logout.")
      } else {
        const loggedOutUser = setUser();
        setCurrentUser(loggedOutUser);
        navigate('/');
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
            <Link to='/'>
              PolishByCin
            </Link>
          </div>

          <div className='flex-1'>
            <div className='flex flex-row h-16 items-center px-5 justify-end gap-5'>
              <div className='hover:text-gray-200'>
                <Link to='/'>
                  Home
                </Link>
              </div>
              <div className=''>
                <Link to='/services'>
                  Services
                </Link>
              </div>
              <div className=''>
                <Link to='/appointments'>
                  Appointments
                </Link>
              </div>
              <div className=''>
                <Link to='/photo-gallery'>
                  Photo Gallery
                </Link>
              </div>
              <div className=''>
                <Link to='/contact'>
                  Contact
                </Link>
              </div>
              <div className=''>
                <Link to='/about'>
                  About
                </Link>
              </div>
              <div className=''>
                <Link to='/login'>
                  Login
                </Link>
              </div>
              <div className=''>
                <button
                onClick={ logout }
                >
                  Logout
                </button>
              </div>
              <div className=''>
                <Link to='/signup'>
                  Sign Up
                </Link>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar