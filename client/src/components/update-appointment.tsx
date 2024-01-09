import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
// import 'react-datepicker/dist/react-datepicker.module.css'

const UpdateAppointment: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-index, must +1 to get accurate month value
  const day = date.getDate();
  const currentDate = `${ year }-${ month }-${ day }`

  const userId = 1

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { appointmentId } = useParams();

  const appointment = async() => {
    const getAppointment = await fetch(`https://localhost:3001/`)
  }

  console.log("appt id: ", appointmentId)
  console.log("Date: ", new Date("2023-05-12"))
  return (
    <div className='container flex flex-col space-y-6 p-5 max-w-screen-lg'>
      <h1 className='text-center'>Update Appointment</h1>

      <div className='sm:mx-auto sm:w-full sm:max-w-sm max-w-2xl font-medium'>
        <form className='space-y-3'>
          <div>
            <label>Client</label>
            <div>
              <input
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Contact Info</label>
            <div>
              <input
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Service</label>
            <div>
              <input
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Status</label>
            <div>
              <input
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Date</label>
            <div>
              <input
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
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Price</label>
            <div>
              <input
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
