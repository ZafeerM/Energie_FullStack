import { useState } from 'react';
import React from 'react'

//Import Dashboard Pages
import Sidebar from './PagesDashboard/Sidebar'
import Profileinfo from './PagesDashboard/Profileinfo';
import NewRequest from './PagesDashboard/NewRequest';
import SetPassword from './PagesDashboard/SetPassword';
import EditDetails from './PagesDashboard/EditDetails';
import MyRequests from './PagesDashboard/MyRequests';
import MyPayments from './PagesDashboard/MyPayments';
import MyStatus from './PagesDashboard/MyStatus';
import Complaints from './PagesDashboard/Complaints';
import Mycomplaints from './PagesDashboard/Mycomplaints';


const DashboardPage = () => {
  const [page, setpage] = useState("ProfileInfo");

  return (
    <>
    {/* Background */}
    <div className='absolute -z-10 h-screen w-screen bg-contain opacity-50 bg-[url("./assets/pattern.jpg")]'>
    </div>

    {/* Page Handler With Navbar (sticked) */}
    <div className='flex'>
      {/* SideBar Display */}
      <Sidebar currentpage={page} setpages={setpage}/>

      {/* Page display by page usestate */}
      {page === 'ProfileInfo' ? <Profileinfo /> : null}
      {page === 'NewRequest' ? <NewRequest /> : null}
      {page === 'MyRequest' ? <MyRequests /> : null}
      {page === 'SetPassword' ? <SetPassword /> : null}
      {/* {page === 'EditDetails' ? <EditDetails /> : null} */}
      {page === 'MyPayments' ? <MyPayments /> : null}
      {page === 'MyStatus' ? <MyStatus /> : null}
      {page === 'Complaints' ? <Complaints /> : null}
      {page === 'MyComplaints' ? <Mycomplaints /> : null}
    </div>

    </>
  )
}

export default DashboardPage