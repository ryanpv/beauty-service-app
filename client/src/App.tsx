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
import BookingPage from './components/booking-page';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <LoginPage /> */}
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/book-appointment' element={ <BookingPage /> } />
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/signup' element={ <SignupPage /> } />
        <Route path='/ig-auth' element={ <GetAuth /> } />
        <Route path='/photo-gallery' element={ <PhotoGallery /> } />
        <Route path='/contact' element={ <ContactPage /> } />
        <Route path='/services' element={ <Services /> } />
        <Route path='/about' element={ <AboutPage /> } />
        <Route path='/request-new-password' element={ <NewPasswordRequest /> } />
        <Route path='/reset-password' element={ <ResetPassword /> } />
        <Route path='/add-new-service' element={ <AddService /> } />
      </Routes>
    </div>
  );
}

export default App;
