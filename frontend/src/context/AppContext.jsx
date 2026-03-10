import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  // Set token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Check auth state on page load
  const getAuthState = async () => {
    const token = localStorage.getItem('token');
    if (!token) return; // no token, skip the request entirely

    setAuthToken(token);

    try {
      const res = await axios.get(backendUrl + "/api/auth/is-auth");
      if (res.data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        console.log(error);
      }
      // token invalid/expired, clear it
      localStorage.removeItem('token');
      setAuthToken(null);
    }
  };

  // Get logged-in user
  const getUserData = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/user/data");
      if (res.data.success) {
        setUserData(res.data.userData);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load user");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    setAuthToken,  // ← expose so Login.jsx can use it
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};