import axios from "axios";
import { useContext, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../context/context";
import logo from "../assets/logonew.png";   // logo file

function Dashboard()
{
    //Use State Variables to update and use
    const [consumerUsername, setconsumerUsername] = useState("");
    const [consumerID, setconsumerID] = useState("");
    const [consumerFname, setconsumerFname ] = useState("");

    const navigate = useNavigate();
    const setisloggedin = useContext(loginContext);

    //! ------- Function GETS the user details from the database.
    async function getDashboard(){
        // Retrieve the token we saved in local storage
        const sessionToken = localStorage.getItem('sessionToken');
        const dashboardData = 'http://localhost:5050';

        if(!sessionToken){
            console.error("No token found. User may have logged out!");
            // navigate('/login')
            // navigate('/login', {replace: true});
            return;
        }

        try {
            const response = await axios.get(dashboardData, {
                headers: {
                    'Authorization' : `Bearer ${sessionToken}`
                }
            });

            //get 0 index from response (that has the data)
            const [getfirstbox] = response.data;
            const {ConsumerID, username, FName} = getfirstbox;
            setconsumerID(ConsumerID);
            setconsumerUsername(username);
            setconsumerFname(FName);
            console.log("JSON Response FROM DB: ", getfirstbox);
        } 
        catch (error) {
            if (error.response) {
                // Case 1: The server responded (e.g., 400, 401, 500)
                console.error("Server Error Response Status:", error.response.status);
                console.error("Server Error Data:", error.response.data);
                
            } else if (error.request) {
                // Case 2: Request was sent, but no response was received (Timeout, CORS error)
                console.error("No response received. Check network and CORS settings.");
                console.error("Request object:", error.request);
                alert("Failed: Could not connect to the server (check if server is running on port 5050).");
                
            } else {
                // Case 3: Setup or configuration error (e.g., a bug in axios or JS)
                console.error("Axios setup error:", error.message);
                alert(`Failed: An unexpected error occurred: ${error.message}`);
            }
        }

    }
    
    getDashboard();
    
    //! ------- Logout : clear sessionToken etc
    async function logout(){ 
        await localStorage.removeItem('sessionToken');
        setisloggedin(false);

        return;
    }

    // * ------------------REACT Code - FrontEnd
    return(
        <div className="Dashboard">

            <div className="dbLeftSide">
                <div className="lefttoplogo">
                    <img src={logo} alt="Energie Logo" className="login-logo" />
                </div>
                <div className="lefttop">
                    <ul>
                        <li><a href="">View Personal Info</a></li>
                        <li><a href="">Request New Connection</a></li>
                        <li><a href="">Manage Connection Requests</a></li>
                        <li><a href="">Change Password</a></li>
                        <li><a href="">Request Info Change</a></li>
                        <li><a href="">View All Bills</a></li>
                        <li><a href="">View Usage History</a></li>
                        <li><a href="">Pay Your Bill</a></li>
                        <li><a href="">Payment History</a></li>
                        <li><a href="">View Warnings</a></li>
                        <li><a href="">Connection Status</a></li>
                    </ul>
                </div>

                <div className="leftbottom">
                    <button className="logoutbtn" onClick={logout}>Log Out</button>
                </div>

            </div>

            <div className="dbRightSide">

                <div className="rightsideleftbox">
                    <h1 className="DbHeading1">Dashboard</h1>
                    
                    <div className="Welcomebox">
                        <h2>Welcome back, {consumerFname}</h2>
                        ConsumerID: {consumerID} 
                    </div>
                </div>

                <div className="rightsiderightbox">

                </div>

            </div>
            
        </div>
    );
}

export default Dashboard;
