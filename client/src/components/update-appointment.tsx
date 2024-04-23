import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { useStateContext } from '../contexts/state-contexts';
import { useNavigate, useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const UpdateAppointment: React.FC = () => {
  type Appointment = {
    appointmentId: number; // changes to 'id' after appointment is fetched
    date: string | null;
    email: string;
    name?: string;
    service_name: string;
    status_name: string;
    status: number;
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
    status_name: "",
    status: 0,
    time: null,
    users_id: 0,
    price_paid: ""
  };

  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
  const { currentUser, setCurrentUser, currentUserState } = useStateContext();
  const [appointment, setAppointment] = useState<Appointment>(appointmentState)
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = React.useState("");
  
  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async() => {
    try {
      setLoading(true);
      const getAppointment = await fetch(`${ serverUrl }/users/${ currentUser }/appointments/${ appointmentId }`, {
        method: "GET",
        credentials: "include"
      });
  
      const result = await getAppointment.json();

      if (result.length > 0) {
        setAppointment(result[0]);
      } else {
        throw new Error("Appointment not found");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      setLoading(true);
      const putFormRequest = await fetch(`${ serverUrl }/users/${ currentUser }/appointments/${ appointmentId }`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(appointment)
      });

      const result = await putFormRequest;

      if (result.status === 403) {
        setError("No user logged in. Unable to update appiontment")
      } else if (result.status !== 201) {
        throw new Error("Error updating appointment");
      } else {
        alert("Appointment update request successfully sent.");
        setError("");
        navigate("/appointments");
      }
      setLoading(false);
    } catch (error) {
      console.log("Error updating appointment: ", error)
      setError("Error updating appointment. Please try again later.")
      setLoading(false)
    }
  };

  return (
    <div className='container flex flex-col space-y-6 px-5 py-16 max-w-lg sm:max-w-full'>
      <div className='shadow-xl space-y-10 bg-pink-100 shadow-gray-300 rounded border border-pink-100 mt-10 px-6 py-16 sm:p-16 sm:mx-auto sm:w-full sm:max-w-lg sm:min-h-80 font-medium'>
        <h2 className='text-2xl font-bold text-[#d64f92]'>
          Update Appointment
        </h2>
      { loading && <BarLoader className='mx-auto' color='#fbb6ce' /> }

      { (typeof currentUser !== 'string' && currentUser.role === 2) ?
        <form className='space-y-6' onSubmit={ submitForm }>
          <div>
            <label className='font-bold text-gray-600 text-lg'>Client</label>
            <div>
              <input
                name='name'
                value={ appointment.name }
                className='block w-full mt-2 py-1.5 px-2.5 border-0 rounded ring-1 ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 focus:ring-4 focus:border-[#d64f92] focus:outline-pink-300 focus:outline'
              />
            </div>
          </div>
          <div>
            <label className='font-bold text-gray-600 text-lg'>Contact Info</label>
            <div>
              <input
                name='email'
                value={ appointment.email }
                className='block w-full mt-2 py-1.5 px-2.5 border-0 rounded ring-1 ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 focus:ring-4 focus:border-[#d64f92] focus:outline-pink-300 focus:outline'
              />
            </div>
          </div>
          <div>
            <label className='font-bold text-gray-600 text-lg'>Service</label>
            <div>
              <input
                onChange={ putFormHandler }
                name='service_name'
                value={ appointment.service_name }
                className='block w-full mt-2 py-1.5 px-2.5 border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-[#d64f92] focus:outline-pink-300 focus:outline'
              />
            </div>
          </div>
          <div>
            <label className='font-bold text-gray-600 text-lg'>Status</label>
            <select 
              onChange={ putFormHandler }
              className='py-1.5 px-2.5 w-full mt-2 border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-[#d64f92] focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
              name='status'
            >
              <option selected value={ appointment.status }>{ appointment.status_name }</option>
              <option value={ 1 }>Upcoming</option>
              <option value={ 2 }>Requested</option>
              <option value={ 3 }>Cancelled</option>
              <option value={ 4 }>Completed</option>
              <option value={ 5 }>Misc</option>
            </select>
          </div>
          <div className=''>
            <label className='font-bold text-gray-600 text-lg'>Date</label>
            <div>
              <DatePicker 
                className='block sm:w-96 mt-2 py-1.5 px-2.5 border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-[#d64f92] focus:outline-pink-300 focus:outline'
                dateFormat="MMMM d yyyy"
                selected={ appointment.date ? new Date(appointment.date) : null }
                onChange={ (date) => date && putFormHandler(date) }
              />
            </div>
          </div>
          <div>
            <label className='font-bold text-gray-600 text-lg'>Time</label>
            <div>
              <input
                onChange={ putFormHandler }
                name='time'
                value={ appointment.time ? appointment.time : "" }
                className='block w-full mt-2 py-1.5 px-2.5 border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-[#d64f92] focus:outline-pink-300 focus:outline'
              />
            </div>
          </div>
          <div>
            <label className='font-bold text-gray-600 text-lg'>Price</label>
            <div>
              <input
                onChange={ putFormHandler }
                name='price_paid'
                value={ appointment.price_paid }
                className='block w-full mt-2 py-1.5 px-2.5 border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-[#d64f92] focus:outline-pink-300 focus:outline'
              />
            </div>
          </div>

          { loading ?         
            <div className='pt-4'>
              <button
                disabled
                className='px-3.5 py-2.5 rounded-full focus:ring-2 bg-pink-200 text-center text-white font-semibold'
                >Submit</button>
            </div>
            :
            <div className='pt-4'>
              <button
                className='px-3.5 py-2.5 rounded-full ring-2 ring-[#d64f92] bg-[#d64f92] hover:ring-pink-300 hover:bg-pink-300 text-center text-white font-semibold'
                >Submit</button>
            </div>
          }
        </form>
        :
        <form className='space-y-6' onSubmit={ submitForm }>
          <div>
            <label className='font-bold'>Service</label>
            <div>
              <input
                onChange={ putFormHandler }
                name='service_name'
                value={ appointment.service_name }
                className='block w-full mt-2 py-1.5 px-2.5 border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-[#d64f92] focus:outline-pink-300 focus:outline'
              />
            </div>
          </div>

          <div className=''>
            <label className='font-bold'>Date</label>
            <div>
              <DatePicker 
                className='block sm:w-96 mt-2 py-1.5 px-2.5 border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-[#d64f92] focus:outline-pink-300 focus:outline'
                dateFormat="MMMM d yyyy"
                selected={ appointment.date ? new Date(appointment.date) : null }
                onChange={ (date) => date && putFormHandler(date) }
              />
            </div>
          </div>

          <div>
            <label className='font-bold'>Time</label>
            <div>
              <input
                onChange={ putFormHandler }
                name='time'
                value={ appointment.time ? appointment.time : "" }
                className='block w-full mt-2 py-1.5 px-2.5 border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-[#d64f92] focus:outline-pink-300 focus:outline'
              />
            </div>
          </div>

          { loading ?         
            <div className='pt-4'>
              <button
                disabled
                className='px-3.5 py-2.5 rounded-full hover:bg-pink-200 focus:ring-2 bg-pink-500 text-center text-white font-semibold'
                >Submit</button>
            </div>
            :
            <div className='pt-4'>
              <button
                className='px-3.5 py-2.5 rounded-full focus:ring-2 focus:ring-pink-300 bg-[#d64f92] hover:ring-pink-300 hover:bg-pink-300 text-center text-white font-semibold'
                >Submit</button>
            </div>
          }
        </form>
      }

      { error !== "" && 
        <>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">ERROR: </strong>
          <span className="block sm:inline">{ error }</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          </span>
        </div>
        </>
      }
      </div> 
    </div>
  )
};

export default UpdateAppointment;
