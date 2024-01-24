import { jwtDecode } from 'jwt-decode';

export const setUser = () => {
  const cookies = document.cookie.split("; ");
  const userCookie = cookies.find((cookie) => cookie.startsWith("user="));
  const user = userCookie ? userCookie.split("=")[1] : "";

  if (user !== null || user !== "") {
    const decoded = jwtDecode<string>(user);
    return decoded;
  }
  
  return "";
};