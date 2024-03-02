import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/state-contexts';
import { BarLoader } from 'react-spinners';

const AddService:React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, setCurrentUser, currentUserState } = useStateContext();
  const isAdmin = typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role === 2;
  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER;

  useEffect(() => {
    serviceCategories();
  },[]);
  
  type CategoryListState = {
    id: number;
    service_category_name: string;
  }[]

  const [categoryList, setCategoryList] = useState<CategoryListState>([]);

  const serviceCategories = async() => {
    setLoading(true);
    const fetchCategories = await fetch(`${ serverUrl }/service-categories`);

    if (fetchCategories.status === 403) {
      setCurrentUser(currentUserState);
    } else {
      const categories = await fetchCategories.json();
      setCategoryList(categories);
    }
    setLoading(false);
  };
  

  const listCategories = () => {
    if (categoryList.length > 0) {
      return categoryList.map((category) => (
        <option key={ category.id } value={ category.id }>{ category.service_category_name }</option>
      ))
    }
    return ;
  };

  type FormState = {
    service_categories_id: number,
    service_name: string,
    duration: number,
    price: string,
    description: string
  };

  const [serviceFormData, setServiceFormData] = useState<FormState>({
    service_categories_id: 0,
    service_name: '',
    duration: 30,
    price: '',
    description: ''
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setServiceFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const formSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`${ serverUrl }:3001/services`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(serviceFormData)
    });

  };

  return (
    <div className='container flex flex-col space-y-10 py-12'>
      { loading ? 
        <div className='mx-auto'>
          <BarLoader color='#fbb6ce' /> 
        </div> 
        : null 
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

      {/* { isAdmin ? */}
        <div className='shadow-xl shadow-gray-300 px-6 py-12 sm:p-16 mb-5 sm:mx-auto sm:w-full sm:max-w-2xl bg-pink-100 rounded mx-6 space-y-10'>
          <h1 className='font-bold text-2xl mt-5 text-gray-600'>Add New Service</h1>

          <form onSubmit={ formSubmit }>
            <div className='flex flex-col space-y-6'>
              <div className='flex flex-col justify-between space-y-6'>
                <div>
                  <label className='font-semibold text-gray-600'>Service:</label>
                  <input
                    className='mt-2 flex-2 py-1.5 px-2.5 w-full border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                    value={ serviceFormData.service_name }
                    name='service_name'
                    onChange={ inputChangeHandler }
                  />
                </div>

                <div>
                  <label className='font-semibold text-gray-600'>Price:</label>
                  <input
                    className='mt-2 py-1.5 px-2.5 w-full border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                    name='price'
                    value={ serviceFormData.price }
                    onChange={ inputChangeHandler }
                  />
                </div>

                <div>
                  <label className='font-semibold text-gray-600'>Duration:</label>
                  <input
                    className='mt-2 py-1.5 px-2.5 w-full border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                    name='duration'
                    value={ serviceFormData.duration }
                    onChange={ inputChangeHandler }
                  />
                </div>

                <div>
                  <label className='font-semibold text-gray-600'>Category:</label>
                  <select 
                    className='mt-2 py-1.5 px-2.5 w-full border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 sm:text-sm sm:leading-6'
                    name='service_categories_id'
                    onChange={ inputChangeHandler }
                  >
                    <option selected disabled defaultValue="">Select a category...</option>
                    { listCategories() }
                  </select>
                </div>
              </div>

              <div>
                <label className='font-semibold text-gray-600'>Description:</label>
                <textarea
                  name='description'
                  onChange={ inputChangeHandler }
                  className='mt-2 mb-6 h-48 min-h-fit py-1.5 px-2.5 w-full border-0 rounded ring-pink-200 focus:ring-gray-300 focus:ring-offset-2 ring-1 focus:ring-4 focus:border-pink-700 focus:outline-pink-300 focus:outline text-gray-900 leading-6'
                  />
              </div>

              <button
                type='submit'
                className='flex w-full bg-pink-300 max-w-sm mx-auto justify-center rounded-full ring-2 ring-pink-300 hover:ring-pink-400 py-2.5 px-3.5 text-white hover:bg-pink-400 font-semibold'
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
};

export default AddService;
