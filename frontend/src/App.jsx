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

// Helpers
import ProtectedRoute from './utils/ProtectedRoute';
import PublicRoute from './utils/PublicRoute'; // Import the new guard

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-app">
            {isLoading ? (
                <Loader />
            ) : (
                <BrowserRouter>
                    <Routes>
                        
                        {/* ONLY FOR LOGGED-OUT USERS */}
                        {/* If user tries to go here while logged in, they get sent to /feed */}
                        <Route element={<PublicRoute />}>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/otp" element={<OTPVerification />} />
                            <Route path="/reset" element={<ResetPassword />} />
                        </Route>

                        {/* ONLY FOR LOGGED-IN USERS */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/feed" element={<Feed />} />
                            <Route path="/mytasks" element={<MyTasks />} />
                            <Route path="/addtask" element={<MyAddTask />} />
                            <Route path="/requests" element={<Requests />} />
                            <Route path="/myrequests" element={<MyRequests />} />
                            <Route path="/profile" element={<ProfileSettings />} />
                            <Route path="/settings" element={<ProfileSettings />} />
                        </Route>

                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    );
}

export default App;