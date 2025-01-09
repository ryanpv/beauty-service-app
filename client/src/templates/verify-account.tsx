import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';


const VerifyAccount = () => {
  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
  const [accountVerified, setAccountVerified] = useState<boolean>(false);
  const [tokenExpired, setTokenExpired] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [linkRequested, setLinkRequested] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const queryParams = new URLSearchParams(window.location.search);
  const verificationToken = queryParams.get('verification-token');
  const navigate = useNavigate();

  useEffect(() => {
    //  Request to server to verify account
    const verificationTokenCheck = async() => {
      try {
        setLoading(true);
        const checkToken = await fetch(`${ serverUrl }/verify-account/${ verificationToken }`);
  
        if (checkToken.status === 200) {
          setAccountVerified(true);
          setTokenExpired(false);
  
          setTimeout(() => {
            navigate('/');
          }, 5000);
        } else {
          setTokenExpired(true);
        }
        setLoading(false)
      } catch (error) {
        console.log('Error verifying token: ', error);
        setErrorMsg('Unable to verify account at this time. Please try again later');
      } finally {
        setLoading(false);
      }
    };

    verificationTokenCheck();
  }, []);


  // Request new verification link
  const requestNewLink = async() => {
    try {
      setLoading(true);
      setLinkRequested(true);
      const request = await fetch(`${ serverUrl }/request-verification-token`);

      console.log("request: ", request.ok);

      if (!request.ok) {
       throw new Error("Failed to request new verification link.") 
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
      <div className='container flex mt-10'>
        { accountVerified && errorMsg === '' ? 
          <div className='mx-auto font-bold'>
            <div className='flex flex-1 flex-col justify-center'>
              <h2>Thank you for verifying your account! Your sign up is now complete.</h2>
            </div>
    
            <div className='mx-auto mt-10'>
              <p>You will soon be redirected to our home page. If you are not redirected, click here: <Link to='/login' className='font-bold text-pink-700'>Login</Link></p>
            </div>
          </div>
          : tokenExpired ?
          <div className='flex flex-1 flex-col font-bold'>
            { !linkRequested && 
              <div className='mx-auto'>
                <p>Your link has expired. Click here to receive a new link:{" "}
                  <button
                    className="text-pink-700 font-bold hover:text-pink-900 focus:outline-none inline"
                    onClick={ requestNewLink }
                    >
                    Request new link. 
                  </button> {" "}
                </p>
              </div>            
            }

            { linkRequested && errorMsg === '' ?
              <div className='mx-auto'>
                <p>
                  You will shortly be redirected to the home page. Please check your email for a new verification link. Thank you!
                </p>
              </div>
              :
              null
            }

          </div>
          : null
        }

      </div>
      <div className='flex justify-center mt-10'>
        { loading && 
          <div>

          <BarLoader color='#D64F92' />
          </div>
        }
        {/* { loading && <div className='flex justify-center mt-10'><BarLoader color='#D64F92' /></div> } */}
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
};

export default VerifyAccount;