import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling

export default function BookingPage() {
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
            <Calendar />
          </div>

          <div className='m-auto px-5 border-2 border-solid border-black- 300 grid grid-cols-4 gap-2'>
            <div>
              <button
                className='w-full bg-pink-300 hover:bg-pink-200 px-3 py-1.5 rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
              >12:00 PM</button>
            </div>
            <div>
              <button
                className='w-full bg-pink-300 hover:bg-pink-200 px-3 py-1.5 rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
              >15:00 PM</button>
            </div>
            <div>
              <button
                className='w-full bg-pink-300 hover:bg-pink-200 px-3 py-1.5 rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
              >16:00 PM</button>
            </div>
            <div>
              <button
                className='w-full bg-pink-300 hover:bg-pink-200 px-3 py-1.5 rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
              >17:00 PM</button>
            </div>
            <div>
              <button
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
