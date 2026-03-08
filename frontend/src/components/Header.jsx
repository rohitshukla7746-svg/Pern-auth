import React, { useContext } from "react";
import { AppContent } from "../context/AppContext";

const Header = () => {
 
   const {userData} = useContext(AppContent)
 
 return(
  <div className="flex flex-col items-center mt-20 py-[200px] px-4 text-center text-white justify-center">
    <h1 className="text-3xl">Hello {userData ? userData.name : "Developer"}</h1>

    <h2 className="text-6xl font-bold py-2">Welcome to Wconnect</h2>
    <p className="text-lg py-2">Lets start</p>
    <button className="py-2 my-2 hover:bg-white hover:text-black bg-blue-500 w-20 rounded-md" >Start</button>
  </div>
 )
}

export default Header;