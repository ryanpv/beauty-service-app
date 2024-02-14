import React,  { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../utils/set-user';
import { useStateContext } from '../contexts/state-contexts';
import { FiMenu } from 'react-icons/fi';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useStateContext();
  const [show, setShow] = React.useState(false);

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
    if (!show) {
      document.getElementById('navbar')?.classList.remove('bg-opacity-75');
    } else {
      document.getElementById('navbar')?.classList.add('bg-opacity-75');
    }

    setShow(prev => !prev);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (document.documentElement.scrollTop > 0) {
      document.getElementById('navbar')?.classList.add('bg-opacity-75');
    } else {
      document.getElementById('navbar')?.classList.remove('bg-opacity-75');
    }
  };
  
  return (
    <>
      <nav 
        id='navbar'
        className="flex sticky top-0 items-center justify-between flex-wrap bg-pink-300 p-6 text-white transition-all">
        <div className='justify-start lg:px-5 text-4xl font-bold'>
          <Link to='/'>
            PolishByCin
          </Link>
        </div>

        <div className="block lg:hidden">
          <button 
            onMouseEnter={ navDisplay }
            className="flex items-center px-2.5 py-1.5 hover:text-pink-500 hover:border-pink-500"
            >
              <FiMenu />
          </button>
        </div>

        <div 
          id='navLinks' 
          onMouseLeave={ navDisplay }      
          className={`lg:mt-0 lg:justify-end w-full block flex-grow lg:flex lg:items-center lg:w-auto transition-all transform-gpu duration-300 lg:opacity-100 lg:scale-100 ${ show ? 'opacity-100 scale-100 mt-5' : 'opacity-0 scale-0 h-0' }`}
          >
          <div className='nav-links lg:space-x-5 font-semibold lg:text-xl'>
            <div className='nav-links hover:text-gray-200 block lg:inline-block hover:text-pink-500'>
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