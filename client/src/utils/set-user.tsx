import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const setUser = () => {
  const userLogged = Cookies.get('user');  
  const initialUserState = {
    id: 0,
    role: 0,
    displayName: "",
    iat: 0,
    exp: 0
  }
  if (userLogged) {
    const decoded = jwtDecode<string>(userLogged);
    console.log("userLogged: ", decoded)
    return decoded;
  } else {
    return initialUserState;
  }
};