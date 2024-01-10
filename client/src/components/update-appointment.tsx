import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { useStateContext } from '../contexts/state-contexts';
import { useParams } from 'react-router-dom';
// import 'react-datepicker/dist/react-datepicker.module.css'

const UpdateAppointment: React.FC = () => {
  type Appointment = {
    id: number;
    date: string;
    email: string;
    name?: string;
    service_name: string;
    status: string;
    time: string;
    users_id: number;
    price_paid: string;
  };

  const appointmentState = {
    id: 0,
    date: "",
    email: "",
    name: "Test Client",
    service_name: "",
    status: "",
    time: "",
    users_id: 0,
    price_paid: ""
  };

  const { currentUser } = useStateContext();
  const [appointment, setAppointment] = useState<Appointment>(appointmentState)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { appointmentId } = useParams();

  const date = new Date(appointment.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-indexed, must +1 to get accurate month value
  const day = date.getDate();
  const appointmentDate = `${ year }-${ month }-${ day }`

  console.log(appointmentDate)
  
  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async() => {
    try {
      const getAppointment = await fetch(`https://localhost:3001/users/${ currentUser }/appointments/${ appointmentId }`, {
        method: "GET",
        credentials: "include"
      });
  
      const result = await getAppointment.json();
      if (result.length > 0) {
        setAppointment(result[0]);
      } else {
        throw new Error("Appointment not found");
      }
    } catch (error) {
      console.log("Error fetching users appointment", error);
    }
  };

  console.log("appt id: ", appointment)

  return (
    <div className='container flex flex-col space-y-6 p-5 max-w-screen-lg'>
      <h1 className='text-center'>Update Appointment</h1>

      <div className='sm:mx-auto sm:w-full sm:max-w-sm max-w-2xl font-medium'>
        <form className='space-y-3'>
          <div>
            <label>Client</label>
            <div>
              <input
                value={ appointment.name }
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Contact Info</label>
            <div>
              <input
                value={ appointment.email }
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Service</label>
            <div>
              <input
                value={ appointment.service_name }
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Status</label>
            <div>
              <input
                value={ appointment.status }
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Date</label>
            <div>
              <input
                value={ appointmentDate }
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
              <DatePicker 
                dateFormat="yyyy-mm-dd"
                selected={ selectedDate }
                onChange={ (date) => setSelectedDate(date) }
              />
            </div>
          </div>
          <div>
            <label>Time</label>
            <div>
              <input
                value={ appointment.time }
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Price</label>
            <div>
              <input
                value={ appointment.price_paid }
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>

          <div>
            <button
              className='px-3 py-1 rounded-sm focus:ring-2 focus:ring-pink-300 bg-pink-300 hover:bg-pink-200 text-center text-white font-semibold'
            >Submit</button>
          </div>

        </form>
      </div>
    </div>
  )
};

export default UpdateAppointment;
