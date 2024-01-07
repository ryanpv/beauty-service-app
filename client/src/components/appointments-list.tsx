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
  const [appointmentStatus, setAppointmentStatus] = useState(1); // value 1 is id for "upcoming"
  
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-index, must +1 to get accurate month value
  const day = date.getDate();
  const currentDate = `${ year }-${ month }-${ day }`

  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState("");

  type FormFilter = {
    search: string;
    startDate: string;
    endDate: string;
    status: number;
  };
  const [formState, setFormState] = useState<FormFilter>({
    search: "",
    startDate: currentDate,
    endDate: "",
    status: 1
  });

  useEffect(() => {
    appointments();
  }, []);
  
  const appointments = async() => {
    try {
      const fetchAppointments = await fetch(`https://localhost:3001/users/11/appointments?status=${ formState.status }&start_date=${ formState.startDate }&end_date=${ formState.endDate }&search=${ formState.search }`, {
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

  const filterHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault();

    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitFilter = (event: React.FormEvent) => {
    event.preventDefault();

    appointments();

    console.log("state", formState)
  };

  return (
    <div className='container flex flex-col space-y-6 max-w-screen-lg'>
      <h1 className='mt-10 text-center text-2xl font-bold'>
      AppointmentsList
      </h1>
{/* FILTER FORM  */}
      <div className='sm:mx-auto max-w-2xl'>
        <form onSubmit={ submitFilter } className='space-y-3 mx-3'>
          <div>
            <label>
              Search
            </label>
            <div className='mt-2'>
              <input 
                onChange={ filterHandler }
                name='search'
                placeholder='Enter name or contact information'
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div className='flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0'>
            <div>
              <label>
                Start Date
              </label>
              <div>
                <input 
                  onChange={ filterHandler }
                  defaultValue={ formState.startDate }
                  name='startDate'
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
                  onChange={ filterHandler }
                  name='endDate'
                  placeholder='MM/DD/YYYY'
                  className='block py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'              
                />
              </div>
            </div>
          </div>
          <div>
            <label className='font-bold'>Status:</label>
            <select 
              onChange={ filterHandler }
              className='py-1.5 px-2.5 w-full border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
              name='status'
            >
              <option value={ 1 }>Upcoming</option>
              <option value={ 2 }>Complete</option>
            </select>
          </div>
          <div>
            <button
              type='submit'
              className='px-3 py-1 rounded-sm focus:ring-2 focus:ring-pink-300 bg-pink-300 hover:bg-pink-200 text-center text-white font-semibold'
              >Filter</button>
          </div>
        </form>
      </div>

{/* APPOINTMENT LIST TABLE */}
    <AppointmentsTable list={ appointmentList } status={ formState.status }/>

    </div>
  )
}

export default AppointmentsList;