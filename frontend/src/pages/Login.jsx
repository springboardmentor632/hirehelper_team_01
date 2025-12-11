import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Assuming the logo file is at src/assets/logo.png relative to the component
import logo from '../assets/logo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Here you would use email and password state to call an API
        console.log('Login attempted with:', { email, password });
    };

    return (
        // Full viewport container with the light green background (bg-app)
        <div className="min-h-screen flex items-center justify-center bg-bg-app p-4 font-sans">

            {/* Main Content Area (Limited Width) */}
            <div className="flex max-w-5xl w-full">

                {/* Left Panel: Branding and Description (Hidden on small screens) */}
                <div className="hidden lg:flex flex-col flex-1 justify-center pr-10">

                    {/* Logo Display */}
                    <div className="w-48 h-48 bg-bg-app flex items-center justify-center mb-4 rounded-full">
                        <img src={logo} alt="HireHelper Logo" className="w-full h-full bg-bg-app object-contain p-4" />
                    </div>

                    <h1 className="text-[3.5rem] font-bold text-action-link justify-center mb-2">
                        HireHelper
                    </h1>

                    <p className="text-base text-text-secondary leading-relaxed max-w-md">
                        HireHelper helps you connect with people around you to get help with tasks and offer your skills.
                    </p>
                </div>

                {/* --- Start: New Wrapper for Right Panel + Help Section --- */}
                <div className="flex flex-col flex-1 max-w-md lg:max-w-none w-full items-center">

                    {/* Right Panel: Login Form Card (bg-highlight and card shadow) */}
                    <div className="bg-bg-highlight p-8 md:p-10 rounded-lg border-[2px] border-action-accept shadow-card flex flex-col items-center w-full max-w-md">

                        {/* Mobile Logo/Branding (Added to match the provided structure) */}
                        <div className="lg:hidden flex flex-col items-center mb-6">
                            <div className="w-24 h-24 bg-bg-surface rounded-md border-[3px] border-brand-primary mb-2">
                                <img src={logo} alt="HireHelper Logo" className="w-full h-full object-contain p-2" />
                            </div>
                            <h1 className="text-h1 font-bold text-brand-primary">HireHelper</h1>
                        </div>

                        <form className="w-full max-w-sm" onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="Email address or phone number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-4 mb-4 border border-border-default rounded-md text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-action-accept"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 mb-4 border border-border-default rounded-md text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-action-accept"
                                required
                            />

                            {/* Log In Button (Primary Action) */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-action-link text-white font-bold text-lg rounded-md mb-3 transition hover:opacity-90"
                            >
                                Log In
                            </button>

                            {/* Forgotten Password link (action-link) */}
                            <a href="#" className="block text-center text-action-link text-sm mb-6 hover:underline">
                                Forgotten password?
                            </a>

                            {/* Create Account Button (Reduced Width & Centered) */}
                            {/* Using max-w-[280px] to make it narrower than w-full */}
                            <Link
                                to="/signup" // Sets the destination URL for the link
                                className="w-full max-w-[280px] py-4 bg-action-accept text-action-decline font-bold text-base rounded-md transition hover:bg-opacity-80 mx-auto block text-center"
                            >
                                Create New HireHelper Account
                            </Link>

                        </form>
                    </div>

                    {/* Help/Learn More Section - MOVED OUTSIDE THE CARD */}
                    <div className="mt-4 text-sm text-text-secondary text-center">
                        <span>Need help?</span>
                        <a href="#" className="text-action-accept font-semibold ml-1 hover:underline">
                            Learn more about HireHelper
                        </a>
                    </div>

                </div>
                {/* --- End: New Wrapper for Right Panel + Help Section --- */}

            </div>
        </div>
    );
};

export default Login;