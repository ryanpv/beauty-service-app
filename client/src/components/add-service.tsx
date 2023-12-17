import React from 'react'

export default function AddService
() {
  return (
    <div className='container'>
      <h1>Add New Service</h1>

      <div>
        <form>
          <div>
            <label>
              Service Category
            </label>
            <input />
          </div>
          <div>
            <label>
              Service Name
            </label>
            <input />
          </div>
          <div>
            <label>
              Price
            </label>
            <input />
          </div>
          <div>
            <label>
              Service Description
            </label>
            <input />
          </div>
          
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>

    </div>
  )
}
