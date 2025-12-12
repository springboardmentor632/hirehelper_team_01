import React from 'react';
// Assuming the logo is accessible via this path
import logo from '../assets/logo.png'; 

const LogoRingLoader = () => {
    return (
        // Outer container uses the lighter shade background (bg-highlight)
        <div className="flex flex-col items-center justify-center p-8 bg-bg-app w-fit rounded-lg ">
            
            {/* Logo and Spinner Container: Controls the total size and centers the content */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                
                {/* 1. The Spinning Ring (The Loader) */}
                <div 
                    // Positioning: Absolute to sit under the logo, filling the entire container space (w-full h-full)
                    // Styling: Uses theme colors (action-accept for spinner, border-default for static base)
                    // Animation: animate-spin (standard Tailwind animation)
                    className="absolute w-full h-full rounded-full border-4 border-border-default border-t-action-accept animate-spin"
                ></div>

                {/* 2. The Static, Centered Logo */}
                <img 
                    src={logo} 
                    alt="HireHelper Logo" 
                    // Sizing: Smaller than the container (w-24 h-24) to leave space for the ring
                    // Shaping: Rounded-full to ensure it's round
                    // Background: bg-bg-surface (White) to make the logo colors stand out
                    className="w-24 h-24 object-contain rounded-full p-2 bg-bg-surface z-10" 
                />
            </div>
            
            <p className="mt-4 text-text-secondary">Loading HireHelper...</p>
        </div>
    );
};

export default LogoRingLoader;