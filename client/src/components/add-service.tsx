import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/state-contexts';
import { BarLoader } from 'react-spinners';

const AddService:React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, setCurrentUser, currentUserState } = useStateContext();
  const isAdmin = typeof currentUser !== 'string' && currentUser.id !== 0 && currentUser.role === 2;


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
    const fetchCategories = await fetch(`https://localhost:3001/service-categories`);

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
  console.log("formdata: ", serviceFormData);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setServiceFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const formSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`https://localhost:3001/services`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(serviceFormData)
    });

  };

  return (
    <div className='container flex flex-col space-y-10'>
      <h1 className='text-center font-bold text-2xl'>Add New Service</h1>
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
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
        </>
      }

      { isAdmin ?
        <div className='p-5 mb-5 sm:mx-auto sm:w-full sm:max-w-2xl'>
          <form onSubmit={ formSubmit }>
            <div className='flex flex-col space-y-6'>
              <div className='flex flex-col justify-between space-y-6 sm:space-y-0'>
                <div>
                  <label className='font-bold'>Service:</label>
                  <input
                    className='flex-2 py-1.5 px-2.5 w-full border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
                    value={ serviceFormData.service_name }
                    name='service_name'
                    onChange={ inputChangeHandler }
                  />
                </div>

                <div>
                  <label className='font-bold'>Price:</label>
                  <input
                    className='py-1.5 px-2.5 w-full border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
                    name='price'
                    value={ serviceFormData.price }
                    onChange={ inputChangeHandler }
                  />
                </div>

                <div>
                  <label className='font-bold'>Duration:</label>
                  <input
                    className='py-1.5 px-2.5 w-full border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
                    name='duration'
                    value={ serviceFormData.duration }
                    onChange={ inputChangeHandler }
                  />
                </div>

                <div>
                  <label className='font-bold'>Category:</label>
                  <select 
                    className='py-1.5 px-2.5 w-full border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 sm:text-sm sm:leading-6'
                    name='service_categories_id'
                    onChange={ inputChangeHandler }
                  >
                    <option selected disabled defaultValue="">Select a category...</option>
                    { listCategories() }
                  </select>
                </div>
              </div>

              <div>
                <label className='font-bold'>Description:</label>
                <textarea
                  name='description'
                  onChange={ inputChangeHandler }
                  className='h-48 min-h-fit py-1.5 px-2.5 w-full border-0 rounded-sm ring-1 ring-inset ring-pink-300 text-gray-900 leading-6'
                  />
              </div>

              <button
                type='submit'
                className='mx-auto w-full bg-pink-300 hover:bg-pink-200 rounded-sm max-w-xs justify-center text-white font-semibold'
              >
                Update Service
              </button>
            </div>
          </form>
        </div>
        : <h1>Unauthorized</h1>
      }
    </div> 
  )
};

export default AddService;
