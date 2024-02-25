import React from 'react'
import { SocialIcon } from 'react-social-icons'

export default function AboutPage() {
  return (
    <div className='grid md:grid-cols-2 min-h-screen max-w-screen'>
      <div className='bg-gray-100'>
        <h1 className='text-center p-5'>About Me</h1>
        <p className='p-5'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi massa nisl, aliquam vitae felis ut, 
          efficitur blandit neque. Duis dapibus diam eget imperdiet mollis. Aliquam massa turpis, venenatis quis 
          accumsan ac, convallis eget velit. Nunc sed porta mi. In l </p>

      </div>
      <div
        className='bg-pink-200 min-h-screen'
        style={ { backgroundImage: `url(${require('./about-photo.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center' } }
      >
        <div className='flex items-center justify-center min-h-screen'>
          <div className='flex py-3 px-10 rounded-full'>
            <div className='flex flex-cols-2'>
              <div>
                <SocialIcon 
                  url='www.instagram.com' 
                  href='https://www.instagram.com/polishbycin/'
                  bgColor='#fbb6ce'
                  target='_blank'
                  rel='noreferrer'
                />
              </div>

              <a href='https://www.instagram.com/polishbycin/' target='_blank' rel='noreferrer'>
                <p className='pt-2 px-3 text-2xl font-bold text-white underline decoration-pink-300'>PolishByCin</p>
              </a>
            </div>
          </div>
        </div>


        {/* <img
          src={ require('./about-photo.jpg') } 
          alt=''
        /> */}
      </div>
    </div>
  )
}
