import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <>
    <div className='flex flex-col space-y-10 px-8 sm:px-16 min-h-screen w-screen bg-gray-100'>
      <div className='space-y-3'>
        <h1 className='text-center mt-10 text-4xl font-bold text-pink-300 underline decoration-gray-400'>PolishByCin</h1>
        <hr className='h-px mx-3 border-pink-200 w-full sm:max-w-screen-md mx-auto' />
      </div>

      <div className='mx-auto'>
        <img src={ require("./polishbycin-gifedit.gif") } alt=''/>
      </div>

      <div className='px-8 py-1.5 mx-auto bg-pink-300 text-white text-lg hover:ring-pink-400 hover:bg-pink-400 font-semibold rounded-full'>
        <Link to='/home'>Go to homepage</Link>
      </div>

      <div className='container max-w-screen-lg'>
        <p>
          This is a web-app created for PolishByCin. It is currently just used for demo purposes, but you will be able to use all functionalities as intended as a
          regular user/client.
          <br></br>
          <br></br>
          The purpose of this web-app is to provide users with the experience of being able to book/update appointments for nail services. Users are able to browse nail
          services offered, as well as view past works of PolishByCin in the photo gallery. These photos are linked to their direct post on instagram. Users can
          also reach out through the contact page.
          <br></br>
          <br></br>
          If you wish to demo this page with all functionalities, just head over to the <Link className='text-pink-500' to='/register'>signup page</Link> and create an account. Otherwise,
          feel free to just have a look around!
        </p>
      </div>


    </div>
      <footer className='flex bg-gray-100'>
        <div className='mx-auto space-y-2 pb-5'>
          <p>Thanks for stopping by! To check out my other projects or connect with me, you can visit one of my links:</p>
          <div className='flex flex-cols-2 justify-center space-x-2'>
            <BsArrowRight/>
            <a 
              className='text-pink-500 hover:text-pink-700'
              href='https://github.com/ryanpv' 
              target='_blank' 
              rel='noreferrer'
              > My Github
            </a>
          </div>

          <div className='flex flex-cols-2 justify-center space-x-2'>
            <BsArrowRight/>
            <a
              className='text-pink-500 hover:text-pink-700' 
              href='https://ryanvoong.dev/' 
              target='_blank' 
              rel='noreferrer'> Portfolio Site
            </a>
          </div>

          <div className='flex flex-cols-2 justify-center space-x-2'>
            <BsArrowRight/>
            <a
              className='text-pink-500 hover:text-pink-700' 
              href='https://www.linkedin.com/in/ryandvoong/' 
              target='_blank' 
              rel='noreferrer'> LinkedIn
            </a>
          </div>  
        </div>
    </footer>
    </>
  )
}
