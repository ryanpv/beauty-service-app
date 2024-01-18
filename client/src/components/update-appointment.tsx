import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { useStateContext } from '../contexts/state-contexts';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateAppointment: React.FC = () => {
  type Appointment = {
    appointmentId: number;
    date: string | null;
    email: string;
    name?: string;
    service_name: string;
    status: string;
    time: string | null;
    users_id: number;
    price_paid: string;
  };

  const appointmentState = {
    appointmentId: 0,
    date: null,
    email: "",
    name: "",
    service_name: "",
    status: "",
    time: null,
    users_id: 0,
    price_paid: ""
  };

  const { currentUser } = useStateContext();
  const [appointment, setAppointment] = useState<Appointment>(appointmentState)
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async() => {
    console.log('fetch called')
    try {
      const getAppointment = await fetch(`https://localhost:3001/users/${ currentUser }/appointments/${ appointmentId }`, {
        method: "GET",
        credentials: "include"
      });
  
      const result = await getAppointment.json();
      console.log("result date: ", result)
      if (result.length > 0) {
        setAppointment(result[0]);
      } else {
        throw new Error("Appointment not found");
      }
    } catch (error) {
      console.log("Error fetching users appointment", error);
    }
  };

  const putFormHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date) => {
    if (event instanceof Date) {
      const date = new Date(event);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 0-indexed, must +1 to get accurate month value
      const day = date.getDate();
      const appointmentDate = `${ year }-${ month }-${ day }`

      setAppointment((prev) => ({
        ...prev,
        date: appointmentDate
      }));
    } else {
      const { name, value } = event.target;
  
      setAppointment((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const submitForm = async(event: React.FormEvent) => {
    event.preventDefault();

    try {
      const putFormRequest = await fetch(`https://localhost:3001/users/${ currentUser }/appointments/${ appointmentId }`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(appointment)
      });

      const result = await putFormRequest;

      if (result.status !== 201) {
      throw new Error("Error updating appointment");
      } else {
        alert("Appointment successfully updated");
        navigate("/appointments");
      }
    } catch (error) {
      console.log("Error updating appointment")
    }

  };

  return (
    <div className='container flex flex-col space-y-6 p-5 max-w-screen-lg'>
      <h1 className='text-center'>Update Appointment</h1>

      <div className='sm:mx-auto sm:w-full sm:max-w-sm max-w-2xl font-medium'>
        <form className='space-y-3' onSubmit={ submitForm }>
          <div>
            <label>Client</label>
            <div>
              <input
                name='name'
                value={ appointment.name }
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Contact Info</label>
            <div>
              <input
                name='email'
                value={ appointment.email }
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Service</label>
            <div>
              <input
                onChange={ putFormHandler }
                name='service_name'
                value={ appointment.service_name }
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label className='font-bold'>Status:</label>
            <select 
              onChange={ putFormHandler }
              className='py-1.5 px-2.5 w-full border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
              name='status'
            >
              <option value={ 1 }>Upcoming</option>
              <option selected value={ 2 }>Requested</option>
              <option value={ 3 }>Cancelled</option>
              <option value={ 4 }>Completed</option>
              <option value={ 5 }>Misc</option>
            </select>
          </div>
          <div className=''>
            <label>Date</label>
            <div>
              <DatePicker 
                className='block sm:w-96 py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
                dateFormat="MMMM d yyyy"
                selected={ appointment.date ? new Date(appointment.date) : null }
                onChange={ (date) => date && putFormHandler(date) }
              />
            </div>
          </div>
          <div>
            <label>Time</label>
            <div>
              <input
                onChange={ putFormHandler }
                name='time'
                value={ appointment.time ? appointment.time : "" }
                className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
              />
            </div>
          </div>
          <div>
            <label>Price</label>
            <div>
              <input
                onChange={ putFormHandler }
                name='price_paid'
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
