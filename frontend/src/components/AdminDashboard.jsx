import React, { useState } from 'react'
import Modal from './AdminDashboard/ModalNewCustomer';

//Admin Imports
// import AdminDashBtn from './AdminDashboard/AdminDashBtn'

const AdminDashboard = () => {
    const [active, setactive] = useState(null);

    const close = ()=>setactive(null);

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
                        hover:bg-white hover:text-amber-950 hover:cursor-pointer'>
                        View All Details
                    </button>
                    <button className='text-white font-semibold w-xs bg-amber-950 rounded-md 
                        py-3 flex items-center justify-center transition-all duration-300
                        hover:bg-white hover:text-amber-950 hover:cursor-pointer'>
                        Handle New Connection
                    </button>
                    <button className='text-white font-semibold w-xs bg-amber-950 rounded-md 
                        py-3 flex items-center justify-center transition-all duration-300
                        hover:bg-white hover:text-amber-950 hover:cursor-pointer'>
                        Handle Info Change Req
                    </button>
                    <button className='text-white font-semibold w-xs bg-amber-950 rounded-md 
                        py-3 flex items-center justify-center transition-all duration-300
                        hover:bg-white hover:text-amber-950 hover:cursor-pointer'>
                        Warnings Handler
                    </button>
                    <button className='text-white font-semibold w-xs bg-amber-950 rounded-md 
                        py-3 flex items-center justify-center transition-all duration-300
                        hover:bg-white hover:text-amber-950 hover:cursor-pointer'>
                        Meter blocking Handler
                    </button>

                </div>
            </div>
            
            {/* Call the Pop Up */}
            <Modal checkOpen={active === 'NewCustomer'} onClose={close}>Add new consumer</Modal>
        
        </div>
    )
}

export default AdminDashboard