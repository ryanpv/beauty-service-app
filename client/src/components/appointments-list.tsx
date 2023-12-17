import React from 'react'

export default function AppointmentsList() {
  return (
    <div className='container'>
      <h1 className='text-center'>
      AppointmentsList
      </h1>

      <div>
        <form className=''>
          <div>
            <label>Search Bar</label>
            <input placeholder='search bar here' />
          </div>
          <div className='flex flex-wrap'>
            <div>
              <label>
                Date Input 1
              </label>
              <input placeholder='date input'/>
            </div>
            <div>
              <label>
                Date Input 2
              </label>
              <input placeholder='date input'/>
            </div>
          </div>
        </form>
      </div>

      <div>
        <table className='table-fixed'>
          <thead>
            <tr>
              <th>Client</th>
              <th>Contact</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example Client 1</td>
              <td>1234553452</td>
              <td>manicure</td>
              <td>December 1, 2023</td>
              <td>13:00</td>
              <td>99.50</td>
              <td>X</td>
            </tr>
            <tr>
              <td>Example Client 2</td>
              <td>client@email.com</td>
              <td>pedicure</td>
              <td>December 2, 2023</td>
              <td>15:00</td>
              <td>70.99</td>
              <td>X</td>
            </tr>
            <tr>
              <td>Example Client 3</td>
              <td>77777777</td>
              <td>Full set</td>
              <td>December 3, 2023</td>
              <td>17:00</td>
              <td>123.50</td>
              <td>X</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}
