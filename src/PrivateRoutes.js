import { Navigate, Outlet } from 'react-router-dom'
import { auth } from "../src/components/firebaseConfig";


const PrivateRoutes = () => {
const isAuthenticated = auth.currentUser !== null;

return (
    isAuthenticated ? <Outlet/> : <Navigate to='/'/>
  )
}

export default PrivateRoutes;