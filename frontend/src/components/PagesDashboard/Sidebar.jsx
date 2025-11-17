import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logonew.png";

const Sidebar = ({currentpage, setpages}) => {
    const navigate = useNavigate();

    // Logout Function
    const logout = async () => {
        await localStorage.removeItem('sessionToken');
        navigate('/Login', {replace:true});
        
    }

    return (
    <div className='bg-black h-screen min-w-3xs flex flex-col items-center justify-center gap-4'>

        {/* Logo */}
        <img src={logo} className='mt-16 w-42 mb-12'/>

        {/* List of options */}
        <ul className='text-white flex flex-col space-y-3 font-semibold'>
            <li className={`hover:cursor-pointer hover:opacity-80 transition-all duration-100 p-1
                            ${currentpage === 'ProfileInfo' ? "bg-amber-300 rounded-md text-black" : ""}`}
                onClick={() => {setpages('ProfileInfo')}}>Profile Info</li>

            <li className={`hover:cursor-pointer hover:opacity-80 transition-all duration-100 p-1
                            ${currentpage === 'NewRequest' ? "bg-amber-300 rounded-md text-black" : ""}`}
                onClick={() => {setpages('NewRequest')}}>New Request</li>
            
            <li className={`hover:cursor-pointer hover:opacity-80 transition-all duration-100 p-1
                            ${currentpage === 'MyRequest' ? "bg-amber-300 rounded-md text-black" : ""}`}
                onClick={() => {setpages('MyRequest')}}>My Requests</li>
            
            <li className={`hover:cursor-pointer hover:opacity-80 transition-all duration-100 p-1
                            ${currentpage === 'SetPassword' ? "bg-amber-300 rounded-md text-black" : ""}`}
                onClick={() => {setpages('SetPassword')}}>Set Password</li>
            
            <li className={`hover:cursor-pointer hover:opacity-80 transition-all duration-100 p-1
                            ${currentpage === 'EditDetails' ? "bg-amber-300 rounded-md text-black" : ""}`}
                onClick={() => {setpages('EditDetails')}}>Edit Details</li>
            
            <li className={`hover:cursor-pointer hover:opacity-80 transition-all duration-100 p-1
                            ${currentpage === 'ViewBills' ? "bg-amber-300 rounded-md text-black" : ""}`}
                onClick={() => {setpages('ViewBills')}}>View Bills</li>

            <li className={`hover:cursor-pointer hover:opacity-80 transition-all duration-100 p-1
                            ${currentpage === 'UsageLogs' ? "bg-amber-300 rounded-md text-black" : ""}`}
                onClick={() => {setpages('UsageLogs')}}>Usage Logs</li>

            <li className={`hover:cursor-pointer hover:opacity-80 transition-all duration-100 p-1
                            ${currentpage === 'PayMyBill' ? "bg-amber-300 rounded-md text-black" : ""}`}
                onClick={() => {setpages('PayMyBill')}}>Pay My Bill</li>

            <li className={`hover:cursor-pointer hover:opacity-80 transition-all duration-100 p-1
                            ${currentpage === 'MyPayments' ? "bg-amber-300 rounded-md text-black" : ""}`}
                onClick={() => {setpages('MyPayments')}}>My Payments</li>

            <li className={`hover:cursor-pointer hover:opacity-80 transition-all duration-100 p-1
                            ${currentpage === 'MyWarnings' ? "bg-amber-300 rounded-md text-black" : ""}`}
                onClick={() => {setpages('MyWarnings')}}>My Warnings</li>

            <li className={`hover:cursor-pointer hover:opacity-80 transition-all duration-100 p-1
                            ${currentpage === 'MyStatus' ? "bg-amber-300 rounded-md text-black" : ""}`}
                onClick={() => {setpages('MyStatus')}}>My Status</li>
           


        </ul>

        {/* logout */}
        <button className='bg-amber-300 p-2 w-[120px] font-semibold rounded-md
                           hover:bg-amber-200 hover:cursor-pointer mt-auto mb-20'
                onClick={logout}>
                           Log Out
        </button>

    </div>
  )
}

export default Sidebar