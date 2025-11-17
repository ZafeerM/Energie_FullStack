import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Import pages from Components
import LoginPage from './components/LoginPage'
import DashboardPage from './components/DashboardPage'
import ProtectedRoutesDash from './components/ProtectedRoutesDash'
import ProtectedRoutesLogin from './components/ProtectedRoutesLogin'
import Meterreader from './components/Meterreader'

function App() {
  // localStorage.removeItem('sessionToken');
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/Login' replace />}></Route>
          <Route path='/Login' element={<ProtectedRoutesLogin><LoginPage /></ProtectedRoutesLogin>}></Route>
          <Route path='/Dashboard' element={<ProtectedRoutesDash><DashboardPage /></ProtectedRoutesDash>}></Route>
        
          {/* Temporary */}
          <Route path='/Meterreader' element={<Meterreader />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
