import React from 'react';
import { BarLoader } from 'react-spinners';
import { FcCellPhone, FcClock, FcGlobe } from 'react-icons/fc';
import ReCAPTCHA from 'react-google-recaptcha';

type ContactForm = {
  name: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
  captchaToken: string;
};

export default function ContactPage() {
  const [contactFormState, setContactFormState] = React.useState<ContactForm>({
    name: '',
    email: '',
    phone_number: '',
    subject: '',
    message: '',
    captchaToken: '',    
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
  const captchaRef = React.useRef<ReCAPTCHA>(null);

  const contactFormHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setContactFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaptcha = (value: string | null) => {
    if (value !== null) {
      setContactFormState((prev) => (
        {
          ...prev,
          captchaToken: value
        }
      ));
    }
  };

  const submitContactForm = async(event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      
      const sendContactForm = await fetch(`${ serverUrl }/contact-messages`, {
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
          message: '',
          captchaToken: '',
        });

        alert("Message successfully sent!");
      }

      captchaRef.current?.reset();
      setLoading(false);
    } catch (error) {
      console.log("error form")
      captchaRef.current?.reset();
      setError("Message/contact request was UNSUCCESSFUL.");
      setLoading(false);
    }
  };

  return (
    <div className='container flex flex-col space-y-10 px-8 sm:px-16 pb-16 transition-all'>
      <div className='space-y-3'>
        <h1 className='text-center mt-10 text-4xl font-bold text-gray-600'>Contact Us</h1>
        <hr className='h-px mx-3 border-pink-200 w-full sm:max-w-screen-md mx-auto' />
      </div>

      <div className='grid md:grid-cols-3 px-10 md:space-y-0 space-y-10 py-6 items-start text-center'>
        <div className=''>
          <FcCellPhone className='mx-auto h-10 w-auto'/>
          <label className='font-bold'>
            Contact
          </label>
          <p>          
            Tel: (123) 456 - 7890
          </p>
          <p>
            PolishByCin@gmail.com
          </p>
        </div>

        <div>
          <FcClock className='mx-auto h-10 w-auto' />    
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
          <FcGlobe className='mx-auto h-10 w-auto' />
          <label className='font-bold'>
            Location
          </label>
          <p>
            123 BusinessLocation St.<br></br> 
            Toronto, ON A1B 2C3
            </p>
        </div>
      </div>

      <div className='bg-pink-100 border border-pink-100 rounded sm:py-16 md:px-8 py-16 px-6 shadow-xl shadow-gray-300 lg:mx-auto'>
        <h3 className='text-center mb-10 font-bold text-2xl text-gray-600'>Leave us a message!</h3>
        <div className=''>

          <form onSubmit={ submitContactForm }>
            <div className='flex flex-col space-y-6'>
              <div className='flex justify-between flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-1'>
                <input placeholder='Name *'
                  onChange={ contactFormHandler }
                  name='name'  
                  type='text'
                  value={ contactFormState.name }
                  maxLength={ 50 }
                  pattern="^[A-Za-z\s.'\-]+$"
                  title="Special characters allowed: .-' "
                  className='py-1.5 px-2.5 border-0 rounded ring-pink-200 focus:ring-gray-400 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                />
                <input placeholder='Email *' 
                  onChange={ contactFormHandler }
                  required
                  name='email'
                  type='email'
                  value={ contactFormState.email }
                  maxLength={ 50 }
                  className='py-1.5 px-2.5 border-0 rounded ring-pink-200 focus:ring-gray-400 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                />
                <input placeholder='Phone *' 
                  onChange={ contactFormHandler }
                  name='phone_number'
                  type='text'
                  value={ contactFormState.phone_number }
                  maxLength={ 25 }
                  className='py-1.5 px-2.5 border-0 rounded ring-pink-200 focus:ring-gray-400 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                />
              </div>

              <input placeholder='Subject *' 
                onChange={ contactFormHandler }
                required
                name='subject'
                type='text'
                value={ contactFormState.subject }
                maxLength={ 90 }
                className='py-1.5 px-2.5 border-0 rounded ring-pink-200 focus:ring-gray-400 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 leading-6'
              />
              <textarea placeholder='Message *' 
                onChange={ contactFormHandler }
                required
                maxLength={ 1000 }
                name='message'
                value={ contactFormState.message }
                className='h-48 min-h-fit py-1.5 px-2.5 border-0 rounded ring-pink-200 focus:ring-gray-400 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 leading-6'
              />
              
              <div className='mx-auto'>
                <ReCAPTCHA 
                  sitekey={ process.env.REACT_APP_CAPTCHA_KEY || '' }
                  ref={ captchaRef }
                  onChange={ handleCaptcha }
                />
              </div>

              { loading ? <BarLoader className='mx-auto' color='#fbb6ce' /> 
              : 
              <div className='pt-4'>
                <button
                  type='submit'
                  className='flex w-full bg-pink-300 justify-center rounded-full ring-2 ring-pink-300 hover:ring-pink-400 py-2.5 px-3.5 text-white hover:bg-pink-400 font-semibold'
                >
                  Send Message
                </button>
              </div>
              }

            </div>
          </form>

          { error !== "" && 
            <>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">ERROR: </strong>
              <span className="block sm:inline">{ error }</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              </span>
            </div>
            </>
            }  
        </div>

      </div>
    </div>
  )
}
