import React, { useEffect, useState } from 'react'
import ServiceCategory from '../templates/service-category';

const Services:React.FC = () => {
  type ServiceState = {
    id: number;
    service_name: string;
    service_category_name: string;
    service_categories_id: number;
    price: string;
    description: string;      
  }[];

  // fetch entire cateogries with useEffect
  // - have each category component .FILTER() through it and render the section
  //
  // each category as its own component
  // - category name 
  // - then rest of the layout for each service in the category
  // call each category component in jsx

  const [allServices, setAllServices] = useState<ServiceState>([]);
  // const [categories, setCategories] = useState([]);
  const regularShellac = 1;
  const gelShellac = 2;
  const bioGel = 3;
  const nailCombo = 4;
  const additionalNail = 5;

  useEffect(() => {
    servicesList();
    // serviceCategories();
  }, []);
  
  
  const servicesList = async() => {
    try {
      const fetchServices = await fetch(`https://localhost:3001/services`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        }
      });
  
      const services = await fetchServices.json();
      setAllServices(services);
    } catch (error) {
      console.log("Fetch services ferror: ", error)
    }
  };

  // const serviceCategories = async () => {
  //   try {
  //     const fetchCategories = await fetch(`https://localhost:3001/service-categories`, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Content-type": "application/json"
  //       }
  //     });

  //     const categoryList = await fetchCategories.json();
  //     console.log(categoryList)
  //     setCategories(categoryList);
  //   } catch (error) {
  //     console.log("Fetch categories error: ", error)
  //   }
  // };

  return (
    <div>
      <ServiceCategory list={ allServices } serviceId={ regularShellac } />
    </div>
  )
}


export default Services;