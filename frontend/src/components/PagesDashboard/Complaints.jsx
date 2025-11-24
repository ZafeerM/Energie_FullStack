import axios from 'axios';
import React, { useState } from 'react'

const Complaints = () => {
  const [loading, setLoading] = useState(false);
  const [address, setaddress] = useState("");       //complaint details
  const [type, settype] = useState('low');          //complaint severity

  const AddRequest = async(e) => {
    e.preventDefault();

    setLoading(true);
    const ServerSetPassUrl = 'http://localhost:5050/NewComplaint';
    const Token = localStorage.getItem('sessionToken');

    try {
      const response = await axios.post(ServerSetPassUrl, {meteraddress : address, metertype:type}, {headers: {'Authorization' : `Bearer ${Token}`}});
      alert(`Success : ${response.data.message}`);
      setaddress("");

    } catch (error) {
      if(error.response){
        console.error("Status: ", error.response.status);
        console.error("Message: ", error.response.data);
        // alert(`Error : ${error.response.data.message}`);
      }
      else if(error.request) {
          console.error("No response recieved.");
          alert('No Response, connect to server.')
      }
      else{
          console.error("Unexpected error.");
          alert(error);
      }
    }

    setLoading(false);
  }

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='rounded-xl bg-neutral-400 flex flex-col items-center'>
        <h1 className='font-bold text-2xl p-5'>File A Complaint</h1>
        <form className="flex flex-col w-xl px-12 gap-y-1 py-5" onSubmit={AddRequest}>
          <div className='flex w-full'>
            <a className='font-semibold px-3 py-1'>Complaint Details: </a>
            <input required className='border p-1 w-2xs rounded-md' value={address} onChange={(e) =>{setaddress(e.target.value)}}></input>        
          </div>

          <div className='flex justify-center gap-x-4 mt-5'>
            <a className='font-semibold py-1'>Severity: </a>
            <button type='button' className={`cursor-pointer font-semibold border rounded-2xl border-black text-xs p-2 hover:opacity-80 shadow-md shadow-red-400
                                              ${type === 'high' ? "bg-red-500 ": ""}`}
                                  onClick={()=>{settype('high')}}>HIGH</button>
            <button type='button' className={`cursor-pointer font-semibold rounded-2xl border border-black text-xs p-2 hover:opacity-80 shadow-md shadow-red-400
                                              ${type === 'medium' ? "bg-yellow-400": ""}`}
                                  onClick={()=>{settype('medium')}}>MEDIUM</button>
            <button type='button' className={`cursor-pointer font-semibold rounded-2xl border border-black text-xs p-2 hover:opacity-80 shadow-md shadow-red-400
                                              ${type === 'low' ? "bg-green-400 ": ""}`}
                                  onClick={()=>{settype('low')}}>LOW</button>
          </div>

          <div className='flex justify-center'>
            <button
              type="submit"
              className="relative mt-7 px-5 bg-red-500 text-white rounded-md p-1 font-semibold transition-all duration-200 cursor-pointer hover:opacity-80 flex justify-center"
            >
              <span className={`${loading ? 'opacity-0' : ''}`}>Lodge Complaint</span>
              <span className={`absolute ${loading ? '' : 'opacity-0'}`}>Loading</span>
            </button>
          </div>

        </form>
     </div>
    </div>
  )
}

export default Complaints