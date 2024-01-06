import React from 'react'

interface Services {
  list: Array<{
    id: number;
    service_name: string;
    service_category_name: string;
    service_categories_id: number;
    price: string;
    description: string;
  }>;
  serviceId: number;
};

const ServiceCategory: React.FC<Services> = ({ list, serviceId }) => {

  const services = () => {
      if (list.length !== 0) {
        return list.filter((service) => service.service_categories_id === serviceId)
          .map((service) => {
            return (
              <div className='flex flex-col p-5 mx-auto sm:min-w-full space-y-3' key={ service.id }>
                <div className='flex justify-between font-semibold sm:text-xl'>
                  <h3>{ service.service_name }</h3>
                  <h3>{ service.price }</h3>
                </div>
                <p>{ service.description }</p>
                <button className='bg-pink-300 hover:bg-pink-200 font-semibold text-white rounded-sm'>Edit service</button>
            </div>          
            )
          });
    } else {
      return (
        <h1>No services for this category</h1>
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