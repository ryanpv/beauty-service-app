import React,  { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../utils/set-user';
import { useStateContext } from '../contexts/state-contexts';;

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useStateContext();
  const [show, setShow] = React.useState(true);

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

  const navDisplay = () => {
    const navLinks = document.getElementById('navLinks');

    if (show) {
      navLinks?.classList.remove('hidden')
    } else {
      navLinks?.classList.add('hidden')
    }

    setShow(prev => !prev);
  };

  return (
    <>
      <nav className="flex sticky top-0 items-center justify-between flex-wrap bg-pink-300 p-6 text-white">
        <div className='justify-start lg:px-5 text-4xl font-bold'>
          <Link to='/'>
            PolishByCin
          </Link>
        </div>

        <div className="block lg:hidden">
          <button 
            onClick={ navDisplay }
            className="flex items-center px-3 py-2 border-2 rounded-sm text-white border-white hover:text-pink-500 hover:border-pink-500"
            >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>

        <div id='navLinks' className="hidden mt-5 lg:mt-0 lg:justify-end w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className='lg:space-x-5 font-semibold lg:text-xl'>
            <div className='hover:text-gray-200 block lg:inline-block hover:text-pink-500'>
              <Link to='/'>
                Home
              </Link>
            </div>
            <div className='block lg:inline-block hover:text-pink-500'>
              <Link to='/services'>
                Services
              </Link>
            </div>

            { typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role !== 0 ? 
            <div className='block lg:inline-block hover:text-pink-500'>
              <Link to='/appointments'>
                Appointments
              </Link>
            </div>
            : null
            }
            
            <div className='block lg:inline-block hover:text-pink-500'>
              <Link to='/photo-gallery'>
                Photo Gallery
              </Link>
            </div>
            <div className='block lg:inline-block hover:text-pink-500'>
              <Link to='/contact'>
                Contact
              </Link>
            </div>
            <div className='block lg:inline-block hover:text-pink-500'>
              <Link to='/about'>
                About
              </Link>
            </div>

            { typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role !== 0 ? 
            <div className='block lg:inline-block hover:text-pink-500'>
              <button
              onClick={ logout }
              >
                Logout
              </button>
            </div>
            :
            <>
            <div className='block lg:inline-block hover:text-pink-500'>
              <Link to='/login'>
                Login
              </Link>
            </div>
            <div className='block lg:inline-block hover:text-pink-500'>
              <Link to='/signup'>
                Sign Up
              </Link>
            </div>
            </>
            }

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar