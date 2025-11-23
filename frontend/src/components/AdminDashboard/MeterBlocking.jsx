import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const MeterBlocking = () => {
        const [serverdata, setserverdata] = useState([]);
    

    const blockMeter = async(id) => {
        try {
            const Token = localStorage.getItem('adminToken');

            // if(!Token) return;

            const url = 'http://localhost:5050/BlockMeter';
            const response = await axios.post(url, {meter:id}, {headers : {"Authorization" : `Bearer ${Token}`}});
            // console.log("Response: ", response.data);
            alert("Meter Blocked Successfully!");
            getMyRequests();
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

    const getMyRequests = async() => {
        try {
            const Token = localStorage.getItem('adminToken');

            // if(!Token) return;

            const url = 'http://localhost:5050/MeterBlocking';
            const response = await axios.get(url, {headers : {"Authorization" : `Bearer ${Token}`}});
            // console.log("Response: ", response.data);
            setserverdata(response.data);
        
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
                            <p className='mr-15'>ConnectionID</p>
                            <p className='mr-18'>Type</p>
                            <p className='mr-7'>MeterID</p>
                            <p className='mr-5'>ConsumerID</p>
                            <p className='mr-14'>Warnings</p>
                            <p className='mr-0'>Balance</p>


                        </div>

                        <div className='flex flex-col h-72 overflow-y-auto items-center'>
                            {serverdata.map((req) => (
                                <div key={req.ConnectionID} className='flex gap-x-10 py-1.5'>
                                    
                                    <div className='w-20 px-6 flex justify-center items-center'>
                                        <p>{req.ConnectionID}</p>
                                    </div>

                                    <div className='w-30 flex justify-center items-center'>
                                        <p>{req.Type}</p>
                                    </div>

                                    <div className='w-10 flex justify-center items-center'>
                                        <p>{req.MeterID}</p>
                                    </div>

                                    <div className='w-20 flex justify-center items-center'>
                                        <p>{req.ConsumerID}</p>
                                    </div>

                                    <div className={`w-10 flex justify-center items-center rounded-md
                                                     ${req.WarningCount == 2 ? "bg-yellow-500" : ""}
                                                     ${req.WarningCount > 2 ? "bg-red-500" : ""}`}>
                                        <p>{req.WarningCount}</p>
                                    </div>

                                    <div className='w-30 flex justify-center items-center'>
                                        <p>{req.BalancePayment}</p>
                                    </div>

                                    <div className='w-18 flex justify-center items-center'>
                                        <p className={`rounded-md p-1 text-xs font-semibold
                                                        ${req.Status === "Active" ? "bg-green-400" : "bg-red-400"}`}>{req.Status}</p>
                                    </div>
                                    
                                    <div className='w-32'>
                                        <button className={`w-20 bg-red-500 text-xs p-1 rounded-md text-white cursor-pointer flex justify-center items-center
                                                        hover:opacity-80
                                                        ${req.WarningCount > 2 ? "":"hidden"}
                                                        ${req.Status === "Blocked" ? "hidden":""}`}
                                                onClick={() => blockMeter(req.MeterID)}>
                                            Block Meter
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
}

export default MeterBlocking