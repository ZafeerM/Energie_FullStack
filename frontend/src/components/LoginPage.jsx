import React, { useState } from 'react';
import axios from 'axios';
import logo from "../assets/logonew.png";
import { replace, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [isadmin, setisadmin] = useState(false);
  const [isMtrRdr, setisMtrRdr] = useState(false);
  const [isConsumer, setisConsumer] = useState(true);
  const navigate = useNavigate();

  // localStorage.removeItem('sessionToken');

  const HandleloginAdmin = (e) => {
    e.preventDefault();

    alert('Admin Login Triggered.');
  }

  const HandleloginMeterReader = (e) => {
    e.preventDefault();

    alert("Hello Meter Reader");

    navigate('/Meterreader', {replace : true});
  }

  const HandleloginCustomer = async (e) => {

      // To prevent the form to auto refresh the page
      e.preventDefault();
    
      console.log("Login Email: ", email);
      console.log("Login pasword: ", pass);

      const loginURL = 'http://localhost:5050/login';

      try {
        const response = await axios.post(loginURL, {Username : email, Password : pass});
        const token = response.data.token;
        localStorage.setItem('sessionToken', token);
        console.log("Login Success - Token Recieved: ", token);
        alert("logged in");
        navigate('/Dashboard', {replace : true});
        
      }catch(error){
        if(error.response) {
          console.error("Status: ", error.response.status);
          console.error("Error data: ", error.response.data);
          const errMsg = error.response.message || "Invalid Credentials.";
          alert(`Login Failed: ${errMsg}`);
        }
        else if(error.request) {
          console.error("No reponse recieved. Network or CORS err.", error.request);
          alert("Login Failed: Connect to Server err.");
        }
        else
        {
          console.error("Unexpected error prolly axios", error.message);
          alert(`Login Failed: Unexpected error ${error.message}`);
        }
      }
    }

  return (
    <div className='h-screen'>
      {/* Background */}
      <div className={`relative transform flex flex-col h-full bg-cover transition-all duration-700 ease-in-out
                      bg-center items-center justify-center xl:flex-row
                      ${isadmin ? "bg-[url('./assets/1.jpg')]" : ""}
                      ${isMtrRdr ? "bg-[url('./assets/3.jpg')]" : ""}
                      ${isConsumer ? "bg-[url('./assets/4.jpg')]" : ""}
                      `}>

      {/* dark overlay */}
      <div className='absolute h-screen w-screen overflow-hidden bg-black/40'></div>

        {/* LEFT SECTION */}
        <div className={`z-10 xl:px-10 transform text-center xl:text-left transition-all duration-700 ease-in-out 
                         ${isadmin ? "xl:translate-x-[65%]": ""}`}>
          
          <h1 className= {`relative inline-block text-white font-bold text-6xl xl:text-8xl transition-all duration-700 ease-in-out`}>
            
            <span className={`inline-block transition-all duration-650 ease-in-out ${
                              isadmin ? "opacity-0" : ""}
                              ${isMtrRdr ? "opacity-0" : ""}
                              ${isConsumer ? "opacity-100" : ""}`}>
              Energy, <span className="text-[#ffe209]">Reimagined.</span>
            </span>

            <span className={`absolute top-15 left-0 transition-all duration-700 ease-in-out ${
                              isadmin ? "opacity-100" : "opacity-0"}`
                              }>
              Welcome, <span className="text-[#ffe209]">Admin.</span>
            </span>

          </h1>


            <div className={`py-8 font-bold text-sm text-white xl:text-2xl transition-all duration-700 ease-in-out ${
                             isadmin ? "opacity-0": ""}
                             ${isMtrRdr ? "opacity-0" : ""}
                             ${isConsumer ? "opacity-100" : ""}`}>
              <p className='py-2'>Powering a sustainable future — one connection at a time.</p>
              <p className=' '>Track, manage, and optimize your electricity usage smartly.</p>
            </div>
        </div>


        {/* RIGHT SECTION */}
        <div className= {`z-10 xl:px-30 transform transition-all ease-in-out duration-700 
                          ${isadmin ? "xl:-translate-x-[150%]": ""}
                          ${isMtrRdr ? "xl:-translate-x-[80%]" : ""} `}>
            {/* Login Box */}
            <div className= "flex flex-col justify-center items-center  rounded-2xl
                             bg-[#ffffff14] backdrop-blur-md shadow-amber-300 shadow-sm xl:w-[400px] xl:h-[500px]">
              
              <img src={logo} className='h-23 w-40 shadow-blue-50 mb-8' />

              {/* Customer Admin  Meter Reader Selection */}
              <div className='flex items-center'>

                <div className={`-z-1 absolute h-7 rounded-md p-1 bg-linear-to-r from-[#ffe209] to-[#ffea70] transition-all duration-300 w-24
                                ${isadmin ? "translate-x-[178%]": "-translate-x-3"}
                                ${isMtrRdr ? "translate-x-[90%]" : "-translate-x-3"}`}>
                </div>
                  <button className= {`font-medium hover:opacity-80 hover:cursor-pointer  text-amber-300 transition-all duration-100
                                      ${isConsumer ? "text-black" : "text-amber-300"}`}
                          onClick={() => {setisadmin(false), setisMtrRdr(false), setisConsumer(true)}}>
                          Consumer
                  </button>

                  <button className = {`font-medium hover:opacity-80 hover:cursor-pointer px-8 text-amber-300 transition-all duration-100
                                        ${isMtrRdr ? "text-black" : "text-amber-300"}`} 
                          onClick={() => {setisMtrRdr(true), setisadmin(false), setisConsumer(false)}}>
                          Mtr-Rdr
                  </button>
                
                  <button className = {`font-medium hover:opacity-80 hover:cursor-pointer text-amber-300 transition-all duration-100
                                        ${isadmin ? "text-black" : "text-amber-300"}`} 
                          onClick={() => {setisadmin(true), setisMtrRdr(false), setisConsumer(false)}}>
                          Admin
                  </button>
                
              </div>


              {/* Input Form */}
              <form onSubmit={isadmin ? HandleloginAdmin : isMtrRdr ? HandleloginMeterReader : isConsumer ? HandleloginCustomer : null} className='flex flex-col gap-8 w-full px-12 py-10 '>
                <input placeholder ='Enter Email' 
                       type ='email'
                       value = {email}
                       onChange={(enteredobj) => {setemail(enteredobj.target.value)}}
                       required
                       className='w-border-0 bg-[#0000008c] backdrop-blur-md text-white rounded-xl p-4 text-lg 
                                  focus:ring-amber-200 focus:ring outline-none transition-all duration-200'>
                </input>

                <input placeholder ='Enter Password' 
                       type ='password'
                       value = {pass}
                       onChange={(enteredobj) => {setpass(enteredobj.target.value)}}
                       required
                       className='w-border-0 bg-[#0000008c] backdrop-blur-md text-white rounded-xl p-4 text-lg 
                                  focus:ring-amber-200 focus:ring outline-none transition-all duration-200'>
                </input>
                
                <button type="submit" className="bg-linear-to-r from-[#ffe209] to-[#ffea70] rounded-2xl p-4 font-medium
                                                hover:opacity-85 hover:cursor-pointer hover:shadow-amber-200 hover:shadow-xs
                                                transition-all duration-200
                                                  ">Login</button>
              </form>
            </div>
        </div>

      </div>
    </div>
  )
}


export default LoginPage