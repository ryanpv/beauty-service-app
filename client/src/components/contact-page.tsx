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

      <form>
        <input placeholder='Name *' />
        <input placeholder='Email *' />
        <input placeholder='Phone *' />
        <input placeholder='Subject *' />
        <textarea placeholder='Message *' />

        <button>Send Message</button>
      </form>
    </div>
  )
}
