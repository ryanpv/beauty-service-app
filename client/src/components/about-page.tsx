import React from 'react'
import { SocialIcon } from 'react-social-icons'

export default function AboutPage() {
  return (
    <div className='grid md:grid-cols-2 min-h-screen max-w-screen'>
      <div className='container'>
        <div className='space-y-3 p-5'>
          <h1 className='text-center pt-5 text-5xl text-[#725C77] font-semibold'>About Me</h1>
          {/* <hr className='h-px mx-3 border-pink-200 w-full sm:max-w-screen-md mx-auto' /> */}
        </div>

        <p className='p-5 text-[#342D59] text-xl'>
          Hey everyone! My name is Cindy and I am a nail technician that specializes in gel nail art. I started about 7 years ago when my mom owned a nail salon
          and my passion for it kept growing ever since. It's one of my favourite things to do! There was something about turning nails into canvases that brings
          me joy. I've always had a passion for art, and doing nails allows me to express that every time. It makes me especially happy when I see the smile
          on my clients' faces when I doll up their nails. 
        <br></br>
        <br></br>
          But it's not just about making people happy. The whole process of doing nails is like therapy for me. It can be exciting, yet also calming and relaxing. 
          Chatting with my clients is also great. It can feel like catching up with old friends.
        <br></br>
        <br></br>
          At the end of the day, I hope to inspire others with my work. Whether it's through a funky design or just spreading some positivity, I want to leave 
          a little sparkle whenever I share my art. So, if you're ready to add some flair to your nails and maybe share a few laughs along the way, I'm your girl! Let's 
          create some beautiful nail art together!
        </p>

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
