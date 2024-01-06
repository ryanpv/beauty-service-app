import React from 'react'

export default function AppointmentsList() {
  const admin = true
  const appointments = async() => {
    const fetchAppointments = await fetch(`https://localhost:3001/`)
  }

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
        </form>
      </div>

{/* APPOINTMENT LIST TABLE */}
      <div className='overflow-auto text-left p-5'>
        <table className='table-auto overflow-scroll border-separate border-spacing-y-1'>
          <thead className='uppercase border'>
            <tr className='bg-pink-300'>
              <th className='px-4 py-2 w-1/4'>Client</th>
              <th className='px-4 py-2 w-1/4'>Contact</th>
              <th className='px-4 py-2 w-1/2'>Service</th>
              <th className='px-4 py-2 w-1/4'>Date</th>
              <th className='px-4 py-2 w-1/4'>Time</th>
              <th className='px-4 py-2 w-1/4'>Price</th>
              <th className='px-4 py-2 w-1/4'></th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-pink-200'>
              <td className='px-4 py-2'>Example Client 1</td>
              <td className='px-4 py-2'>1234553452</td>
              <td className='px-4 py-2'>manicurema nicuremanic uremanicur emanic uremanic asdfdsa fsdafsaffsurem anicuremanicure</td>
              <td className='px-4 py-2'>December 1, 2023</td>
              <td className='px-4 py-2'>13:00</td>
              <td className='px-4 py-2'>99.50</td>
              { admin ? <td className='px-4 py-2'>X</td> : null }
            </tr>
            <tr className='bg-pink-200'>
              <td className='px-4 py-2'>Example Client 2</td>
              <td className='px-4 py-2'>client@email.com</td>
              <td className='px-4 py-2'>pedicure</td>
              <td className='px-4 py-2'>December 2, 2023</td>
              <td className='px-4 py-2'>15:00</td>
              <td className='px-4 py-2'>30.99</td>
              <td className='px-4 py-2'>X</td>
            </tr>
            <tr className='bg-pink-200'>
              <td className='px-4 py-2'>Example Client 3</td>
              <td className='px-4 py-2'>33333333</td>
              <td className='px-4 py-2'>Full set</td>
              <td className='px-4 py-2'>December 3, 2023</td>
              <td className='px-4 py-2'>13:00</td>
              <td className='px-4 py-2'>123.50</td>
              <td className='px-4 py-2'>X</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
