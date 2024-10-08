import React, { useEffect, useState } from 'react'
import ServiceCategory from '../templates/service-category';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/state-contexts';
import BarLoader from 'react-spinners/BarLoader';

const Services:React.FC = () => {
  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser, allServices, setAllServices } = useStateContext();
  const regularShellac = 1;
  const gelShellac = 2;
  const bioGel = 3;
  const nailCombo = 4;
  const additionalNail = 5;

  useEffect(() => {
    servicesList();   
  }, []);
  
  const servicesList = async() => {
    
    try {
      setLoading(true);
      const fetchServices = await fetch(`${ serverUrl }/services`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        }
      });

      const services = await fetchServices.json();

      if (fetchServices.status === 200 && Array.isArray(services)) {       
        setAllServices(services);
      } 
            
      setLoading(false);
    } catch (error) {
      console.log("Fetch services error: ", error);
      setLoading(false);
    }
  };

  return (
    <div className='container flex flex-col max-w-screen-md pb-10 space-y-10'>
      <div className='space-y-3'>
        <h1 className='text-center font-semibold text-[#725C77] text-5xl mt-10'>Available Services</h1>
        {/* <hr className="mx-5 lg:mx-0 border-[#342D59]" /> */}
      </div>

      { typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role === 2 ?
        <Link
          to='/add-new-service'
          className='px-8 py-1.5 mx-auto rounded-full text-center bg-pink-100 border-2 border-[#d64f92] font-semibold text-lg text-[#d64f92] hover:ring-pink-300 py-2.5 px-3.5 hover:bg-pink-300'
          >
          + ADD NEW SERVICES
        </Link>
        :
        null
      }

      { typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role !== 0 ? 
        <Link
          to='/book-appointment'
          className='px-8 py-2.5 mx-auto rounded-full text-center bg-pink-100 border-2 border-[#d64f92] font-semibold text-lg text-[#d64f92] hover:ring-pink-300 py-2.5 px-3.5 hover:bg-pink-300'
          >
          Book Appointment
        </Link>
        : 
        <div>
          <p className='text-2xl text-center'>Please sign in to book an appointment.&nbsp;
            <Link
              to='/login'
              className='mx-auto text-[#d64f92] hover:text-pink-700'
              >
              Sign in
            </Link>
            &nbsp;| 
            &nbsp; 
            <Link
              to='/register'
              className='mx-auto text-[#d64f92] hover:text-pink-700'
              >
              Create an account
            </Link>
          </p>
        </div>
      }
      

      <div className='space-y-6 text-gray-700 bg-pink-100 rounded shadow-xl px-5 py-10 mx-5 sm:mx-0'>
  {/* REGULAR POLISH SERVICES SECTION */}
        <div className='mx-3'>
          <h2 className='font-semibold text-3xl mb-2 text-[#342D59]'>Regular Polish Services</h2>
          <p className='text-xl font-semibold'>We are proud to offer OPI, Bio Seaweed Gel, Essie among other brands for our regular polish selection.
            Regular manicures and pedicures can be expected to last about a week with care. Please wear sandals or 
            open toe shoes for pedicures, and expect additional time for drying!</p>
        </div>

        { loading ? 
          <div className='mx-auto mt-10'><BarLoader color='#fbb6ce'/></div> 
          :
          <ServiceCategory list={ allServices } serviceCategoryId={ regularShellac } loading={ loading }/> 
        }
          
  {/* GEL/SHELLAC SERVICES SECTION */}
        <hr className="mx-5 lg:mx-0 border-pink-300"></hr>

        <div className='mx-3'>
          <h2 className='font-semibold text-3xl mb-2 text-[#342D59]'>Gel/Shellac Services</h2>
          <p className='text-xl font-semibold'>Beautiful pigments with a glossy finish. Or choose a matte top coat if you prefer! Gel/Shellac can be expected to last about 2-3 weeks with care. Feel confident with our 1 week guarantee!</p>
        </div>

        { loading ? 
          <div className='mx-auto mt-10'><BarLoader color='#fbb6ce'/></div> 
          :
          <ServiceCategory list={ allServices } serviceCategoryId={ gelShellac } loading={ loading }/>
        }

  {/* BIO GEL SERVICES SECTION */}
        <hr className="mx-5 lg:mx-0 border-pink-300"></hr>

        <div className='mx-3'>
          <h2 className='font-semibold text-3xl mb-2 text-[#342D59]'>Bio Gel Services</h2>
          <p className='text-xl font-semibold'>Strong and durable nails with a glossy or matte finish. Perfect for long nails or weak/brittle nails. Can be expected to last about 3-4 weeks. Backed by our 1 week guarantee.</p>
        </div>

        { loading ? 
          <div className='mx-auto mt-10'><BarLoader color='#fbb6ce'/></div> 
          :
          <ServiceCategory list={ allServices } serviceCategoryId={ bioGel } loading={ loading }/>
        }

  {/* NAIL COMBO SERVICES SECTION */}
        <hr className="mx-5 lg:mx-0 border-pink-300"></hr>

        <div className='mx-3'>
          <h2 className='font-semibold text-3xl mb-2 text-[#342D59]'>Nail Combo Services</h2>
          <p></p>
        </div>

        { loading ? 
          <div className='mx-auto mt-10'><BarLoader color='#fbb6ce'/></div> 
          :
          <ServiceCategory list={ allServices } serviceCategoryId={ nailCombo } loading={ loading }/>
        }

  {/* ADDITIONAL NAIL SERVICES SECTION */}
        <hr className="mx-5 lg:mx-0 border-pink-300"></hr>

        <div className='mx-3'>
          <h2 className='font-semibold text-3xl mb-2 text-[#342D59]'>Additional Nail Services</h2>
          <p className='text-xl font-semibold'>We are pleased to offer high quality, beautiful designs from our talented nail techs. We are always on trend and constantly update our skills to keep up with the latest styles. We offer everything from the classic French to ombré to marble to lots of bling! We have pearls, metal shapes, foil, stickers, dust, glitter…you name it! To top it all off, we offer Swarovski crystals for maximum sparkle and shine. Be sure to check out our Instagram for our latest creations!</p>
        </div>

        { loading ? 
          <div className='mx-auto mt-10'><BarLoader color='#fbb6ce'/></div> 
          :
          <ServiceCategory list={ allServices } serviceCategoryId={ additionalNail } loading={ loading }/>
        }
    </div>
    
    </div>
  )
};


export default Services;