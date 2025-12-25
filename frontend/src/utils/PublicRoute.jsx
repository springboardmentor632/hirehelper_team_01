import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const isAuthenticated = localStorage.getItem('token'); 

    // If already logged in, redirect to feed
    // Otherwise, allow access to Login/Signup (Outlet)
    return isAuthenticated ? <Navigate to="/feed" replace /> : <Outlet />;
};

export default PublicRoute;