import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const MyPayments = () => {
    const [serverdata, setserverdata] = useState([]);

    const getMyRequests = async() => {
        try {
            const Token = localStorage.getItem('sessionToken');

            // if(!Token) return;

            const url = 'http://localhost:5050/MyPayments';
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

    const paybill = async(bill, total, id) => {
        try {
            const Token = localStorage.getItem('sessionToken');

            // if(!Token) return;

            const url = 'http://localhost:5050/Paybill';
            const response = await axios.post(url, {bid:bill, totalbal:total, cid:id},{headers : {"Authorization" : `Bearer ${Token}`}});
            // console.log("Response: ", response.data);
            // setserverdata(response.data);
            alert("Bill Paid Successfully!");
            getMyRequests();
        
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
                            <p className='mr-10'>ConnectionID</p>
                            <p className='mr-12'>Units Used</p>
                            <p className='mr-7'>Unit Rate</p>
                            <p className='mr-13'>Total Amount</p>
                            <p className='mr-14'>Status</p>



                        </div>

                        <div className='flex flex-col h-72 overflow-y-auto items-center'>
                            {serverdata.map((req) => (
                                <div key={req.BillID} className='flex gap-x-10 py-1.5'>
                                    
                                    <div className='w-20 px-6 flex justify-center items-center'>
                                        <p>{req.ConnectionID}</p>
                                    </div>

                                    <div className='w-30 flex justify-center items-center'>
                                        <p>{req.UnitsConsumed}</p>
                                    </div>

                                    <div className='w-10 flex justify-center items-center'>
                                        <p>{req.PerUnitRate}</p>
                                    </div>

                                    <div className='w-20 flex justify-center items-center'>
                                        <p>{req.TotalAmount}</p>
                                    </div>

                                    <div className='w-30 flex justify-center items-center'>
                                        <p>{req.Status}</p>
                                    </div>

                                    
                                    <div className='w-32'>
                                        <button className={`w-20 bg-green-700 text-xs p-1 rounded-md text-white cursor-pointer flex justify-center items-center
                                                        hover:opacity-80
                                                        ${req.Status === "PENDING" ? "":"hidden"}`}
                                                onClick={() => paybill(req.BillID, req.TotalAmount, req.ConnectionID)}>
                                            Pay Bill
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
}

export default MyPayments