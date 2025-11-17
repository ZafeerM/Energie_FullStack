import { Navigate } from "react-router-dom";


const ProtectedRoutesDash = ({children}) => {
    const token = localStorage.getItem('sessionToken');
    return token ? children : <Navigate to='/Login' replace />
}

export default ProtectedRoutesDash;