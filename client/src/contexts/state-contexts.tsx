import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

interface StateValues {
  userId: number;
  setUserId: Dispatch<SetStateAction<number>>;
  currentUser: string | User;
  setCurrentUser: Dispatch<SetStateAction<string | User>>;
  currentUserState: User;
  allServices: ServiceState | [];
  setAllServices: Dispatch<SetStateAction<ServiceState | []>>;
};
console.log('state context read');

type ServiceState = {
  id: number;
  service_name: string;
  service_category_name: string;
  service_categories_id: number;
  price: string;
  description: string; 
  duration: number;     
}[];

type User = {
  id: number;
  role: number;
  displayName: string;
  iat: number;
  exp: number;
};

const StateContext = createContext<StateValues | null>(null);


export const useStateContext = () => {
  const stateContexts = useContext(StateContext);

  if (!stateContexts) {
    throw new Error("State context not being used within context provider")
  }
  
  return stateContexts;
};

const currentUserState = {
  id: 0,
  role: 0,
  displayName: "",
  iat: 0,
  exp: 0
};

const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<string | User>(currentUserState);
  const [allServices, setAllServices] = useState<ServiceState>([]);

  const values: StateValues = {
    userId,
    setUserId,
    currentUser,
    setCurrentUser,
    currentUserState,
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