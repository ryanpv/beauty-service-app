import React, { useEffect, useState } from 'react'
import ServiceCategory from '../templates/service-category';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/state-contexts';
import BarLoader from 'react-spinners/BarLoader';

const Services:React.FC = () => {
  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
  const [loading, setLoading] = useState(false);
console.log("server: ", process.env.NODE_ENV);

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
      setAllServices(services);
      setLoading(false);
    } catch (error) {
      console.log("Fetch services error: ", error);
      setLoading(false);
    }
  };

  return (
    <div className='container flex flex-col max-w-screen-md space-y-6'>
      <div className='space-y-3'>
        <h1 className='text-center font-bold text-gray-600 text-4xl mt-10'>Available Services</h1>
        <hr className="mx-5 lg:mx-0 border-pink-200" />
      </div>

      { typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role === 2 ?
        <Link
          to='/add-new-service'
          className='px-8 py-1.5 mx-auto rounded-full text-center bg-pink-300 font-semibold text-lg text-white hover:ring-pink-400 py-2.5 px-3.5 text-white hover:bg-pink-400'
        >
          + ADD NEW SERVICES
        </Link>
        :
        null
      }
      
      <Link
        to='/book-appointment'
        className='px-8 py-1.5 mx-auto rounded-full text-center bg-pink-300 font-semibold text-lg text-white hover:ring-pink-400 py-2.5 px-3.5 text-white hover:bg-pink-400'
        >
        Book Appointment
      </Link>
      { loading ? <div className='mx-auto mt-10'><BarLoader color='#fbb6ce'/></div> : 
      <div className='space-y-6 text-gray-600'>
  {/* REGULAR POLISH SERVICES SECTION */}
        <div className='mx-3'>
          <h2 className='font-semibold text-2xl mb-2'>Regular Polish Services</h2>
          <p>We are proud to offer OPI, Bio Seaweed Gel, Essie among other brands for our regular polish selection.
            Regular manicures and pedicures can be expected to last about a week with care. Please wear sandals or 
            open toe shoes for pedicures, and expect additional time for drying!</p>
        </div>

        <ServiceCategory list={ allServices } serviceCategoryId={ regularShellac } loading={ loading }/>
        
  {/* GEL/SHELLAC SERVICES SECTION */}
        <hr className="mx-5 lg:mx-0 border-pink-300"></hr>

        <div className='mx-3'>
          <h2 className='font-semibold text-2xl mb-2'>Gel/Shellac Services</h2>
          <p>Beautiful pigments with a glossy finish. Or choose a matte top coat if you prefer! Gel/Shellac can be expected to last about 2-3 weeks with care. Feel confident with our 1 week guarantee!</p>
        </div>

        <ServiceCategory list={ allServices } serviceCategoryId={ gelShellac } loading={ loading }/>

  {/* BIO GEL SERVICES SECTION */}
        <hr className="mx-5 lg:mx-0 border-pink-300"></hr>

        <div className='mx-3'>
          <h2 className='font-semibold text-2xl mb-2'>Bio Gel Services</h2>
          <p>Strong and durable nails with a glossy or matte finish. Perfect for long nails or weak/brittle nails. Can be expected to last about 3-4 weeks. Backed by our 1 week guarantee.</p>
        </div>

        <ServiceCategory list={ allServices } serviceCategoryId={ bioGel } loading={ loading }/>

  {/* NAIL COMBO SERVICES SECTION */}
        <hr className="mx-5 lg:mx-0 border-pink-300"></hr>

        <div className='mx-3'>
          <h2 className='font-semibold text-2xl mb-2'>Nail Combo Services</h2>
          <p></p>
        </div>

        <ServiceCategory list={ allServices } serviceCategoryId={ nailCombo } loading={ loading }/>

  {/* ADDITIONAL NAIL SERVICES SECTION */}
        <hr className="mx-5 lg:mx-0 border-pink-300"></hr>

        <div className='mx-3'>
          <h2 className='font-semibold text-2xl mb-2'>Additional Nail Services</h2>
          <p>We are pleased to offer high quality, beautiful designs from our talented nail techs. We are always on trend and constantly update our skills to keep up with the latest styles. We offer everything from the classic French to ombré to marble to lots of bling! We have pearls, metal shapes, foil, stickers, dust, glitter…you name it! To top it all off, we offer Swarovski crystals for maximum sparkle and shine. Be sure to check out our Instagram for our latest creations!</p>
        </div>

        <ServiceCategory list={ allServices } serviceCategoryId={ additionalNail } loading={ loading }/>
    </div>
    }
    </div>
  )
};


export default Services;