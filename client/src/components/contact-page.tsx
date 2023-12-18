import React from 'react'

export default function ContactPage() {
  return (
    <div className='container flex flex-1 flex-col space-y-10'>
      <h1 className='text-center mt-10 text-2xl font-bold text-gray-900'>Contact Us</h1>
      <div className='grid sm:grid-cols-3 sm:space-y-0 space-y-10 py-6 border-2 border-solid border-gray-300 items-start text-center'>
        <div className=''>
          <img
            className='mx-auto h-10 w-auto'
            src={ require('./logo192.png') }
            alt='logo'
          />
          <label className='font-bold'>
            Contact
          </label>
          <p>          
            Tel: (123) 456 - 7890
          </p>
          <p>
            serviceemail@email.com
          </p>
        </div>

        <div>
        <img
            className='mx-auto h-10 w-auto'
            src={ require('./logo192.png') }
            alt='logo'
          />          
          <label className='font-bold'>
            Hours
          </label>
          <p>
            Monday - Friday: 10:00 AM - 8:00 PM
          </p>
          <p>Saturday: 10:00 AM - 7:00 PM</p>
          <p>Sunday: 10:00 AM - 6:00 PM</p>
        </div>

        <div>
        <img
            className='mx-auto h-10 w-auto'
            src={ require('./logo192.png') }
            alt='logo'
          />
          <label className='font-bold'>
            Location
          </label>
          <p>
            123 BusinessLocation St.<br></br> 
            Toronto, ON A1B 2C3
            </p>
        </div>
      </div>


      <h3 className='text-center font-bold text-2xl'>Leave us a message!</h3>

      <div className='p-5 mb-5 sm:mx-auto sm:w-full sm:max-w-2xl border-solid border-2'>
        <form>
          <div className='flex flex-col space-y-6'>
            <div className='flex justify-between flex-col sm:flex-row space-y-6 sm:space-y-0'>
              <input placeholder='Name *'               
                className='py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
              />
              <input placeholder='Email *' 
                className='py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
              />
              <input placeholder='Phone *' 
                className='py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
              />
            </div>

            <input placeholder='Subject *' 
              className='py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 leading-6'
            />
            <textarea placeholder='Message *' 
              className='h-48 min-h-fit py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 leading-6'
            />

            <button
              type='submit'
              className='mx-auto w-full bg-pink-300 hover:bg-pink-200 rounded-sm max-w-xs justify-center text-white font-semibold'
            >
              Send Message
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}
