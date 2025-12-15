import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        console.log('Signup attempted with:', formData);
    };

    return (
        // Full viewport container: Ensures vertical and horizontal centering of all content
        <div className="min-h-screen flex items-center justify-center bg-bg-app p-4 font-sans">

            {/* Main Content Area (Limited Width) */}
            <div className="flex flex-col lg:flex-row max-w-5xl w-full items-center lg:items-center">

                {/* Left Panel: Branding and Description (Hidden below LG breakpoint) */}
                <div className="hidden lg:flex flex-col flex-1 justify-center pr-10">

                    {/* Logo Display (Desktop) - Transparent background, no border */}
                    <div className="w-48 h-48 flex items-center justify-center mb-4 rounded-full">
                        <img src={logo} alt="HireHelper Logo" className="w-full h-full object-contain p-4" />
                    </div>

                    <h1 className="text-[3.5rem] font-bold text-action-link justify-center mb-2">
                        HireHelper
                    </h1>

                    <p className="text-base text-text-secondary leading-relaxed max-w-md">
                        HireHelper helps you connect with people around you to get help with tasks and offer your skills.
                    </p>
                </div>

                {/* --- Right Panel: Sign Up Form Card Container (Centered on Mobile) --- */}
                <div className="bg-bg-highlight p-8 md:p-10 rounded-lg border border-action-accept shadow-card flex flex-col items-center w-full max-w-sm lg:max-w-none">
                    
                    {/* Mobile Logo/Branding - Visible below LG breakpoint */}
                    <div className="lg:hidden flex flex-col items-center mb-6">
                        <div className="w-24 h-24 rounded-full mb-2">
                            <img src={logo} alt="HireHelper Logo" className="w-full h-full object-contain p-2" />
                        </div>
                        {/* FIX APPLIED HERE: Changed text-brand-primary to text-action-link */}
                        <h1 className="text-h1 font-bold text-action-link">HireHelper</h1>
                    </div>
                    
                    {/* Form container: W-FULL ensures inputs align perfectly with card padding */}
                    <form className="w-full" onSubmit={handleSignup}> 
                        
                        {/* First Name & Last Name (Responsive Collapse at LG) */}
                        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 space-x-0 lg:space-x-3 mb-3 w-full"> 
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="flex-1 p-3.5 border border-border-default rounded-md text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-action-accept shadow-sm"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="flex-1 p-3.5 border border-border-default rounded-md text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-action-accept shadow-sm"
                                required
                            />
                        </div>

                        {/* Full-Width Fields - Align perfectly due to w-full */}
                        {['email', 'phoneNumber', 'password', 'confirmPassword'].map((field) => (
                            <input
                                key={field}
                                type={field.includes('password') ? 'password' : field.includes('email') ? 'email' : 'text'}
                                name={field}
                                placeholder={field === 'phoneNumber' ? 'Phone Number (Optional)' :
                                             field === 'confirmPassword' ? 'Confirm Password' :
                                             field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full p-3.5 mb-3 border border-border-default rounded-md text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-action-accept shadow-sm"
                                required={field !== 'phoneNumber'}
                            />
                        ))}

                        {/* Create Account Button (Primary Action) */}
                        <button
                            type="submit"
                            className="w-full py-4 bg-action-accept text-action-decline font-bold text-lg rounded-md transition hover:opacity-90 mt-4"
                        >
                            Create Account
                        </button>

                    </form>

                    {/* Already have an account? Link */}
                    <div className="mt-6 text-sm text-text-secondary text-center">
                        Already have an account?
                        <Link to="/login" className="text-action-link font-semibold ml-1 hover:underline">
                            Log In
                        </Link>
                    </div>
                </div>
                {/* --- End: Right Panel --- */}

            </div>
        </div>
    );
};

export default Signup;