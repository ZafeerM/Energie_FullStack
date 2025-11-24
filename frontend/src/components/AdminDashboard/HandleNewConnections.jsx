import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const HandleNewConnections = () => {
    const [serverdata, setserverdata] = useState([]);
    
    const getMyRequests = async() => {
        try {
            const Token = localStorage.getItem('adminToken');

            // if(!Token) return;

            const url = 'http://localhost:5050/AllRequests';
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
    
    const updateRequest = async(type, cid, add, id, update) => {
        try {
            const Token = localStorage.getItem('adminToken');
            const url = 'http://localhost:5050/updateRequest';

            const response = await axios.post(url, {types: type, consumerid: cid, Address: add, RequestID: id, updateType: update}, {headers : {"Authorization" : `Bearer ${Token}`}});
            
            alert(response.data.message);

            //update useState immediatly
            setserverdata(prev =>
            prev.map(req =>
            req.RequestID === id ? { ...req, Status: update } : req));

            window.location.reload();
        
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

                </div>

                <div className='flex flex-col h-72 overflow-y-auto'>
                    {serverdata.map((req) => (
                        <div key={req.RequestID} className='flex gap-x-10 py-1.5'>
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
                            
                            <button className={`bg-green-600 rounded-md w-16 h-7 text-white font-bold flex justify-center items-center
                                                cursor-pointer hover:opacity-70 text-xs
                                                ${req.Status !== 'PENDING' ? "hidden":""}`}
                                    onClick={() => updateRequest(req.Type, req.ConsumerID, req.Address, req.RequestID, 'APPROVED')}>Approve</button>

                            <button className={`bg-red-600 rounded-md w-16 h-7 text-white font-bold flex justify-center items-center
                                                cursor-pointer hover:opacity-70 text-xs
                                                ${req.Status !== 'PENDING' ? "hidden":""}`}
                                    onClick={() => updateRequest(req.Type, req.ConsumerID, req.Address, req.RequestID, 'REJECTED')}>Reject</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HandleNewConnections