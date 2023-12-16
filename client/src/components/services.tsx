import React from 'react'

export default function Services() {
  return (
    <div className='container flex flex-col border-2 border-solid m-auto'>
      <h1 className='text-center font-bold'>Available Services</h1>

      <a href='/add-new-service'>Add new service</a>
      
      <h2 className='font-bold'>Regular Polish Services</h2>
      <p>description</p>

      <div>
        <div>
          <h3>Service name</h3>
          <h3>Service price</h3>
        </div>
        <p>Service description</p>
      </div>
      <button>Delete service</button>
      

    </div>
  )
}
