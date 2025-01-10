import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { useStateContext } from '../contexts/state-contexts';

const UnverifiedUser = () => {
    const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [linkRequested, setLinkRequested] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { currentUser } = useStateContext();
    const navigate = useNavigate();


    // Request new verification link
    const requestNewLink = async() => {
      try {
        setLoading(true);
        setLinkRequested(true);
  
        if (typeof currentUser !== 'string' && currentUser.id) {
          const request = await fetch(`${ serverUrl }/request-verification-token/${ currentUser.id }`);
    
          if (!request.ok) {
           throw new Error("Failed to request new verification link.") 
          }
        }
  
        setTimeout(() => {
          setLoading(false);
          navigate('/');
        }, 5000);
      } catch (error) {
        setErrorMsg('Unable to request new link at this time. Please try again later.');
        console.log('Error: ', error);
        setLoading(false);
      }
    };

  return (
    <>
      { linkRequested && errorMsg === '' ?
        <div className='mx-auto'>
          <p>
            You will shortly be redirected to the home page. Please check your email for a new verification link. Thank you!
          </p>
        </div>
        :
        <div className='container flex mt-10'>
          <div className='mx-auto text-center font-bold text-2xl max-w-screen-lg'>
            <p>Your account has not yet been verified. It must be verified before you can book/manage your appointments.
              Please check your email for the verification link or lick here to receive a new link:{" "}
              <button
                className="text-pink-700 font-bold hover:text-pink-900 focus:outline-none inline"
                onClick={ requestNewLink }
                >
                Request new link. 
              </button> {" "}
            </p>
          </div> 
        </div>
      }

      <div className='flex justify-center mt-10'>
        { loading && 
          <div>
            <BarLoader color='#D64F92' />
          </div>
        }

        { errorMsg !== "" && 
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">ERROR: </strong>
            <span className="block sm:inline">{ errorMsg }</span> {" "}
            <Link to='/' className='font-bold text-red-700 hover:text-red-900 underline'>Return home</Link>
          </div>
        }
      </div> 
    </>
  )
}

export default UnverifiedUser