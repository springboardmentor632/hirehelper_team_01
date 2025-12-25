import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import { forgotPassword } from '../utils/api';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || '';
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Email not provided. Please go back to login.');
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            // Send password reset request - OTP will be sent to email
            await forgotPassword(email);
            
            // Store password and redirect to OTP verification
            localStorage.setItem('resetPassword', password);
            localStorage.setItem('resetEmail', email);
            navigate(`/otp?type=reset&email=${email}`);
        } catch (err) {
            setError(err.message || 'Failed to process password reset');
        } finally {
            setLoading(false);
        }
    };

    return (
        // Full viewport container with the light green background (bg-app)
        <div className="min-h-screen flex items-center justify-center bg-bg-app p-4 font-sans">

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row max-w-5xl w-full items-center lg:items-center">

                {/* Left Panel: Branding (Hidden on mobile to match your Login ref) */}
                <div className="hidden lg:flex flex-col flex-1 justify-center pr-10">
                    <div className="w-48 h-48 flex items-center justify-center mb-4">
                        <img src={logo} alt="HireHelper Logo" className="w-full h-full object-contain p-4" />
                    </div>

                    <h1 className="text-[3.5rem] font-bold text-action-link mb-2">
                        HireHelper
                    </h1>

                    <p className="text-base text-text-secondary leading-relaxed max-w-md">
                        HireHelper helps you connect with people around you to get help with tasks and offer your skills.
                    </p>
                </div>

                {/* Right Panel Wrapper */}
                <div className="flex flex-col w-full max-w-md lg:max-w-none items-center lg:flex-1">

                    {/* Form Card */}
                    <div className="bg-bg-highlight p-8 md:p-10 rounded-lg border-[2px] border-action-accept shadow-card flex flex-col items-center w-full max-w-md">
                        
                        {/* Mobile Logo Branding */}
                        <div className="lg:hidden flex flex-col items-center mb-6 text-center">
                            <div className="w-24 h-24 mb-2">
                                <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" />
                            </div>
                            <h1 className="text-h1 font-bold text-action-link">HireHelper</h1> 
                        </div>

                        <h2 className="text-2xl font-bold text-text-primary mb-2">Reset Password</h2>
                        {email && <p className="text-sm text-text-secondary mb-6">Email: {email}</p>}
                        
                        {error && (
                            <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <form className="w-full max-w-sm" onSubmit={handlePasswordSubmit}>
                            <input
                                type="password"
                                placeholder="New password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 mb-4 border border-border-default rounded-md text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-action-accept"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-4 mb-6 border border-border-default rounded-md text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-action-accept"
                                required
                            />

                            {/* Continue Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-[#3D5A26] text-white font-bold text-lg rounded-md transition hover:opacity-90 disabled:opacity-50"
                            >
                                {loading ? 'Sending OTP...' : 'Continue'}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ResetPassword;