import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const setUser = () => {
  const userLogged = Cookies.get('user');
  if (userLogged) {
    const decoded = jwtDecode<string>(userLogged);
    return decoded;
  }

  const initialUserState = {
    id: 0,
    role: 0,
    displayName: "",
    iat: 0,
    exp: 0
  }

  return initialUserState;
};