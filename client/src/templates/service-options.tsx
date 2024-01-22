import React, { Dispatch, SetStateAction } from 'react';

type NewAppointment = { // type for newAppointment state variable
  date: Date | string;
  time: string;
  id: string;
  price_paid: number;
};

type CalendarDates = Date | null;

interface Services { // interface for props passed to this component
  serviceList: Array<{
    id: number;
    service_name: string;
    service_category_name: string;
    service_categories_id: number;
    price: string;
    description: string;
    duration: number;
  }> | [],
  formHandler: (event: Date | CalendarDates[] | React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  newAppointment: NewAppointment,
  setNewAppointment: Dispatch<SetStateAction<NewAppointment>>
};

const ServiceOptions: React.FC<Services> = ({ serviceList, newAppointment, formHandler }) => {
  const displayOptions = () => {
    if (serviceList.length > 0) {
      return (
        serviceList.map((service) => (
          <option key={ service.id } value={ JSON.stringify({ id: service.id, service_name: service.service_name, duration: service.duration }) }>{ service.service_name }</option>
          )
        )
      );
    }
    return ;
  };

  return (
    <div className='w-80 text-center'>
      <label className='font-semibold'>Selected a service to see available times:</label>
      <select
        required
        name='id'
        onChange={ formHandler }
        className='py-1.5 px-2.5 w-full border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
        >
        <option selected value="" >Select a service...</option>
        { displayOptions() }
      </select>
    </div>
  )
};

export default ServiceOptions;
