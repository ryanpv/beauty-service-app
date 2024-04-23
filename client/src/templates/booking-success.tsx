import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function BookingSuccessPage() {
  const [bookingSuccess, setBookingSuccess] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      setBookingSuccess(true);
    }, 10000)
  }, []);


  if (bookingSuccess) {
    navigate("/");
  }

  return (
    <div className='container flex mt-10'>
      <div className='flex flex-1 flex-col justify-center'>
        <div className='mx-auto font-bold'>
          <h2>Appointment successfully booked!</h2>
        </div>

        <div className='mx-auto'>
          <p>Thank you for requesting an appointment!</p>
        </div>
        
        <div className='mx-auto'>
          <p>If you are not automatically redirected, click <Link to='/' className='font-bold text-pink-300'>here</Link> to return home.</p>
        </div>

        <div className='mx-auto'>
          <p>Or <Link to='/services' className='font-bold text-pink-300'>here</Link> to browse our other services</p>
        </div>
      </div>
    </div>
  )
}
