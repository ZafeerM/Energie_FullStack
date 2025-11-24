import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const ComplaintHandler = () => {
    const [serverdata, setserverdata] = useState([]);
    const severityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
    };


    const getMyRequests = async() => {
        try {
            const Token = localStorage.getItem('adminToken');

            // if(!Token) return;

            const url = 'http://localhost:5050/GetComplaints';
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

    const deleteComplaint = async(c) => {
        try {
            const Token = localStorage.getItem('adminToken');

            const url = 'http://localhost:5050/DeleteComplaint';
            const response = await axios.delete(url, {headers : {"Authorization" : `Bearer ${Token}`}, data: { cid:c } });

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
                {/* <p className='text-red-600 text-xs'>Bill Charges as Per Gov: Rs 8 = Government, Rs 10 = Residential, Rs 20 = Commercial</p> */}
                <div className='flex font-semibold items-start bg-amber-100 rounded-md p-1'>
                    <p className='mr-35 ml-5'>ID</p>
                    <p className='mr-40'>Complaint Details</p>
                    <p className='mr-17'>Complaint Date</p>
                    <p className='mr-8'>Severity</p>

                </div>

                <div className='flex flex-col h-72 overflow-y-auto'>
                    {serverdata.map((req) => (
                        <div key={req.ComplaintID} className='flex gap-x-5 py-1.5'>

                            <div className='w-5 px-7'>
                                <p>{req.ComplaintID}</p>
                            </div>

                            <div className='w-84 px-3 flex items-center'>
                                <p>{req.ComplaintDetails}</p>
                            </div>

                            <div className="w-48">
                                <p>{req.ComplaintDate}</p>
                            </div>

                            
                            <div className='w-18 flex justify-center items-center'>
                                <p className={`rounded-md p-1 text-xs font-semibold
                                                ${req.Severity === 1 ? "bg-green-400" : ""}
                                                ${req.Severity === 3 ? "bg-red-400" : ""}
                                                ${req.Severity === 2 ? "bg-yellow-500" : ""}`}>{severityLabels[req.Severity]}</p>
                            </div>

                            <div className="w-8">
                                <p>{req.ReadingValue}</p>
                            </div>

                            <button className={`bg-emerald-600 rounded-md w-20 h-7 text-white font-bold flex justify-center items-center
                                                cursor-pointer hover:opacity-70 text-xs`}
                                    onClick={() => deleteComplaint(req.ComplaintID)}>Mark Solved</button>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ComplaintHandler