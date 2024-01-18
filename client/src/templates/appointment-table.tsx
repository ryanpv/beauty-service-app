import React from 'react'
import { Link } from 'react-router-dom';

interface AppointmentsList {
  list: Array<{
    date: string;
    email: string;
    name?: string;
    id: number;
    service_name: string;
    status: string;
    time: string;
    users_id: number;
    price?: number;
  }>;
  status: number;
};

const AppointmentsTable: React.FC<AppointmentsList> = ({ list, status }) => {
  const appointments = () => {
    if (list.length > 0) {
      return list.map((appointment) => {
        const date = new Date(appointment.date)
        const month = date.toLocaleDateString('default', { month: 'short' });
        const reformatDate = `${ date.getFullYear() }-${ month }-${ date.getDate() }`

        return (
        <tr className='bg-pink-200'>
          <td className='px-4 py-2'>{ appointment.name }</td>
          <td className='px-4 py-2'>{ appointment.email }</td>
          <td className='px-4 py-2'>{ appointment.service_name }</td>
          <td className='px-4 py-2'>{ appointment.status }</td>
          <td className='px-4 py-2'>{ reformatDate }</td>
          <td className='px-4 py-2'>{ appointment.time }</td>
          <td className='px-4 py-2'>{ appointment.price }</td>
          <td className='px-4 py-2'>
            <div className='space-x-1'>
              <Link to={`/update-appointment/${ appointment.id }`}>Edit</Link> | 
              <button>Del</button>
            </div>
          </td>
        </tr>
      )})
    }
  };

  return (
    <>
    <h1 className='text-center font-semibold'>{ status === 1 ? "Upcoming" : "Requested" } Appointments</h1>

    <div className='overflow-auto text-left p-5'>
        <table className='table-auto overflow-scroll border-separate border-spacing-y-1'>
          <thead className='uppercase border'>
            <tr className='bg-pink-300'>
              <th className='px-4 py-2 w-1/4'>Client</th>
              <th className='px-4 py-2 w-1/4'>Contact</th>
              <th className='px-4 py-2 w-1/2'>Service</th>
              <th className='px-4 py-2 w-1/4'>Status</th>
              <th className='px-4 py-2 w-1/4'>Date</th>
              <th className='px-4 py-2 w-1/4'>Time</th>
              <th className='px-4 py-2 w-1/4'>Price</th>
              <th className='px-4 py-2 w-1/4'></th>
            </tr>
          </thead>
          <tbody>
            { appointments() }
          </tbody>
        </table>
      </div>
    </>
  )
};

export default AppointmentsTable;
