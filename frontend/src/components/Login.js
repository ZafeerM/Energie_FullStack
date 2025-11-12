import React, { use, useEffect, useState } from "react";
import "./Login.css";
import background from "../assets/4.jpg";   // background
import logo from "../assets/logonew.png";   // logo file
import axios from 'axios';
import { useNavigate } from "react-router-dom";
//using createcontext and usecontext for sharing rathar than passing
import { useContext } from "react";
import { loginContext } from "../context/context";

function Login()
{
    const setlogin = useContext(loginContext)
    //to navigate to dashboard
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // * --------The main function that "Talks" to the database
    const HandleLogin = async (e) => {

        e.preventDefault();

        console.log("Login Email:", email);
        console.log("Login Password:", password);

        const loginURL = 'http://localhost:5050/login';

        try {
        const response = await axios.post(loginURL, {
            Username : email,
            Password : password
        });

        const token = response.data.token;
        console.log("Login SUCCESSFUL. Received Token:", token);

        //saving token locally for future server auth (almost everywhere)
        localStorage.setItem('sessionToken', token);

        alert("Login Success");

        //change to dashboard
        setlogin(true);
        navigate('/dashboard');

        } 
        catch (error) 
        {
        if (error.response) {
                // Case 1: The server responded (e.g., 400, 401, 500)
                console.error("Server Error Response Status:", error.response.status);
                console.error("Server Error Data:", error.response.data);
                
                // Now it is safe to read error.response.data.message
                const errorMessage = error.response.data.message || "Invalid credentials provided.";
                alert(`Login Failed: ${errorMessage}`);
                
            } else if (error.request) {
                // Case 2: Request was sent, but no response was received (Timeout, CORS error)
                console.error("No response received. Check network and CORS settings.");
                console.error("Request object:", error.request);
                alert("Login Failed: Could not connect to the server (check if server is running on port 5050).");
                
            } else {
                // Case 3: Setup or configuration error (e.g., a bug in axios or JS)
                console.error("Axios setup error:", error.message);
                alert(`Login Failed: An unexpected error occurred: ${error.message}`);
            }
        }



    };

    const handleSignUp = () => {
        console.log("Redirect to Sign Up page");
        // Replace with your routing logic
    };

    //----- so that logged in user cant move back to login page
    // useEffect(() => {

    //   if(localStorage.getItem('sessionToken')){
    //     navigate('/Dashboard', {replace: true})
    //   }
    // }, [navigate])
    

    return(
      <div className="App" style={{ backgroundImage: `url(${background})` }}>
        <div className="left-section">
          <div className="overlay-text">
            <h1>
              Energy, <span className="highlight">Reimagined.</span>
            </h1>
            <p>Powering a sustainable future — one connection at a time.</p>
            <p>Track, manage, and optimize your electricity usage smartly.</p>
          </div>
        </div>

        <div className="right-section">
          <div className="login-box">
            {/* LOGO */}
            <img src={logo} alt="Energie Logo" className="login-logo" />

            {/* FORM + SIGN UP WRAPPER */}
            <div className="form-container">
              <form onSubmit={HandleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="login-btn">Login</button>
              </form>

              <button type="button" className="signup-btn" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login;