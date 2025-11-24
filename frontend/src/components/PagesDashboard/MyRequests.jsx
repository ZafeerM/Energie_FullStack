import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react'

const MyRequests = () => {
    const [serverdata, setserverdata] = useState([]);
    
    const deleteRequest = async(id) => {
        try {
            const url = 'http://localhost:5050/DeleteRequest';
            const Token = localStorage.getItem('sessionToken');
            if(!Token) return;

            const resp = await axios.delete(url, {
                                            headers : {"Authorization" : `Bearer ${Token}`},
                                            data : {todeleteid : id} 
                                        });
            alert(resp.data.message);
            setserverdata(prev => prev.filter(req => req.RequestID !== id));

        } catch (error) {
            if(error.response){
            console.error("Status: ", error.response.status);
            console.error("Message: ", error.response.data);
            alert(`Error : ${error.response.data.message}`);
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
    }

    const getMyRequests = async() => {
        try {
            const Token = localStorage.getItem('sessionToken');

            if(!Token) return;

            const url = 'http://localhost:5050/MyRequests';
            const response = await axios.get(url, {headers : {"Authorization" : `Bearer ${Token}`}});
            // console.log("Response: ", response.data);
            setserverdata(response.data);
        
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
    }

    useEffect(() => {
        getMyRequests();
    }, []);


    return (
        <div className='flex flex-col justify-center items-center w-full'>
            
            <div className='bg-amber-50 p-8 rounded-2xl'>
                <div className='flex font-semibold items-start bg-amber-100 rounded-md p-1'>
                    <p className='mr-5'>ID</p>
                    <p className='mr-4'>ConsumerID</p>
                    <p className='mr-5'>RequestDate</p>
                    <p className='mr-15'>Request Time</p>
                    <p className='mr-25'>Type</p>
                    <p className='mr-50'>Status</p>
                    <p className='mr-41'>Address</p>
                    <p className='mr-8'>Delete</p>
                </div>

                <div className='flex flex-col h-64 overflow-y-auto'>
                    {serverdata.map((req) => (
                        <div key={req.RequestID} className='flex gap-x-10 py-1.5  '>
                            <div className='w-5'>
                                <p>{req.RequestID}</p>
                            </div>
                            <p>{req.ConsumerID}</p>

                            <p>{req.RequestDate.split("T")[0]}</p>
                            <p>{req.RequestDate.split("T")[1].split(".000Z")[0]}</p>
                            
                            <div className='flex w-32 justify-center'>
                                <p>{req.Type}</p>
                            </div>

                            <div className='w-18 flex justify-center items-center'>
                                <p className={`rounded-md p-1 text-xs font-semibold
                                                ${req.Status === "PENDING" ? "bg-yellow-300" : ""}
                                                ${req.Status === "REJECTED" ? "bg-red-400" : "bg-green-400"}`}>{req.Status}</p>
                            </div>
                            
                            <div className="w-84">
                                <p>{req.Address}</p>
                            </div>
                            <button className={`bg-red-400 rounded-md w-7 h-7 text-white font-bold flex justify-center
                                                cursor-pointer hover:opacity-70
                                                ${req.Status === 'APPROVED' ? "hidden":""}`}
                                    onClick={() => deleteRequest(req.RequestID)}>x</button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyRequests