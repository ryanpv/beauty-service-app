import { jwtDecode } from 'jwt-decode';

export const setUser = () => {
  if (document.cookie !== "") {
    const cookies = document.cookie.split("; ");
    const userCookie = cookies.find((cookie) => cookie.startsWith("user="));
    const user = userCookie ? userCookie.split("=")[1] : "";
  
    if (user !== null || user !== "") {
      const decoded = jwtDecode<string>(user);
      return decoded;
    } 
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