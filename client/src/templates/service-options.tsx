import React from 'react'

interface Services {
  serviceList: Array<{
    id: number;
    service_name: string;
    service_category_name: string;
    service_categories_id: number;
    price: string;
    description: string;
  }> | []
};

const ServiceOptions: React.FC<Services> = ({ serviceList }) => {
  const displayOptions = () => {
    if (serviceList.length > 0) {
      return (
        serviceList.map((service) => (
          <option key={ service.id } value={ service.id }>{ service.service_name }</option>
          )
        )
      );
    }
    return ;
  };

  return (
    <div>
      <select
        onChange={}
        className='py-1.5 px-2.5 w-full border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
        >
        <option selected>Select a service...</option>
        { displayOptions() }
      </select>
    </div>
  )
};

export default ServiceOptions;
