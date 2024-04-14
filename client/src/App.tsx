import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../src/components/landing-page';
import HomePage from '../src/components/home-page';
import Navbar from '../src/components/navbar';
import LoginPage from '../src/components/login-page';
import GetAuth from '../src/components/get-auth';
import PhotoGallery from './components/photo-gallery';
import ContactPage from './components/contact-page';
import SignupPage from './components/signup-page';
import Services from './components/services';
import AboutPage from './components/about-page';
import NewPasswordRequest from './components/new-password-request';
import ResetPassword from './components/reset-password-form';
import AddService from './components/add-service';
import UpdateService from './components/update-service';
import BookingPage from './components/booking-page';
import BookingSuccessPage from './templates/booking-success';
import AppointmentsList from './components/appointments-list';
import UpdateAppointment from './components/update-appointment';
import SignupSuccess from './templates/signup-success';
import Unauthorized from './components/unauthorized';
import { useStateContext } from './contexts/state-contexts';
import { setUser } from './utils/set-user';
import { useLocation } from 'react-router-dom';
import UserLoggedIn from './components/logged-in-check';
import PasswordResetSuccess from './templates/password-reset-success';
import FailedPasswordReset from './templates/failed-password-reset';
import RequiredLogin from './templates/required-login';
// import Tester from './components/test-component';

function App() {
  const { currentUser, setCurrentUser } = useStateContext();
  const noUserLogged = typeof currentUser !== 'string' && currentUser.id === 0 && currentUser.role === 0;
  const adminUser = typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role === 2;
  const location = useLocation();

  React.useEffect(() => {
    const userLogged = setUser();
    
    setCurrentUser(userLogged)
  },[location]);

  React.useEffect(() => {
    const galleryTimer = localStorage.getItem('lastItem');
    const parseGalleeryTimer = galleryTimer && new Date(JSON.parse(galleryTimer).time);
    const storageTime = parseGalleeryTimer && parseGalleeryTimer.getTime()
    const storageExpiryInterval = 3600000 // 4 hours;
    const currentTime = new Date().getTime();

    // If localstorage for IG photos are more than 4 hours old, localstorage will be cleared
    if (storageTime && storageTime + storageExpiryInterval < currentTime) {
      localStorage.removeItem('igPhotos');
      localStorage.removeItem('lastItem');
    }
  }, [location])

  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar />

      <div className='flex-1'>
        <Routes>
          {/* <Route path='/tester' element={ <Tester /> } /> */}
          <Route path='/' element={ <LandingPage /> } />
          <Route path='/home' element={ <HomePage /> } />
          <Route path='/book-appointment' element={ noUserLogged ? <RequiredLogin /> : <BookingPage /> } />
          {/* <Route path='/book-appointment' element={ <BookingPage /> } /> */}
          <Route path='/booking-success' element={ noUserLogged ? <Unauthorized /> : <BookingSuccessPage /> } />
          {/* <Route path='/booking-success' element={ <BookingSuccessPage /> } /> */}
          <Route path='/appointments' element={ noUserLogged ? <Unauthorized /> : <AppointmentsList /> } />
          {/* <Route path='/appointments' element={ <AppointmentsList /> } /> */}
          <Route path='/update-appointment/:appointmentId' element={ noUserLogged ? <Unauthorized /> : <UpdateAppointment /> } />
          <Route path='/login' element={ noUserLogged ? <UserLoggedIn /> : <LoginPage /> } />
          <Route path='/register' element={ <SignupPage /> } />
          <Route path='/successful-signup' element={ <SignupSuccess /> } />
          <Route path='/ig-auth' element={ <GetAuth /> } />
          <Route path='/photo-gallery' element={ <PhotoGallery /> } />
          <Route path='/contact' element={ <ContactPage /> } />
          <Route path='/services' element={ <Services /> } />
          <Route path='/update-service/:serviceId' element={ !adminUser ? <Unauthorized /> : <UpdateService /> } />
          <Route path='/about' element={ <AboutPage /> } />
          <Route path='/request-new-password' element={ <NewPasswordRequest /> } />
          <Route path='/reset-password' element={ noUserLogged ? <Unauthorized /> : <ResetPassword /> } />
          <Route path='/password-reset-success' element={ <PasswordResetSuccess /> } />
          <Route path='/token-expired' element={ <FailedPasswordReset /> } />
          <Route path='/add-new-service' element={ !adminUser ? <Unauthorized /> : <AddService /> } />
          {/* <Route path='/login-required' element={ <RequiredLogin /> } /> */}
        </Routes>
      </div>

      <footer
        className="z-50 text-center bg-pink-300 p-6 text-white text-xs font-semibold"
      > 
        COPYRIGHT © 2024 POLISHBYCIN - ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

export default App;