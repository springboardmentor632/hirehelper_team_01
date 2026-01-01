import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTPVerification from "./pages/OTPVerification";
import ResetPassword from "./pages/ResetPage";
import Feed from "./pages/feed";
import MyTasks from "./pages/MyTasks";
import MyAddTask from "./pages/AddTask";
import Loader from './pages/Loader'; 
import Requests from './pages/Requests';
import MyRequests from './pages/MyRequests';
import ProfileSettings from './pages/ProfileSettings';

// Components & Helpers
import Layout from './components/Layout'; // New Layout Component
import ProtectedRoute from './utils/ProtectedRoute';
import PublicRoute from './utils/PublicRoute'; 

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); 
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-app">
                <Loader />
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* ONLY FOR LOGGED-OUT USERS */}
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/otp" element={<OTPVerification />} />
                    <Route path="/reset" element={<ResetPassword />} />
                </Route>

                {/* ONLY FOR LOGGED-IN USERS (With Static Sidebar) */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/mytasks" element={<MyTasks />} />
                        <Route path="/addtask" element={<MyAddTask />} />
                        <Route path="/requests" element={<Requests />} />
                        <Route path="/myrequests" element={<MyRequests />} />
                        <Route path="/profile" element={<ProfileSettings />} />
                        <Route path="/settings" element={<ProfileSettings />} />
                    </Route>
                </Route>

                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;