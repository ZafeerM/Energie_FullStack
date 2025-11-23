import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoutesMeter = ({children}) => {

    const meterToken = localStorage.getItem('meterToken');
    
    return (meterToken ? children : <Navigate to={'/Login'} replace/>)
}

export default ProtectedRoutesMeter