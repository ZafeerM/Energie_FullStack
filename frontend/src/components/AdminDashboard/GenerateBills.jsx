import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const GenerateBills = () => {
    const [serverdata, setserverdata] = useState([]);


    const getMyRequests = async() => {
        try {
            const Token = localStorage.getItem('adminToken');

            // if(!Token) return;

            const url = 'http://localhost:5050/MetersAndUnits';
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

    const generateBill = async(m, u, t, c) => {
        try {
            const Token = localStorage.getItem('adminToken');

            const url = 'http://localhost:5050/GenerateBill';
            const response = await axios.post(url, { meter:m, units:u, type:t, cid:c }, {headers : {"Authorization" : `Bearer ${Token}`}});

            alert(response.data.message);
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

    useEffect(() => {
            getMyRequests();
        }, []);

    return (
        <div className='flex flex-col justify-center items-center w-full'>
            
            <div className='bg-amber-50 p-8 rounded-2xl'>
                <p className='text-red-600 text-xs'>Bill Charges as Per Gov: Rs 8 = Government, Rs 10 = Residential, Rs 20 = Commercial</p>
                <div className='flex font-semibold items-start bg-amber-100 rounded-md p-1'>
                    <p className='mr-10 ml-3'>MeterID</p>
                    <p className='mr-43'>Type</p>
                    <p className='mr-56'>Location</p>
                    <p className='mr-8'>Status</p>
                    <p className='mr-15'>Units</p>

                </div>

                <div className='flex flex-col h-72 overflow-y-auto'>
                    {serverdata.map((req) => (
                        <div key={req.MeterID} className='flex gap-x-10 py-1.5'>

                            <div className='w-5 px-7'>
                                <p>{req.MeterID}</p>
                            </div>

                            <div className='w-20 px-3 flex justify-center items-center'>
                                <p>{req.Type}</p>
                            </div>

                            <div className="w-84">
                                <p>{req.Location}</p>
                            </div>
                            
                            <div className='w-18 flex justify-center items-center'>
                                <p className={`rounded-md p-1 text-xs font-semibold
                                                ${req.Status === "Active" ? "bg-green-400" : "bg-red-400"}`}>{req.Status}</p>
                            </div>

                            <div className="w-8">
                                <p>{req.ReadingValue}</p>
                            </div>

                            <button className={`bg-blue-600 rounded-md w-20 h-7 text-white font-bold flex justify-center items-center
                                                cursor-pointer hover:opacity-70 text-xs
                                                ${req.Status !== 'Active' ? "hidden":""}`}
                                    onClick={() => generateBill(req.MeterID, req.ReadingValue, req.Type, req.ConnectionID)}>Generate Bill</button>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GenerateBills