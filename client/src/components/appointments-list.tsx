import React from 'react';
import AppointmentsTable from '../templates/appointment-table';
import { useStateContext } from '../contexts/state-contexts';
import DatePicker from 'react-datepicker';
import { BarLoader } from 'react-spinners';
import { Link, useLocation } from 'react-router-dom';

const AppointmentsList:React.FC = () => {
  type AppointmentList = {
    date: string;
    email: string;
    name?: string;
    id: number;
    service_name: string;
    status: string;
    time: string;
    users_id: number;
    price?: number;
  }[];

  const { currentUser, setCurrentUser, currentUserState } = useStateContext();
  const [appointmentList, setAppointmentList] = React.useState<AppointmentList>([]);
  const [loading, setLoading] = React.useState(false);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-index, must +1 to get accurate month value
  const day = date.getDate();
  const currentDate = `${ year }-${ month }-${ day }`
const params = useLocation();
console.log("params: ", params.pathname)
  type FormFilter = {
    search: string;
    startDate: string | Date;
    endDate: string | Date;
    status: number;
  };
  const [formState, setFormState] = React.useState<FormFilter>({
    search: "",
    startDate: currentDate,
    endDate: "",
    status: 1 // default 2 for "upcoming"
  });

  React.useEffect(() => {
    appointments();
  }, []);

  // Fetch all appointments - query params as filter
  const appointments = async() => {
    try {
      setLoading(true);
      const userId = typeof currentUser !== 'string' && currentUser.id
      if (userId) {
        const fetchAppointments = await fetch(`https://localhost:3001/users/${ userId }/appointments?status=${ formState.status }&start_date=${ formState.startDate }&end_date=${ formState.endDate }&search=${ formState.search }`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          }
        });

        if (fetchAppointments.status === 401) {
          setCurrentUser(currentUserState);
        } else if (fetchAppointments.status === 200) {
          const result = await fetchAppointments.json();
          setAppointmentList(result);
        } else {
          throw new Error();
        }
    
      } else {
        console.log("No current user.");
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching appointments");
      setLoading(false);
    }
  };

  // Function to update state from filter inputs
  const filterHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      event.preventDefault();
  
      const { name, value } = event.target;
      setFormState((prev) => ({
        ...prev,
        [name]: value
      }));
  };

  // Function to submit filter queries and re-call fetch appointment function
  const submitFilter = (event: React.FormEvent) => {
    event.preventDefault();

    appointments();
  };


  // Function to reset filter form to original state and re-call appointment function
  const resetForm = () => {
    setFormState({
      search: "",
      startDate: currentDate,
      endDate: "",
      status: 2
    });

    appointments();
  };

  // Function to format dates to match DB formatting and set date variable state
  const dateFormatter = (dateInput: Date, range: string) => {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-index, must +1 to get accurate month value
    const day = date.getDate();
    const currentDate = `${ year }-${ month }-${ day }`;

    setFormState((prev) => ({
      ...prev,
      [range]: currentDate
    }));
  };

  return (
    <div className='container flex flex-col space-y-6 max-w-screen-lg'>
      <h1 className='mt-10 text-center text-2xl font-bold'>
      Appointments
      </h1>

      { typeof currentUser !== 'string' && currentUser.id === 0 && currentUser.role === 0 ?
      <h1 className='text-center font-semibold text-red-700'>
         Unauthorized. Please
        <Link className='text-blue-700 text-center font-semibold underline'to='/login'> login</Link>
      </h1> 
      :
      <>
    {/* FILTER FORM  */}
        <div className='sm:mx-auto max-w-2xl'>
          <form onSubmit={ submitFilter } className='space-y-3 mx-3'>
            { typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role === 2 ? 
            <div>
              <label className='font-semibold'>
                Search
              </label>
              <div className='mt-2'>
                <input 
                  onChange={ filterHandler }
                  name='search'
                  placeholder='Enter name or contact information'
                  className='block w-full py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'
                />
              </div>
            </div>
            : 
            null }
            
            <div className='flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0'>
              <div>
                <label className='font-semibold'>
                  Start Date
                </label>
                <div>
                <DatePicker 
                  className='block py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'  
                  selected={ new Date(formState.startDate) }
                  selectsStart
                  startDate={ new Date(formState.startDate) }
                  endDate={ new Date(formState.endDate) }
                  onChange={ (date) => date && dateFormatter(date, "startDate") }
                />
                </div>
              </div>
              <div>
                <label className='font-semibold'>
                  End Date
                </label>
                <div>
                <DatePicker 
                  className='block py-1.5 px-2.5 border-0 rounded-sm ring-1 ring-pink-300'  
                  selectsEnd
                  startDate={ new Date(formState.startDate) }
                  endDate={ formState.endDate !== "" ? new Date(formState.endDate) : null }
                  selected={ formState.endDate !== "" ? new Date(formState.endDate) : null }
                  onChange={ (date) => date && dateFormatter(date, "endDate") }
                />
                </div>
              </div>
            </div>
            <div>
              <label className='font-bold'>Status:</label>
              <select 
                onChange={ filterHandler }
                className='py-1.5 px-2.5 w-full border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
                name='status'
              >
                <option selected value={ 1 }>Upcoming</option>
                <option value={ 2 }>Requested</option>
                <option value={ 3 }>Cancelled</option>
                <option value={ 4 }>Completed</option>
                <option value={ 5 }>Misc</option>
              </select>
            </div>
            <div className='flex justify-between'>
              <button
                type='submit'
                className='px-3 py-1 rounded-sm focus:ring-2 focus:ring-pink-300 bg-pink-300 hover:bg-pink-200 text-center text-white font-semibold'
                >Filter</button>
              <button
                onClick={ resetForm }
                className='px-3 py-1 rounded-sm focus:ring-2 focus:ring-pink-300 bg-pink-300 hover:bg-pink-200 text-center text-white font-semibold'
                >Reset</button>
            </div>
          </form>
        </div>

      {/* APPOINTMENT LIST TABLE */}     
        { loading ? 
        <div className='mx-auto'>
          <BarLoader color='#fbb6ce' /> 
        </div> 
        :
          currentUser ?
          <AppointmentsTable appointmentList={ appointmentList } setAppointmentList={ setAppointmentList } status={ formState.status }/>
          : null
        }
      </>
      }
    </div>
  )
};

export default AppointmentsList;