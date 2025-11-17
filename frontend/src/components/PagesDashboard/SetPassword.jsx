import axios from 'axios';
import React, { useState } from 'react'

const SetPassword = () => {
    const ServerSetPassUrl = 'http://localhost:5050/UpdatePass';
    const Token = localStorage.getItem('sessionToken');
    const[oldp, setoldpass] = useState("");
    const[newp, setnewpass] = useState("");
    const[confirmpass, setconfirmpass] = useState("");

    const ChangePassword = async(e) => {
        e.preventDefault();

        if(newp != confirmpass)
        {
            console.error("Password dont match!");
            alert("Error: Passwords dont match!");
            return;
        }

        try {
            // For items its axios.post(url, data, headers)
            const data = await axios.post(ServerSetPassUrl, {oldpass : oldp, newpass : newp},{headers: {'Authorization' : `Bearer ${Token}`}})
            console.log(data);
            
            alert('Password Changed Successfully.');
        } catch (error) {
            if(error.response){
                console.error("Status: ", error.response.status);
                console.error("Message: ", error.response.data);
                const errMsg = error.response.message || "Old Password Incorrect";
                alert(`Error : ${errMsg}`);
            }
            else if(error.request) {
                console.error("No response recieved.");
                alert('No Response, connect to server.')
            }
            else{
                console.error("Unexpected error.");
            }
        }


        
    }


    return (
    <div className='flex justify-center items-center w-screen'>

        {/* Change Pass Box */}
        <div className='bg-black flex flex-col rounded-md p-10 text-amber-300'>
            <h1 className='flex justify-center font-bold text-3xl text-amber-300'>Change Password</h1>
            <form className='flex flex-col font-semibold space-y-3 mt-10' onSubmit={ChangePassword}>
                <a>Old Password</a>
                <input onChange={(e) => setoldpass(e.target.value)} type='password' required className='border border-gray-500 rounded-md w-xs p-1.5 ring-1 ring-amber-300 outline-0 transition-all duration-200 text-amber-300 focus:shadow-md focus:shadow-amber-200'></input>
                <a>New Password</a>
                <input onChange={(e) => setnewpass(e.target.value)} type='password' required className='border border-gray-500 rounded-md w-xs p-1.5 ring-1 ring-amber-300 outline-0 transition-all duration-200 text-amber-300 focus:shadow-md focus:shadow-amber-200'></input>
                <a>Confirm Password</a>
                <input onChange={(e) => setconfirmpass(e.target.value)} type='password' required className='border border-gray-500 rounded-md w-xs p-1.5 ring-1 ring-amber-300 outline-0 transition-all duration-200 text-amber-300 focus:shadow-md focus:shadow-amber-200'></input>
                <button className='mt-5 bg-amber-300 text-black rounded-md p-1.5 hover:opacity-80 hover:cursor-pointer active:opacity-60'>Change Password</button>
            </form>

        </div>

    </div>
  )
}

export default SetPassword