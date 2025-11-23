import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const ViewAllCustomers = () => {
    const [serverdata, setserverdata] = useState([]);
    
    const getMyRequests = async() => {
        try {
            const Token = localStorage.getItem('adminToken');

            // if(!Token) return;

            const url = 'http://localhost:5050/AllCustomers';
            const response = await axios.get(url, {headers : {"Authorization" : `Bearer ${Token}`}});
            // console.log("Response: ", response.data);
            setserverdata(response.data);
        
        } catch (error) {
            if(error.response){
            console.error("Status: ", error.response.status);
            console.error("Message: ", error.response.data);
            alert(`Error : ${error.response.message}`);
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
        }, [setserverdata]);
    
    return (
            <div className='flex flex-col justify-center items-center w-full'>
                
                <div className='bg-amber-50 p-8 rounded-2xl'>
                    <div className='flex font-semibold items-start bg-amber-100 rounded-md p-1'>
                        <p className='mr-10'>ConsumerID</p>
                        <p className='mr-28'>Consumer Name</p>
                        <p className='mr-60'>Contact Num</p>
                        <p className='mr-41'>Address</p>

                    </div>

                    <div className='flex flex-col h-72 overflow-y-auto items-center'>
                        {serverdata.map((req) => (
                            <div key={req.ConsumerID} className='flex gap-x-20 py-1.5'>
                                
                                <div className='w-5 px-6'>
                                    <p>{req.ConsumerID}</p>
                                </div>

                                <div className='w-40'>
                                    <p>{req.FName} {req.LName}</p>
                                </div>

                                <div className='w-30'>
                                    <p>{req.ContactNo}</p>
                                </div>

                                <div className='w-100'>
                                    <p>{req.Address1} {req.Address2}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
}

export default ViewAllCustomers