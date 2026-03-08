import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


axios.defaults.withCredentials = true;

export const AppContent = createContext();

export const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  // ✅ Check auth state
  const getAuthState = async () => {
    try {
      const res = await axios.get(
        backendUrl + "/api/auth/is-auth",
        { withCredentials: true }
      );

      const data = res.data;

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Get logged-in user
  const getUserData = async () => {
    try {
      const res = await axios.get(
        backendUrl + "/api/user/data",
        { withCredentials: true }
      );

      const data = res.data;

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
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
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
