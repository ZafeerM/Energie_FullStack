import axios from "axios";
import { useState } from "react";

function Dashboard()
{
    const [tempDash, settempDash] = useState("");

    // Function GETS the user details from the database.
    async function getDashboard(){
        // Retrieve the token we saved in local storage
        const sessionToken = localStorage.getItem('sessionToken');
        const dashboardData = 'http://localhost:5050';

        if(!sessionToken){
            console.error("No token found. User may have logged out!");
            return;
        }

        try {
            const response = await axios.get(dashboardData, {
                headers: {
                    'Authorization' : `Bearer ${sessionToken}`
                }
            });
            settempDash(JSON.stringify(response.data));
            console.log("response: ", response.data);
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

    return(
        <div className="Dashboard">
            
            <h1>Welcome to Dashboard</h1>
            <h2>{tempDash}</h2>
        
        </div>
    );
}

export default Dashboard;
