import React, { useState } from 'react'
import Modal from './AdminDashboard/ModalNewCustomer';
import { useNavigate } from 'react-router-dom';

//Admin Imports
import Addnewcustomer from './AdminDashboard/Addnewcustomer';
import HandleNewConnections from './AdminDashboard/HandleNewConnections';
import GenerateBills from './AdminDashboard/GenerateBills';
import ViewAllCustomers from './AdminDashboard/ViewAllCustomers';
import MeterBlocking from './AdminDashboard/MeterBlocking';
// import AdminDashBtn from './AdminDashboard/AdminDashBtn'

const AdminDashboard = () => {
    const [active, setactive] = useState(null);
    const close = ()=>setactive(null);
    const navigate = useNavigate();

    const Adminlogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/Login', {replace : true});
    }


    return (
        // Main background
        <div className='flex justify-center items-center h-screen
                        bg-[url("./assets/patternA4.jpg")] bg-contain'>
        
            {/* Dark Overlay */}
            <div className='absolute h-screen w-screen bg-black/0'></div>

            {/* Main Data Div */}
            <div className='z-10 p-10 flex flex-col justify-center items-center rounded-2xl backdrop-blur-2xl'>
                <h1 className='text-amber-950 text-5xl font-bold border-amber-950 border-8 p-5'>Admin Panel</h1>
            
                {/* Options */}
                <div className='grid lg:grid-cols-3 gap-3 py-10'>

                    <button className='text-white font-semibold w-xs bg-amber-950 rounded-md 
                        py-3 flex items-center justify-center transition-all duration-300
                        hover:bg-white hover:text-amber-950 hover:cursor-pointer'
                            onClick={()=>{setactive("NewCustomer")}}>
                        Register New Customer
                    </button>
                    <button className='text-white font-semibold w-xs bg-amber-950 rounded-md 
                        py-3 flex items-center justify-center transition-all duration-300
                        hover:bg-white hover:text-amber-950 hover:cursor-pointer'
                        onClick={()=>{setactive("ViewAllCustomers")}}>
                        View All Customers
                    </button>
                    <button className='text-white font-semibold w-xs bg-amber-950 rounded-md 
                        py-3 flex items-center justify-center transition-all duration-300
                        hover:bg-white hover:text-amber-950 hover:cursor-pointer'
                            onClick={()=>{setactive("HandleNewConnections")}}>
                        Handle New Connection
                    </button>
                    <button className='text-white font-semibold w-xs bg-amber-950 rounded-md 
                        py-3 flex items-center justify-center transition-all duration-300
                        hover:bg-white hover:text-amber-950 hover:cursor-pointer'
                            onClick={()=>{setactive("GenerateBills")}}>
                        Generate Bills
                    </button>
                    <button className='text-white font-semibold w-xs bg-amber-950 rounded-md 
                        py-3 flex items-center justify-center transition-all duration-300
                        hover:bg-white hover:text-amber-950 hover:cursor-pointer'>
                        Complaint Handler
                    </button>
                    <button className='text-white font-semibold w-xs bg-amber-950 rounded-md 
                        py-3 flex items-center justify-center transition-all duration-300
                        hover:bg-white hover:text-amber-950 hover:cursor-pointer'
                        onClick={()=>{setactive("MeterBlocking")}}>
                        Meter blocking Handler
                    </button>

                </div>
                <button className='bg-red-600 py-2.5 px-10 rounded-md text-white font-bold
                                    hover:opacity-80 hover:cursor-pointer' 
                        onClick={Adminlogout}>Log Out</button>
            </div>
            
            {/* Call the Pop Up */}
            <Modal checkOpen={active === 'NewCustomer'} onClose={close}><Addnewcustomer /></Modal>
            <Modal checkOpen={active === 'HandleNewConnections'} onClose={close}><HandleNewConnections/></Modal>
            <Modal checkOpen={active === 'GenerateBills'} onClose={close}><GenerateBills /></Modal>
            <Modal checkOpen={active === 'ViewAllCustomers'} onClose={close}><ViewAllCustomers /></Modal>
            <Modal checkOpen={active === 'MeterBlocking'} onClose={close}><MeterBlocking /></Modal>
        </div>
    )
}

export default AdminDashboard