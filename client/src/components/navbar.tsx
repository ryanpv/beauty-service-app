import React,  { FC } from 'react'

const Navbar: FC = () => {
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
                <a href='/appointments'>
                  Appointments
                </a>
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