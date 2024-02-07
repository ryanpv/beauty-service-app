import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/state-contexts';

const AddService:React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser, currentUserState } = useStateContext();

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
  console.log("cat: ", categoryList)

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

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <div className='container'>
      <h1>Add New Service</h1>

      <div>
        { !loading ? 
          <form onSubmit={ formSubmit }>
            <div>
              <label>
                Service Category
              </label>
              <select required name='service_categories_id' onChange={ inputChangeHandler }>
                <option defaultValue="" selected disabled>Select a category...</option>
                { listCategories() }
              </select>
            </div>
            <div>
              <label>
                Service Name
              </label>
              <input required name='service_name' type='text' onChange={ inputChangeHandler }/>
            </div>
            <div>
              <label>
                Duration
              </label>
              <input required name='duration' type='number' onChange={ inputChangeHandler }/>
            </div>
            <div>
              <label>
                Price
              </label>
              <input required name='price' type='text' onChange={ inputChangeHandler }/>
            </div>
            <div>
              <label>
                Service Description
              </label>
              <input required name='description' type='text' onChange={ inputChangeHandler }/>
            </div>
            
            <div>
              <button type='submit'>Submit</button>
            </div>
          </form>
          : null
        }


      </div>
    </div>
  )
};

export default AddService;
