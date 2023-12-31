import React, { useEffect, useState } from 'react'

const AddService:React.FC = () => {
  const [categoryList, setCategoryList] = useState<CategoryListState>([]);

  useEffect(() => {
    serviceCategories();
  },[]);

  type CategoryListState = {
    id: number;
    service_category_name: string;
  }[]

  const serviceCategories = async() => {
    const fetchCategories = await fetch(`https://localhost:3001/service-categories`);
    const categories = await fetchCategories.json();
    setCategoryList(categories);
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
    price: number,
    serviceDescription: string
  };

  const [serviceFormData, setServiceFormData] = useState<FormState>({
    service_categories_id: 0,
    service_name: '',
    price: 0,
    serviceDescription: ''
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const priceAsNum: number = Number(serviceFormData.price)
    console.log("num: ", typeof priceAsNum === 'string')
  };

  return (
    <div className='container'>
      <h1>Add New Service</h1>

      <div>

        <form onSubmit={ formSubmit }>
          <div>
            <label>
              Service Category
            </label>
            <select required name='serviceCategory' placeholder='hello'>
              <option>Select a category...</option>
              { listCategories() }
            </select>
          </div>
          <div>
            <label>
              Service Name
            </label>
            <input required name='serviceName' type='text' onChange={ inputChangeHandler }/>
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
            <input required name='serviceDescription' type='text' onChange={ inputChangeHandler }/>
          </div>
          
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>

      </div>
    </div>
  )
};

export default AddService;
