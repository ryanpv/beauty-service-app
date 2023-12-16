import React from 'react'

export default function BookingPage() {
  return (
    <div>
      <h1>Book Appointment</h1>
      <i>If you wish to have a specific technician, select one using the options below</i>

    <form>
      <div>
        <button>Technician</button>
        <div>dropdown component</div>
      </div>

      <div>
        <button>Service</button>
        <div>dropdown component</div>
      </div>

      {/* calender component import */}

      <div>
        Time slots
      </div>

      <button>Add to cart</button>
    </form>

    </div>
  )
}
