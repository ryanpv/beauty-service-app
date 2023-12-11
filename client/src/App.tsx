import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/navbar';
import LoginPage from '../src/components/login-page';
import GetAuth from '../src/components/get-auth';
import PhotoGallery from './components/photo-gallery';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <LoginPage /> */}
      <Routes>
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/ig-auth' element={ <GetAuth /> } />
        <Route path='/photo-gallery' element={ <PhotoGallery /> } />
      </Routes>
    </div>
  );
}

export default App;
