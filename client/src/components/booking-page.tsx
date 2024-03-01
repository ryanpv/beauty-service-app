import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling
import { useStateContext } from '../contexts/state-contexts';
import ServiceOptions from '../templates/service-options';
import TimeSlots  from '../templates/timeslots';
import { BarLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const BookingPage: React.FC = () => {
  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;
  const { currentUser, setCurrentUser, currentUserState, allServices, setAllServices } = useStateContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const newAppointmentState = {
    date: new Date(),
    time: "",
    id: "",
    price_paid: 0
  };

  const [newAppointment, setNewAppointment] = useState<NewAppointment>(newAppointmentState)
  const navigate = useNavigate();

  type CalendarDates = Date | null; // required for react-calendar as it has a prop for range

  type NewAppointment = {
    date: Date | string;
    time: string;
    id: string;
    price_paid: number;
  };

  useEffect(() => {
    if (allServices.length === 0) {
      servicesList();
    }
  },[]);
  
  type BookedTimeList = {
    time: string;
    duration: number;
  }[];

  const [bookedTimes, setBookedTimes] = useState<BookedTimeList>([]);

  useEffect(() => {
    appointmentTimes();
  }, [newAppointment.date]);

  const servicesList = async() => {
    try {
      setLoading(true);
      const fetchServices = await fetch(`${ serverUrl }/services/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        }
      });
  
      if (fetchServices.status === 403) {
        setCurrentUser(currentUserState)
      } else {
        const services = await fetchServices.json();
        setAllServices(services);
      }

      setLoading(false);
    } catch (error) {
      console.log("Fetch services error: ", error);
      setLoading(false);
    }
  };

  const appointmentTimes = async() => {
    const getAppointmentTimes = await fetch(`${ serverUrl }/appointment-times?date=${ newAppointment.date }`)
    const result = await getAppointmentTimes.json();

    setBookedTimes(result);
  };

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
      setNewAppointment((prev) => ({ ...prev, time: "" }))
      setNewAppointment((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const appointmentFormSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (newAppointment.date === "" || newAppointment.time === "") {
        setError("Missing date/time.");
      } else {
        const userId = typeof currentUser !== "string" && currentUser.id
        const appointmentRequest = await fetch(`https://localhost:3001/users/${ userId }/appointments`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newAppointment)
        });

        if (appointmentRequest.status !== 201) {
          setError("Failed to book appointment.")
        } else {
          setError("");
          navigate("/booking-success");
        }
        
        console.log("appointment req: ", appointmentRequest);
      }

    } catch (error) {
      console.log("Appointment booking error: ", error);
      setError("Unable to book appointment.")
    }
  };

  const formatDate = () => {
    const date = new Date(newAppointment.date)
    const formattedDate = date.toLocaleDateString('default', { month: 'long', day: '2-digit', year: 'numeric' });

    return formattedDate;
  };

  return (
    <div className='container flex flex-col space-y-10 my-10'>
      <div className='space-y-3'>
        <h1 className='font-bold text-4xl text-center text-gray-600'>Book Appointment</h1>
        <hr className='h-px mx-3 border-pink-200 w-full sm:max-w-screen-md mx-auto' />
      </div>
      <i className='text-center text-gray-600 text-lg'>Please confirm your appointment request details before submitting. You will receive an email for when it has been accepted</i>

      <div className='mx-auto sm:w-full sm:max-w-screen-xl'>
        <form 
          onSubmit={ appointmentFormSubmit }
          className='justify-between'
          >
          <div className='flex flex-col space-y-10'>

            {/* List of services for dropdown  */}
            { loading ? 
              <div className='mx-auto'>
                <BarLoader color='#fbb6ce' /> 
              </div>
              :
              <div className='flex flex-col mx-auto sm:flex-row justify-around space-y-5 sm:space-y-0'>
                <ServiceOptions serviceList={ allServices } formHandler={ formChangeHandler } newAppointment={ newAppointment } setNewAppointment={ setNewAppointment } />
              </div>
            }

            {/* calender component import */}
            <div className='mx-auto'>
              <Calendar 
                onChange={ (date) => date && formChangeHandler(date) }
                value={ newAppointment.date instanceof Date ? newAppointment.date : new Date(newAppointment.date) }
              />
            </div>

            <TimeSlots formChangeHandler={ formChangeHandler } bookedTimes={ bookedTimes } newAppointment={ newAppointment } />
            
            <div className='mx-auto space-y-2 px-6 text-gray-600'>
              <h1>Confirm your details below before submitted the booking request:</h1>

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

              <div>
                <ul>
                  <li><strong>Service:</strong> { newAppointment.id !== "" && JSON.parse(newAppointment.id).service_name }</li>
                  <li><strong>Date:</strong> { formatDate() }</li>
                  <li><strong>Time:</strong> { newAppointment.time }</li>
                </ul>
              </div>
            </div>

            <button
              className='bg-pink-300 hover:bg-pink-400 ring-pink-300 hover:ring-pink-400 px-3 py-1.5 mx-auto rounded-full text-center font-semibold text-white'
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default BookingPage;