import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

interface StateValues {
  userId: number;
  setUserId: Dispatch<SetStateAction<number>>;
  currentUser: string | null;
  setCurrentUser: Dispatch<SetStateAction<string | null>>;
  allServices: ServiceState | [];
  setAllServices: Dispatch<SetStateAction<ServiceState | []>>;
};

type ServiceState = {
  id: number;
  service_name: string;
  service_category_name: string;
  service_categories_id: number;
  price: string;
  description: string;      
}[];

const StateContext = createContext<StateValues | null>(null);


export const useStateContext = () => {
  const stateContexts = useContext(StateContext);

  if (!stateContexts) {
    throw new Error("State context not being used within context provider")
  }
  
  return stateContexts;
};

const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<string | null>("");
  const [allServices, setAllServices] = useState<ServiceState>([]);

  const values: StateValues = {
    userId,
    setUserId,
    currentUser,
    setCurrentUser,
    allServices,
    setAllServices
  };  

  return (
    <StateContext.Provider value={ values }>
      { children }
    </StateContext.Provider>
  )
};

export { StateContext, StateProvider }