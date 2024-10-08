import React from 'react';
import { useStateContext } from '../contexts/state-contexts'; 
import { Link } from 'react-router-dom';

interface Services {
  list: Array<{
    id: number;
    service_name: string;
    service_category_name: string;
    service_categories_id: number;
    price: string;
    description: string;
  }>;
  serviceCategoryId: number;
  loading: boolean;
};

const ServiceCategory: React.FC<Services> = ({ list, serviceCategoryId, loading }) => {
  const { currentUser } = useStateContext();

  const services = () => {   
      if (Array.isArray(list) && list.length !== 0) {
        return list.filter((service) => service.service_categories_id === serviceCategoryId)
          .map((service) => {
            return (
              <div className='flex flex-col p-5 mx-auto sm:min-w-full space-y-3' key={ service.id }>
                <div className='flex justify-between font-semibold text-xl'>
                  <h3 className='text-[#d64f92] text-xl'>{ service.service_name }</h3>
                  <h3 className='text-[#d64f92]'>{ service.price }</h3>
                </div>
                <p className='text-lg font-semibold'>{ service.description }</p>
                { (typeof currentUser !== "string" && currentUser.role === 2 && currentUser.id !== 0) ?

                <Link 
                  to={ `/update-service/${ service.id }` }
                  className='text-center bg-pink-300 hover:bg-pink-400 font-semibold text-white rounded-xl'
                  >
                    Edit service
                  </Link>
                  : null
                }
            </div>          
            )
          });
    } else {
      return (
        <h1 className='text-red-600 font-semibold'>List of services currently unavailable.</h1>
      )
    }
  };


  return (
    <>
      { services() }
    </>
  )
}

export default ServiceCategory;