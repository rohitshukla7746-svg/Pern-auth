import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


const NavBar = () => {

 
   const navigate = useNavigate();
   const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContent)
 
  //  const sendVerificationOtp = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${backendUrl}/api/auth/send-verify-otp`,
  //       {},
  //       { withCredentials: true }
  //     );
  
  //     if (response.data.success) {
  //       navigate('/email-verify');
  //       toast.success(response.data.message);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || error.message);
  //   }
  // };
  

  const sendVerificationOtp = async () => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/auth/send-verify-otp`,
      {}
    );

    if (response.data.success) {
      navigate('/email-verify');
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};




  //  const logout = async () => {
  //   try {
  //     axios.defaults.withCredentials = true;
  
  //     const response = await axios.post(`${backendUrl}/api/auth/logout`);
  
  //     if (response.data.success) {
  //       setIsLoggedin(false);
  //       setUserData(null);
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || error.message);
  //   }
  // };
  

 const logout = async () => {
  try {
    await axios.post(`${backendUrl}/api/auth/logout`);
  } catch (error) {
    console.log(error);
  } finally {
    // always clear regardless of backend response
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsLoggedin(false);
    setUserData(null);
    navigate('/login');
  }
};


  return (
    <div className='w-full flex justify-between items-center bg-slate-500 p-12 sm:p-6 sm:px-20 absolute top-[-30px]'>
     <h1 className='text-white text-6xl font-bold'>Wconnect</h1>
    {userData ? 
    <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
       {userData.name[0].toUpperCase()}
       <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
           <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
            {!userData.is_account_verified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>}
            
            <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
            
           </ul>
       </div>
    </div>
    :
    <button onClick={() => navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100'>Login</button>
  }
   
    


    </div>
  )
}

export default NavBar;


