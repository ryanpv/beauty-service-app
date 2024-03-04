import React, { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/state-contexts';
import { BarLoader } from 'react-spinners';

type AppointmentList = {
  date: string;
  email: string;
  name?: string;
  id: number;
  service_name: string;
  status: string;
  time: string;
  users_id: number;
  price?: number;
}[];

interface AppointmentsList {
  appointmentList: Array<{
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
  setAppointmentList: Dispatch<SetStateAction<AppointmentList>>;
  status: number;
};

const AppointmentsTable: React.FC<AppointmentsList> = ({ appointmentList, setAppointmentList, status }) => {
  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
  const { currentUser } = useStateContext();
  const [loading, setLoading] = useState(false);

  const deleteAppointment = async(appointmentId: number, service_name: string, date: string, time: string) => {
    try {
      setLoading(true);
      const confirmDelete = window.confirm(`Do you wish to cancel your appointment for ${ service_name } on ${ date } at ${ time }`)
      if (confirmDelete) {
        const userId = typeof currentUser !== 'string' && currentUser.id;
        const deleteRequest = await fetch(`${ serverUrl }/users/${ userId }/appointments/${ appointmentId }`, {
          method: "DELETE",
          credentials: "include",
        });
  
        const results = await deleteRequest.json();
  
        if (deleteRequest.status !== 201) {
          throw new Error("Failed to cancel appointment.")
        } else {
          const removeCancelled = appointmentList.filter((appointments) => appointments.id !== results.id)
  
          setAppointmentList(removeCancelled)
        };
      }
      
      setLoading(false);
    } catch (error) {
      console.log("Failed to delete appointment", error);
      setLoading(false);
    }
  };

  const appointments = () => {
    if (appointmentList.length > 0) {
      return appointmentList.map((appointment) => {
        const date = new Date(appointment.date)
        const month = date.toLocaleDateString('default', { month: 'short' });
        const reformatDate = `${ date.getFullYear() }-${ month }-${ process.env.NODE_ENV === 'production' ? date.getDate() + 1 : date.getDate() }`

        return (
        <tr className='bg-pink-100' key={ appointment.id }>
          <td className='px-4 py-2'>{ appointment.name }</td>
          <td className='px-4 py-2'>{ appointment.email }</td>
          <td className='px-4 py-2'>{ appointment.service_name }</td>
          <td className='px-4 py-2'>{ appointment.status }</td>
          <td className='px-4 py-2'>{ reformatDate }</td>
          <td className='px-4 py-2'>{ appointment.time }</td>
          <td className='px-4 py-2'>{ appointment.price }</td>
          <td className='px-4 py-2'>
            <div className='inline-flex space-x-2'>
              <Link className='font-semibold underline pt-2' to={ `/update-appointment/${ appointment.id }` }>Edit </Link> 
              <p className='pt-2'>|</p>
              <button 
                className='bg-pink-300 hover:bg-red-600 hover:text-white hover:font-semibold m-2 rounded-full px-2 pb-1'
                onClick={ () => deleteAppointment(appointment.id, appointment.service_name, appointment.date, appointment.time) }
              >Del</button>
            </div>
          </td>
        </tr>
      )})
    }
  };

  return (
    <>
      <div className='mx-auto w-full text-center text-gray-600 font-bold mt-5 space-y-3'>
        <h1 className='pt-10 text-center font-semibold text-2xl'>{ status === 1 ? "Upcoming" : "Requested" } Appointments</h1>
        <hr className="h-px sm:mx-auto mx-3 sm:max-w-screen-md rounded-sm border-pink-200"></hr>
      </div>

      <div className='overflow-auto text-left shadow-lg py-3 rounded'>
        <table className='table-auto border-separate border-spacing-y-1'>
          <thead className='uppercase border text-white mt-10'>
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
          { loading ? 
            <div>
              <BarLoader color='#fbb6ce' /> 
            </div>
            : 
            <tbody>
              { appointments() }
            </tbody>
          }
        </table>
      </div>
    </>
  )
};

export default AppointmentsTable;
