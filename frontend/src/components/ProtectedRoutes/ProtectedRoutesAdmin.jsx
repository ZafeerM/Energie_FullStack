import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoutesAdmin = ({children}) => {

    const adminToken = localStorage.getItem('adminToken');
    
    return (adminToken ? children : <Navigate to={'/Login'} replace/>)
}

export default ProtectedRoutesAdmin