import { BrowserRouter, Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useEffect, useState } from "react";
//using createcontext and usecontext for sharing rathar than passing
import { loginContext } from "./context/context";
import Protectedroute from "./components/protectedroute";

function App() {

  //use state var to authenticate login
  const [isloggedin, setisloggedin] = useState(false)
  // localStorage.removeItem('sessionToken')


  //useEffect to update isloggedin when this renders
  useEffect(() => {
    if(!localStorage.getItem('sessionToken')){
      setisloggedin(false);
    }else{
      setisloggedin(true);
    }
  }, [isloggedin])


  return(
    <loginContext.Provider value = {setisloggedin}>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Navigate to='/login' replace/>}></Route>
          
          
          <Route path = '/login' 
          element={!isloggedin ? <Login /> : <Navigate to='/Dashboard' replace/>}></Route>
          
          {/* Protected Route to access Dashboard */}
          <Route path='/Dashboard' element={<Protectedroute><Dashboard /></Protectedroute>}></Route>

          {/* <Route path = "/Dashboard" element = {localStorage.getItem('sessionToken') ? <Dashboard /> : <Navigate to='/login' replace/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
}

export default App;

{/* <Route path = "/login" element = {!isloggedin ? (<Login/>) : (<Navigate to='/Dashboard' replace/> )}></Route> */}