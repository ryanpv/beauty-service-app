import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/navbar';
import LoginPage from '../src/components/login-page';
import GetAuth from '../src/components/get-auth';
import PhotoGallery from './components/photo-gallery';
import ContactPage from './components/contact-page';
import SignupPage from './components/signup-page';
import Services from './components/services';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <LoginPage /> */}
      <Routes>
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/signup' element={ <SignupPage /> } />
        <Route path='/ig-auth' element={ <GetAuth /> } />
        <Route path='/photo-gallery' element={ <PhotoGallery /> } />
        <Route path='/contact' element={ <ContactPage /> } />
        <Route path='/services' element={ <Services /> } />

      </Routes>
    </div>
  );
}

export default App;
