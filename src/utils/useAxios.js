import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const baseURL = 'https://web-production-6cb9.up.railway.app/api';

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  // Create an axios instance with default settings
  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  // Request interceptor to handle token refresh
  axiosInstance.interceptors.request.use(async (req) => {
    if (!authTokens) return req; // If no tokens, just return the request

    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req; // If token is not expired, proceed with the request

    try {
      // Refresh the token
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh,
      });
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      
      // Update the context with new tokens
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));

      // Update the Authorization header with the new access token
      req.headers.Authorization = `Bearer ${response.data.access}`;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Handle error if refresh fails (e.g., redirect to login)
    }

    return req; // Return the modified request
  });

  return axiosInstance; // Return the axios instance for use in your components
};

export default useAxios;
