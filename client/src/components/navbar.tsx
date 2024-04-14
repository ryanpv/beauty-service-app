import React,  { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setUser } from '../utils/set-user';
import { useStateContext } from '../contexts/state-contexts';
import { FiMenu } from 'react-icons/fi';

const Navbar: FC = () => {
  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useStateContext();
  const [show, setShow] = React.useState(false);
  const [isHome, setIsHome] = React.useState(false);
  const location = useLocation();
console.log('current user check: ', typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role !== 0);
console.log('actual user: ', currentUser);


  // Sets the state for different navbar styling for homepage (homepage uses gradient)
  React.useEffect(() => {   
    if (location.pathname === '/home') {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [location]);

  React.useEffect(() => {
    setShow(false);
  }, [location]);

  // Event listener to check if screen is back to large (1024p+), if it is then revert menu back to original styling state
  React.useEffect(() => {
    const handleScreenResize = () => {
      if (window.innerWidth >= 1024) setShow(false);
    };

    window.addEventListener('resize', handleScreenResize);

    return () => window.removeEventListener('resize', handleScreenResize);
  }, []);

  const logout = async() => {
    try {
      const logoutRequest = await fetch(`${ serverUrl }/sessions`, {
        method: "DELETE",
        credentials: "include"
      });
  
      if (logoutRequest.status !== 200) {
        throw Error("Failed to logout.")
      } else {
        const loggedOutUser = setUser();
        setCurrentUser(loggedOutUser);
        navigate('/home');
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
        className={ `block z-50 flex sticky top-0 items-center justify-between flex-wrap text-white ${ isHome ? 'bg-gradient-to-b from-pink-300 from-20% h-36 px-6 pb-10' : 'p-6 bg-pink-300 shadow-md' }` }
      >
        <div className='justify-start lg:px-5 text-4xl'>
          <Link to='/home'>
            PolishByCin
          </Link>
        </div>

        <div className="block lg:hidden">
          <button 
            onClick={ navDisplay }
            className="flex items-center px-2.5 py-1.5 hover:text-pink-500 hover:border-pink-500"
            >
              <FiMenu />
          </button>
        </div>

        <div 
          id='navLinks' 
          // onMouseLeave={ navDisplay }      
          className={ `${ show ? 'p-5 z-60 drop-shadow-md rounded bg-pink-200 bg-opacity-50 backdrop-blur-sm opacity-100 scale-100 mt-5' : 'opacity-0 scale-0 h-0' } lg:mt-0 lg:justify-end w-full block lg:flex flex-grow lg:items-center lg:w-auto transition-all transform-gpu duration-300 lg:opacity-100 lg:scale-100` }
          >
          <div className='nav-links lg:space-x-5 font- lg:text-2xl'>
            <div className='nav-links hover:text-gray-200 block lg:inline-block hover:text-pink-500'>
              <Link to='/home'>
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
              <Link to='/register'>
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