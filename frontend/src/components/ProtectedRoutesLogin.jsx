import { Navigate } from "react-router-dom";


const ProtectedRoutesLogin = ({children}) => {
    const token = localStorage.getItem('sessionToken');
    return token ? <Navigate to='/Dashboard' replace /> : children;
}

export default ProtectedRoutesLogin;