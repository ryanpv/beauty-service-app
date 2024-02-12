import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Cookies from 'js-cookie';
import UserLoggedIn from './components/logged-in-check';

function App() {
  const { currentUser, setCurrentUser } = useStateContext();
  const noUserLogged = typeof currentUser !== 'string' && currentUser.id === 0 && currentUser.role === 0;
  const adminUser = typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role === 2;
  const location = useLocation();

  React.useEffect(() => {
    const userLogged = setUser();
    
    setCurrentUser(userLogged)
  },[]);

  React.useEffect(() => {
    if (Cookies.get('user') === undefined) {
      const initialUserState = {
        id: 0,
        role: 0,
        displayName: "",
        iat: 0,
        exp: 0
      }
      // console.log("no current user logged in.");
      
      setCurrentUser(initialUserState);
    } else {
      console.log('currnt user: ', currentUser);
    }
  }, [location]);

  return (
    <div className="App">
      <Navbar />
      {/* <LoginPage /> */}
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/book-appointment' element={ noUserLogged ? <Unauthorized /> : <BookingPage /> } />
        <Route path='/booking-success' element={ noUserLogged ? <Unauthorized /> : <BookingSuccessPage /> } />
        <Route path='/appointments' element={ noUserLogged ? <Unauthorized /> : <AppointmentsList /> } />
        <Route path='/update-appointment/:appointmentId' element={ noUserLogged ? <Unauthorized /> : <UpdateAppointment /> } />
        <Route path='/login' element={ !noUserLogged ? <UserLoggedIn /> : <LoginPage /> } />
        <Route path='/signup' element={ <SignupPage /> } />
        <Route path='/successful-signup' element={ <SignupSuccess /> } />
        <Route path='/ig-auth' element={ <GetAuth /> } />
        <Route path='/photo-gallery' element={ <PhotoGallery /> } />
        <Route path='/contact' element={ <ContactPage /> } />
        <Route path='/services' element={ <Services /> } />
        <Route path='/update-service/:serviceId' element={ !adminUser ? <Unauthorized /> : <UpdateService /> } />
        <Route path='/about' element={ <AboutPage /> } />
        <Route path='/request-new-password' element={ <NewPasswordRequest /> } />
        <Route path='/reset-password' element={ <ResetPassword /> } />
        <Route path='/add-new-service' element={ !adminUser ? <Unauthorized /> : <AddService /> } />
      </Routes>
    </div>
  );
}

export default App;
