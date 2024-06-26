import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStateContext } from '../contexts/state-contexts';
import { BarLoader } from 'react-spinners';

export default function UpdateService() {
  type CategoryListState = {
    id: number;
    service_category_name: string;
  }[];

  const [updateForm, setUpdateForm] = useState({
    id: 0,
    service_name: "",
    price: "",
    description: "",
    service_categories_id: 0,
    service_category_name: "",
    duration: 0,
  });
  const [categories, setCategories] = useState<CategoryListState>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { serviceId } = useParams();
  const { currentUser, setCurrentUser, currentUserState } = useStateContext();
  const isAdmin = typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role === 2;
  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;

  // Fetch service to be updated
  useEffect(() => {
    service();
  }, [serviceId]);

  const service = async() => {
    try {
      setLoading(true);
      const fetchService = await fetch(`${ serverUrl }/services/${ serviceId }`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        }
      });

      if (fetchService.status === 403) {
        setError("Invalid credentials. Please log in and try again.");
      } else {
        const result = await fetchService.json(); // Should only be single result
  
        if (result.length > 1) {
          throw Error
        } else {
          setError("");
          setUpdateForm(result[0]); 
        }
      }
  

      setLoading(false);
    } catch (error) {
      console.log("fetch single service error: ", error)
      setError("Unable to fetch service to update.");
      setLoading(false);
    }
  };

  // Fetch categories for <select> options
  useEffect(() => {
    serviceCategories();
  }, []);

  const serviceCategories = async() => {
    try {
      const fetchCategories = await fetch(`${ serverUrl }/service-categories`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        }
      });
  
      const result = await fetchCategories.json();
      setCategories(result);
    } catch (error) {
      console.log("Unable to fetch service categories")
    }
  };

  const listCategories = () => {
    if (categories.length > 0) {
      return (
        categories.map((category) => (
          <option key={ category.id } value={ category.id }>{ category.service_category_name }</option>
        ))
      )
    }
  };

  const formValuesHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setUpdateForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const formSubmit = async(event: React.FormEvent) => {
    event.preventDefault();

    try {
      const submitServiceUpdate = await fetch(`${ serverUrl }/services/${ serviceId }`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(updateForm)
      });
  
      
      if (submitServiceUpdate.status === 201) {
        alert("Successfully updated service!")
      } else if (submitServiceUpdate.status === 403){
        setCurrentUser(currentUserState);
        throw Error("Unable to update service");
      }
    } catch (error) {
        alert("FAILED to update service")
      console.log("Error updating service: ", error)
    }
  };

  return (
    <div className='container flex flex-col space-y-10 py-12'>
      { loading ? 
        <div className='mx-auto'>
          <BarLoader color='#fbb6ce' /> 
        </div> 
        : null 
      }



      {/* { isAdmin ? */}
        <div className='shadow-xl space-y-10 bg-pink-100 rounded px-6 sm:p-16 sm:mx-auto sm:w-full sm:max-w-2xl py-16 mx-6'>
          <h1 className='font-bold text-2xl text-[#d64f92]'>Update Service</h1>

          <form onSubmit={ formSubmit }>
            <div className='flex flex-col space-y-6'>
              <div className='flex flex-col justify-between space-y-6'>
                <div>
                  <label className='font-semibold text-gray-600'>Service:</label>
                  <input
                    className='mt-2 flex-2 py-1.5 px-2.5 w-full border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                    value={ updateForm && updateForm.id !== 0 ? updateForm.service_name : "" }
                    name='service_name'
                    onChange={ formValuesHandler }
                  />
                </div>

                <div>
                  <label className='font-semibold text-gray-600'>Price:</label>
                  <input
                    className='mt-2 py-1.5 px-2.5 w-full border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                    value={ updateForm && updateForm.id !== 0 ? updateForm.price : "" }
                    name='price'
                    onChange={ formValuesHandler }
                  />
                </div>

                <div>
                  <label className='font-semibold text-gray-600'>Duration:</label>
                  <input
                    className='mt-2 py-1.5 px-2.5 w-full border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                    value={ updateForm && updateForm.id !== 0 ? updateForm.duration : 0 }
                    name='duration'
                    onChange={ formValuesHandler }
                  />
                </div>

                <div>
                  <label className='font-semibold text-gray-600'>Category:</label>
                  <select 
                    className='mt-2 py-1.5 px-2.5 w-full border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                    name='service_categories_id'
                    onChange={ formValuesHandler }
                  >
                    <option selected key={ updateForm && updateForm.id } defaultValue={ updateForm.id }>{ updateForm.service_category_name }</option>
                    { listCategories() }
                  </select>
                </div>
              </div>

              <div>
                <label className='font-semibold text-gray-600'>Description:</label>
                <textarea
                  name='description'
                  value={ updateForm && updateForm.description }
                  onChange={ formValuesHandler }
                  className='mt-2 mb-6 h-48 min-h-fit py-1.5 px-2.5 w-full border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 leading-6'
                  />
              </div>

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

              <button
                type='submit'
                className='flex w-full bg-[#d64f92] max-w-sm mx-auto justify-center rounded-full ring-2 ring-[#d64f92] hover:ring-pink-300 py-2.5 px-3.5 text-white hover:bg-pink-300 font-semibold'
              >
                Update Service
              </button>
            </div>
          </form>
        </div>
        {/* : <h1>Unauthorized</h1>
      } */}
    </div> 
  )
}
