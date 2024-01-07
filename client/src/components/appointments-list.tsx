import React, { useEffect, useState } from 'react'
import AppointmentsTable from '../templates/appointment-table';

const AppointmentsList:React.FC = () => {
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

  const [appointmentList, setAppointmentList] = useState<AppointmentList>([]);
  const upcoming = 1;
  const complete = 2;

  useEffect(() => {
    appointments();
  }, []);

  const appointments = async() => {
    try {
      const fetchAppointments = await fetch(`https://localhost:3001/users/11/appointments`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        }
      });
  
      const result = await fetchAppointments.json();
      setAppointmentList(result);
      console.log("appointments: ", result)
    } catch (error) {
      console.log("Error fetching appointments")
    }
  };


  return (
    <div className='container flex flex-col space-y-6 max-w-screen-lg'>
      <h1 className='mt-10 text-center text-2xl font-bold'>
      AppointmentsList
      </h1>
{/* FILTER FORM  */}
      <div className='mx-auto'>
        <form className='space-y-6 mx-3'>
          <div>
            <label>
              Search
            </label>
            <div className='mt-2'>
              <input 
                placeholder='Enter name or contact information'
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div className='flex flex-wrap sm:space-x-6 space-y-3 sm:space-y-0'>
            <div>
              <label>
                Start Date
              </label>
              <div>
                <input 
                  placeholder='MM/DD/YYYY'
                  className='block py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'  
                />
              </div>
            </div>
            <div>
              <label>
                End Date
              </label>
              <div>
                <input 
                  placeholder='MM/DD/YYYY'
                  className='block py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'              
                />
              </div>
            </div>
          </div>
          <div>
            <label className='font-bold'>Status:</label>
            <select 
              className='py-1.5 px-2.5 w-full border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
              name='service_categories_id'
            >
              <option>Upcoming</option>
              <option>Complete</option>
            </select>
          </div>
        </form>
      </div>

{/* APPOINTMENT LIST TABLE */}
    <AppointmentsTable list={ appointmentList } status={ upcoming }/>

    </div>
  )
}

export default AppointmentsList;