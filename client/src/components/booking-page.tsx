import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling

// use context for stored list of services so that it can be loaded as a service option 
// 

export default function BookingPage() {
  type CalendarDates = Date | null; // required for react-calendar as it has a prop for range

  type NewAppointment = {
    date: Date | string;
    time: string;
    serviceId: number;
    price_paid: string;
  };

  const newAppointmentState = {
    date: new Date(),
    time: "",
    serviceId: 0,
    price_paid: ""
  };

  const [newAppointment, setNewAppointment] = useState<NewAppointment>(newAppointmentState)

  const formChangeHandler = (event: Date | CalendarDates[] | React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {   
    if (event instanceof Date) {
      setNewAppointment((prev) => ({
        ...prev,
        date: event
      }));
    } else if (Array.isArray(event) && event.length === 2 && event[0] instanceof Date && event[1] instanceof Date) {
      console.log('Range event: ', event)
    } else {
      (event as React.MouseEvent<HTMLButtonElement>).preventDefault();
      const { name, value } = (event as React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | React.MouseEvent<HTMLButtonElement>).target as HTMLInputElement | HTMLSelectElement | HTMLButtonElement;
      setNewAppointment((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
console.log("newApp: ", newAppointment)
  return (
    <div className='container flex flex-col border-2 border-solid space-y-10 my-10'>
      <h1 className='text-center font-bold text-2xl'>Book Appointment</h1>
      <i className='text-center'>If you wish to have a specific technician, select one using the options below</i>

    <div className='border-2 border-solid sm:mx-auto sm:w-full sm:max-w-screen-xl'>
      <form className='border-2 border-solid border-pink-300 justify-between'>
        <div className='flex flex-col space-y-10'>
          <div className='flex flex-col sm:flex-row justify-around space-y-5 sm:space-y-0'>
            <div className=''>
              <button
                className='bg-pink-300 hover:bg-pink-200 w-full px-3 py-1.5 mx-auto rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
              >
                Technician
              </button>
              <div>dropdown component</div>
            </div>

            <div>
              <button
                className='bg-pink-300 hover:bg-pink-200 w-full px-3 py-1.5 mx-auto rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
              >
                Service
              </button>
              <div>dropdown component</div>
            </div>
          </div>

          {/* calender component import */}
          <div className='mx-auto'>
            <Calendar 
              onChange={ (date) => date && formChangeHandler(date) }
              value={ newAppointment.date instanceof Date ? newAppointment.date : new Date(newAppointment.date) }
            />
          </div>

          <div className='m-auto px-5 border-2 border-solid border-black- 300 grid grid-cols-4 gap-2'>
            <div>
              <button
                name='time'
                value="12:00"
                onClick={ formChangeHandler }
                className='w-full bg-pink-300 hover:bg-pink-200 px-3 py-1.5 rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
              >12:00 PM</button>
            </div>
            <div>
              <button
                name='time'
                value="15:00"
                onClick={ formChangeHandler }
                className='w-full bg-pink-300 hover:bg-pink-200 px-3 py-1.5 rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
              >15:00 PM</button>
            </div>
            <div>
              <button
                name='time'
                value="16:00"
                onClick={ formChangeHandler }
                className='w-full bg-pink-300 hover:bg-pink-200 px-3 py-1.5 rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
              >16:00 PM</button>
            </div>
            <div>
              <button
                name='time'
                value="17:00"
                onClick={ formChangeHandler }
                className='w-full bg-pink-300 hover:bg-pink-200 px-3 py-1.5 rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
              >17:00 PM</button>
            </div>
            <div>
              <button
                name='time'
                value="18:00"
                onClick={ formChangeHandler }
                className='w-full bg-pink-300 hover:bg-pink-200 px-3 py-1.5 rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
              >18:00 PM</button>
            </div>
          </div>

          <button
            className='bg-pink-300 hover:bg-pink-200 px-3 py-1.5 mx-auto rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
          >
            Add to cart
          </button>
        </div>
      </form>
    </div>

    </div>
  )
}
