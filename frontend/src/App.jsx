import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your page components
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Import the Loader component (Adjust path if needed)
import Loader from './pages/Loader'; 

function App() {
    // 1. State to control whether the application is loading
    const [isLoading, setIsLoading] = useState(true);

    // 2. useEffect hook to simulate initial setup time (e.g., fetching user data, configuration)
    useEffect(() => {
        // Simulate a load time of 3 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); 

        // Cleanup function to clear the timer
        return () => clearTimeout(timer);
    }, []); // Runs only once on component mount

    return (
        // The main container wrapper, centered on the screen
        <div className="min-h-screen flex items-center justify-center bg-bg-app">
            
            {/* Conditional Rendering: Show Loader while loading, otherwise show the Router */}
            {isLoading ? (
                // Display the custom loader component centered in the viewport
                <Loader />
            ) : (
                // Once loading is complete, display the routed application content
                <BrowserRouter>
                    <Routes>
                        {/* Route for the default/root path, showing the Login page */}
                        <Route path="/" element={<Login />} />
                        
                        {/* Route for the /login path */}
                        <Route path="/login" element={<Login />} />
                        
                        {/* Route for the signup page */}
                        <Route path="/signup" element={<Signup />} />
                        
                        {/* Optional: Add a 404 Not Found route */}
                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    );
}

export default App;