import { Navigate } from "react-router-dom";


const Protectedroute = ({ children }) => {
    const token = localStorage.getItem('sessionToken');
    console.log(token ? true:false)
    return token ? children : <Navigate to='/login' replace />
}

export default Protectedroute
