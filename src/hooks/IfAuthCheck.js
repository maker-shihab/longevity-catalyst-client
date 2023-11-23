import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from './UseAuth';

const IfAuthCheck = () => {
    const location = useLocation();

    const { isLoggedIn } = useAuth();

    return isLoggedIn
        ? <Navigate to='/dashboard/home' state={{ from: location }} replace />
        : <Outlet />
};

export default IfAuthCheck;