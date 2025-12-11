import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your page components
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // Assuming you have a Signup.jsx component

function App() {
  return (
    // BrowserRouter is needed to enable routing throughout the app
    <BrowserRouter>
      <Routes>
        {/* Route for the default/root path, showing the Login page */}
        <Route path="/" element={<Login />} />
        
        {/* Route for the /login path (can redirect to root if desired, or keep separate) */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for the signup page */}
        <Route path="/signup" element={<Signup />} />
        
        {/* Optional: Add a 404 Not Found route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
