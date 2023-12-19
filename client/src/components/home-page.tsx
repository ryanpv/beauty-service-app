import React from 'react'

export default function HomePage() {
  return (
    <div className='container border-solid border-2'>
      <header>
        <img
          className='mx-auto h-10 w-auto'
          src={ require('./logo192.png') }
          alt='test logo'
        />
        <h1 className='text-center'>Polish By Cin</h1>
        <p>Introduction blurb???</p>

        <a 
        href='/add-new-service' 
        className='bg-pink-300 hover:bg-pink-200 px-3 py-1.5 mx-auto rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
        >
        Book Appointment
      </a>
      </header>

      <div className='flex border-solid border-2 justify-center'>
        <a href='#'>
          <div className='flex flex-cols-2'>
            <img
              className='h-10'
              src={ require('./logo192.png') }
              alt='test logo'
            />
            <p className='pt-2'>PolishByCin Instahandle</p>
          </div>
        </a>
      </div>

      <div className='container max-w-2xl overflow-auto'>
        <div className='grid grid-rows-1 grid-flow-col'>
          <div>
            <img src={ require("./balloon-sq1.jpg") } alt="placeholder" />
          </div>
          <div>
            <img src={ require("./balloon-sq2.jpg") } alt="placeholder" />
          </div>
          <div>
            <img src={ require("./balloon-sq3.jpg") } alt="placeholder" />
          </div>
          <div>
            <img src={ require("./balloon-sq4.jpg") } alt="placeholder" />
          </div>
          <div>
            <img src={ require("./balloon-sq5.jpg") } alt="placeholder" />
          </div>
        </div>
      </div>

      
    </div>
  )
}
