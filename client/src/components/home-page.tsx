import React from 'react'

export default function HomePage() {
  return (
    <div className='container flex flex-col max-w-screen-md mt-10 space-y-10'>
      <header className='flex flex-col mx-auto space-y-10'>
        <img
          className='mx-auto h-10 w-auto'
          src={ require('./logo192.png') }
          alt='test logo'
        />
        <h1 className='text-center'>Polish By Cin</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi massa nisl, aliquam vitae felis ut, 
          efficitur blandit neque. Duis dapibus diam eget imperdiet mollis. Aliquam massa turpis, venenatis quis 
          accumsan ac, convallis eget velit. Nunc sed porta mi. In lobortis feugiat iaculis. Pellentesque eros 
          lectus, posuere a leo et, lacinia pretium quam. Donec quis ornare velit, sed pellentesque ipsum. In 
          semper nisl magna, quis molestie velit dapibus ac. Nunc rhoncus nibh libero, eget tristique tortor 
          maximus suscipit. Integer interdum ultrices nisi non rutrum.
        </p>

        <a 
        href='/book-appointment' 
        className='bg-pink-300 hover:bg-pink-200 px-3 py-1.5 mx-auto rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
        >
          Book Appointment
        </a>
      </header>

      <div className='flex justify-center'>
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
        <div className='grid grid-cols-2'>
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
