import React from 'react'

export default function ContactPage() {
  return (
    <div className='container'>
      <h1>Contact Us</h1>

      <div>
        <i>Icon here</i>
        <label>
          Contact
        </label>
        <p>          
          Tel: 
          Email:
        </p>
      </div>

      <div>
        <i>Hours</i>
        <label>
          Hours
        </label>
        <p>
          Monday - Friday 
          Saturday
          Sunday
        </p>
      </div>

      <div>
        <i>Location</i>
        <label>
          Location
        </label>
        <p>
          Address
        </p>
      </div>

      <h3>Leave us a message!</h3>

      <div className='sm:mx-auto sm:w-full sm:max-w-2xl border-solid border-2'>
        <form>
          <div className='flex flex-col space-y-6'>
            <div className='flex justify-between flex-col sm:flex-row sm:max-w-sm items-center'>
              <input placeholder='Name *'               
                className='py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
              />
              <input placeholder='Email *' 
                className='py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
              />
              <input placeholder='Phone *' 
                className='py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
              />
            </div>

            <input placeholder='Subject *' 
              className='py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 leading-6'
            />
            <textarea placeholder='Message *' 
              className='py-1.5 px-2.5 border-0 rounded-md ring-1 ring-inset ring-pink-300 text-gray-900 leading-6'
            />

            <button>Send Message</button>

          </div>
        </form>
      </div>
    </div>
  )
}
