import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Profileinfo = () => {

    const ServerLink = 'http://localhost:5050/ProfileInfo';
    const Token = localStorage.getItem('sessionToken');
    //To store Server Data
    const [ServerProfileData, setServerProfileData] = useState({
            ConsumerID:"",
            username:"",
            FName:"",
            LName:"",
            ContactNo:"",
            Address1:"",
            Address2:""
        }); 

    // Get Details from Server
    async function FetchProfileDetails() {
        if(!Token){
            console.error("Error: No Token Found!");
            return;
        }

        try {
            const ServerResponse = await axios.get(ServerLink, {
                                                   headers: {'Authorization' : `Bearer ${Token}`} });
            
            const [getfirstbox] = ServerResponse.data;
            setServerProfileData(getfirstbox);
            console.log("JSON Response FROM DB: ", getfirstbox);
            
        } catch (error) {
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

    useEffect(() => {
        FetchProfileDetails();
    }, [Token])
    
    return (
        
        <div className='w-screen flex flex-col justify-center items-center'>
            <h1 className='font-bold text-7xl mt-20'>Welcome, <span className='bg-amber-300 px-10'>{ServerProfileData.FName}.</span></h1>

            <h2 className='font-semibold text-3xl bg-black text-white p-2 mt-32 mb-8'>Profile Info</h2>

            <div className='w-3xl'>
                <div className='bg-black text-white font-bold p-2'>Consumer Name / Consumer ID</div>
                <div className='border-2 p-2 font-semibold backdrop-blur-sm'>{ServerProfileData.FName} {ServerProfileData.LName} - {ServerProfileData.ConsumerID}</div>
                
                <div className='bg-black text-white font-bold p-2 mt-10'>User Name</div>
                <div className='border-2 p-2 font-semibold backdrop-blur-sm'>{ServerProfileData.username}</div>
            
                <div className='bg-black text-white font-bold p-2 mt-10'>Contact Number</div>
                <div className='border-2 p-2 font-semibold backdrop-blur-sm'>{ServerProfileData.ContactNo}</div>
            
                <div className='bg-black text-white font-bold p-2 mt-10'>Consumer Address</div>
                <div className='border-2 p-2 font-semibold backdrop-blur-sm'>{ServerProfileData.Address1} <br></br> {ServerProfileData.Address2}</div>
            </div>


        {/* <div className='bg-amber-600'>Profileinfo</div> */}

        </div>
    )
}

export default Profileinfo
