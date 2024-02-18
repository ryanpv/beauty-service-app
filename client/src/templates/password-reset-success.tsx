import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PasswordResetSuccess = () => {
  const [resetSuccess, setResetSuccess] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      setResetSuccess(true);
    }, 5000);
  }, []);

  if (resetSuccess) {
    navigate('/login');
  }

  return (
    <div className='container flex mt-10'>
      <div className='flex flex-1 flex-col justify-center'>
        <div className='mx-auto font-bold'>
          <h2>Your password has been reset successfully</h2>
        </div>

        <div className='mx-auto'>
          <p>You will be navigated to the login page. Please login with your new credentials</p>
        </div>

        <div className='mx-auto'>
          <p>If you are not redirected, click <Link to='/login' className='font-bold text-pink-300'>here to go to the login page.</Link></p>
        </div>
      </div>
    </div>
  )
};

export default PasswordResetSuccess;