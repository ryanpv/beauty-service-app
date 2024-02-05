import React from 'react';
import { BarLoader } from 'react-spinners';

type ContactForm = {
  name: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [contactFormState, setContactFormState] = React.useState<ContactForm>({
    name: '',
    email: '',
    phone_number: '',
    subject: '',
    message: ''
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const contactFormHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setContactFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitContactForm = async(event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      const sendContactForm = await fetch("https://localhost:3001/contact-messages", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(contactFormState)
      });

      if (sendContactForm.status !== 201) {
        throw new Error(); 
      } else {
        error !== "" && setError("");
        setContactFormState({
          name: '',
          email: '',
          phone_number: '',
          subject: '',
          message: ''
        });
      }

      setLoading(false);
    } catch (error) {
      console.log("error form")
      setError("Message/contact request was UNSUCCESSFUL.");
      setLoading(false);
    }
  };

  return (
    <div className='container flex flex-1 flex-col space-y-10'>
      <h1 className='text-center mt-10 text-2xl font-bold text-gray-900'>Contact Us</h1>
      <div className='grid sm:grid-cols-3 sm:space-y-0 space-y-10 py-6 items-start text-center'>
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


      <div className='p-5 mb-5 sm:mx-auto sm:w-full sm:max-w-2xl'>
        { error !== "" && <div className='flex justify-center mb-5 text-red-700 font-semibold'><i>***{ error }***</i></div> }
        
        <form onSubmit={ submitContactForm }>
          <div className='flex flex-col space-y-6'>
            <div className='flex justify-between flex-col sm:flex-row space-y-6 sm:space-y-0'>
              <input placeholder='Name *'
                onChange={ contactFormHandler }
                name='name'  
                type='text'
                value={ contactFormState.name }
                maxLength={ 50 }
                pattern="^[A-Za-z\s.'\-]+$"
                title="Special characters allowed: .-' "
                className='py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
              />
              <input placeholder='Email *' 
                onChange={ contactFormHandler }
                required
                name='email'
                type='email'
                value={ contactFormState.email }
                maxLength={ 50 }
                className='py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
              />
              <input placeholder='Phone *' 
                onChange={ contactFormHandler }
                name='phone_number'
                type='text'
                value={ contactFormState.phone_number }
                maxLength={ 25 }
                className='py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
              />
            </div>

            <input placeholder='Subject *' 
              onChange={ contactFormHandler }
              required
              name='subject'
              type='text'
              value={ contactFormState.subject }
              maxLength={ 90 }
              className='py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 leading-6'
            />
            <textarea placeholder='Message *' 
              onChange={ contactFormHandler }
              required
              maxLength={ 1000 }
              name='message'
              value={ contactFormState.message }
              className='h-48 min-h-fit py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 leading-6'
            />


            { loading ? <BarLoader className='mx-auto' color='#fbb6ce' /> 
            : 
            <button
              type='submit'
              className='mx-auto w-full bg-pink-300 hover:bg-pink-200 rounded-sm max-w-xs justify-center text-white font-semibold'
            >
              Send Message
            </button>
            }

          </div>
        </form>
      </div>
    </div>
  )
}
