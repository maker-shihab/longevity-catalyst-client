import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isLoggdIn } from '../services/auth.service';

const IfAuthCheck = () => {
    const location = useLocation();

    const isLoggedIn = isLoggdIn();

    return isLoggedIn
        ? <Navigate to='/user/dashboard' state={{ from: location }} replace />
        : <Outlet /> 
};

export default IfAuthCheck;