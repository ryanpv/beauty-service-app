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
import VerifyAccount from './templates/verify-account';
import Unauthorized from './components/unauthorized';
import { useStateContext } from './contexts/state-contexts';
import { setUser } from './utils/set-user';
import { useLocation } from 'react-router-dom';
import UserLoggedIn from './components/logged-in-check';
import PasswordResetSuccess from './templates/password-reset-success';
import FailedPasswordReset from './templates/failed-password-reset';
import RequiredLogin from './templates/required-login';
import UnverifiedUser from './templates/unverified-user';

function App() {
  const { currentUser, setCurrentUser } = useStateContext();
  const noUserLogged = typeof currentUser !== 'string' && currentUser.id === 0 && currentUser.role === 0;
  const adminUser = typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role === 2;
  const unverifiedUser = typeof currentUser !== "string" && currentUser.isVerified === false;
  const location = useLocation();
  const appVersion = '1.2.0' // Update app version after changes to clear localstorage

  React.useEffect(() => {
    const userLogged = setUser();

    setCurrentUser(userLogged)
  },[location]);

  React.useEffect(() => {   
    // Handle app versioning
    const storedVersion = localStorage.getItem('pbc-appVersion');
    if (storedVersion !== appVersion) {
      localStorage.removeItem('igPhotos');
      localStorage.removeItem('lastItem');
      localStorage.setItem('pbc-appVersion', appVersion);
    };

    const galleryTimer = localStorage.getItem('lastItem');
    const parseGalleryTimer = galleryTimer && new Date(JSON.parse(galleryTimer).time);
    const storageTime = parseGalleryTimer && parseGalleryTimer.getTime()
    // const storageExpiryInterval = 3600 * 1000 * 4// 4 hours;
    const storageExpiryInterval = 1000 * 60 * 60 * 4;
    const currentTime = new Date().getTime();  
    // If localstorage for IG photos are more than 4 hours old, localstorage will be cleared
    if (storageTime && storageTime + storageExpiryInterval < currentTime) {
      localStorage.removeItem('igPhotos');
      localStorage.removeItem('lastItem');
    }
  }, [location])

  return (
    <div 
      className="App flex flex-col min-h-screen" 
    >
      <Navbar />

      <div className='flex-1'>
        <Routes>
          {/* <Route path='/tester' element={ <Tester /> } /> */}
          <Route path='/' element={ <HomePage /> } />
          {/* <Route path='/home' element={ <HomePage /> } /> */}
          <Route path='/book-appointment' element={ noUserLogged ? <RequiredLogin /> : unverifiedUser ? <UnverifiedUser /> : <BookingPage /> } />
          {/* <Route path='/book-appointment' element={ <BookingPage /> } /> */}
          <Route path='/booking-success' element={ noUserLogged ? <Unauthorized /> : <BookingSuccessPage /> } />
          {/* <Route path='/booking-success' element={ <BookingSuccessPage /> } /> */}
          <Route path='/appointments' element={ noUserLogged ? <Unauthorized /> : <AppointmentsList /> } />
          {/* <Route path='/appointments' element={ <AppointmentsList /> } /> */}
          <Route path='/update-appointment/:appointmentId' element={ noUserLogged ? <Unauthorized /> : unverifiedUser ? <UnverifiedUser /> : <UpdateAppointment /> } />
          <Route path='/login' element={ !noUserLogged ? <UserLoggedIn /> : <LoginPage /> } />
          <Route path='/register' element={ <SignupPage /> } />
          <Route path='/verify-account' element={ <VerifyAccount /> } />
          <Route path='/ig-auth' element={ <GetAuth /> } />
          <Route path='/photo-gallery' element={ <PhotoGallery /> } />
          <Route path='/contact' element={ <ContactPage /> } />
          <Route path='/services' element={ <Services /> } />
          <Route path='/update-service/:serviceId' element={ !adminUser ? <Unauthorized /> : <UpdateService /> } />
          <Route path='/about' element={ <AboutPage /> } />
          <Route path='/request-new-password' element={ <NewPasswordRequest /> } />
          <Route path='/reset-password' element={ <ResetPassword /> } />
          <Route path='/password-reset-success' element={ <PasswordResetSuccess /> } />
          <Route path='/token-expired' element={ <FailedPasswordReset /> } />
          <Route path='/add-new-service' element={ !adminUser ? <Unauthorized /> : <AddService /> } />
          {/* <Route path='/login-required' element={ <RequiredLogin /> } /> */}
        </Routes>
      </div>

      <footer
        className="z-50 text-center p-6 text-pink-300 text-xs"
        style={{ backgroundColor: "#725C77" }}
      > 
        COPYRIGHT © 2024 POLISHBYCIN - ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

export default App;