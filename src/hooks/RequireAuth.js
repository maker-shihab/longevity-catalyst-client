import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isLoggdIn } from '../services/auth.service';


const RequireAuth = () => {
    const location = useLocation();
    
    // For checking user are logged in or not
    const isLoggedIn  = isLoggdIn();

    return isLoggedIn  ? <Outlet /> : <Navigate to='/login' state={{from: location}} replace />;
};

export default RequireAuth;