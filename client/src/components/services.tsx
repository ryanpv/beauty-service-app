import React from 'react'

export default function Services() {
  return (
    <div className='container flex flex-col max-w-screen-sm space-y-6'>
      <h1 className='text-center font-bold text-2xl mt-5'>Available Services</h1>

      <a 
        href='/add-new-service' 
        className='bg-pink-300 hover:bg-pink-200 px-3 py-1.5 mx-auto rounded-sm text-center font-semibold text-white focus:ring-2 focus:ring-pink-300 '
        >
        Add new service
      </a>

      <div className='mx-3'>
        <h2 className='font-semibold text-2xl mb-2'>Regular Polish Services</h2>
        <p>We are proud to offer OPI, Bio Seaweed Gel, Essie among other brands for our regular polish selection.
           Regular manicures and pedicures can be expected to last about a week with care. Please wear sandals or 
           open toe shoes for pedicures, and expect additional time for drying!</p>
      </div>
{/* TEST SERVICE ITEM 1 */}
      <div className='flex flex-col p-5 mx-auto space-y-3'>
        <div className='flex justify-between font-semibold sm:text-xl'>
          <h3>Spa Manicure</h3>
          <h3>$30</h3>
        </div>
        <p>includes single regular polish colour of choice, cuticle clean up, nail shaping, hot towel service, and 
          hand massage with cream
        </p>
        <button className='bg-pink-300 hover:bg-pink-200 font-semibold text-white rounded-sm'>Edit service</button>
      </div>
{/* TEST SERVICE ITEM 2 */}
      <div className='flex flex-col p-5 mx-auto space-y-3'>
        <div className='flex justify-between font-semibold sm:text-xl'>
          <h3>Spa Manicure</h3>
          <h3>$30</h3>
        </div>
        <p>includes single regular polish colour of choice, cuticle clean up, nail shaping, hot towel service, and 
          hand massage with cream
        </p>
        <button className='bg-pink-300 hover:bg-pink-200 font-semibold text-white rounded-sm'>Edit service</button>
      </div>


      <hr className="px-5 min-w-full h-px rounded-sm bg-pink-300"></hr>
{/* TEST SERVICE ITEM 3 */}
      <div className='mx-3'>
        <h2 className='font-semibold text-2xl'>Gel/Shellac Services</h2>
        <p>Beautiful pigments with a glossy finish. Or choose a matte top coat if you prefer! Gel/Shellac can be 
          expected to last about 2-3 weeks with care. Feel confident with our 1 week guarantee!
        </p>
      </div>

      <div className='flex flex-col p-5 mx-auto space-y-3'>
        <div className='flex justify-between font-semibold sm:text-xl'>
          <h3>Gel /Shellac Manicure</h3>
          <h3>$40+</h3>
        </div>
        <p>includes single gel colour of choice, deep cuticle clean up, nail shaping, hot towel service, and hand 
          massage with cream and cuticle oil.
          add a layer of biogel underneath the colour to reinforce and prolong retention for an additional $5
        </p>
        <button className='bg-pink-300 hover:bg-pink-200 font-semibold text-white rounded-sm'>Edit service</button>
      </div>

    </div>
  )
}
