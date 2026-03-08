import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Home from './pages/Home';
import Home2 from './pages/Home2';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify';
import ProfilePage from './pages/ProfiePage';
import { AppContent } from './context/AppContext';




const App = () => {

  const navigate = useNavigate()
  const {isLoggedin} = useContext(AppContent)
  return (
    <div >
      <ToastContainer />
     <Routes>
      <Route path='/' element={isLoggedin ? <Home/> : <Navigate to='/login' />} />
      <Route path='/home2' element={isLoggedin ? <Home2/> : <Navigate to='/login' />}/> 
      <Route path='/login' element={<Login/>}/> 
      <Route path='/email-verify' element={<EmailVerify/>}/> 
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/profile' element={isLoggedin ? <ProfilePage/> : <Navigate to='/login' />}/> 
     </Routes>
    </div>
  )
}

export default App;

