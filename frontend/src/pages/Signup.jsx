import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Import the new logo image. Assuming it's saved in your assets folder.
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
        // Add your signup/validation logic here
        console.log('Signup attempted with:', formData);
    };

    return (
        // Full viewport container with the light green background (bg-app)
        <div className="min-h-screen flex items-center justify-center bg-bg-app p-4 font-sans">

            {/* Main Content Area (Limited Width) */}
            <div className="flex max-w-5xl w-full">

                {/* Left Panel: Branding and Description (Hidden on small screens) */}
                <div className="hidden lg:flex flex-col flex-1 justify-center bg-bg-app pr-10">

                    {/* Logo Display - Using bg-bg-surface and rounded-lg to better match the logo container in the image */}
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

                {/* --- Right Panel: Sign Up Form Card --- */}
                {/* Removed max-w-md on the card itself to ensure it expands horizontally based on the form content */}
                <div className="flex-1 bg-bg-highlight p-8 md:p-10 rounded-lg border border-action-accept shadow-card flex flex-col items-center w-full max-w-md lg:max-w-none">

                    {/* Mobile Logo/Branding (Optional) */}
                    <div className="lg:hidden flex flex-col items-center mb-6">
                        <div className="w-24 h-24 bg-bg-surface rounded-md border-[3px] border-brand-primary mb-2">
                            <img src={logo} alt="HireHelper Logo" className="w-full h-full object-contain p-2" />
                        </div>
                        <h1 className="text-h1 font-bold text-brand-primary">HireHelper</h1>
                    </div>

                    {/* Form container: Max width is now applied here to control the content width */}
                    <form className="w-full max-w-sm sm:max-w-md md:max-w-lg" onSubmit={handleSignup}>

                        {/* First Name & Last Name (Side-by-Side) */}
                        <div className="flex space-x-4 mb-4 w-full">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="flex-1 p-3 border border-border-default rounded-md text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-action-accept"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="flex-1 p-3 border border-border-default rounded-md text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-action-accept"
                                required
                            />
                        </div>

                        {/* Full-Width Fields - NOW ALL USE w-full to align perfectly with the combined width of the top two inputs */}
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
                                // w-full ensures alignment with the space-x-4 div above
                                className="w-full p-3 mb-4 border border-border-default rounded-md text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-action-accept"
                                required={field !== 'phoneNumber'}
                            />
                        ))}

                        {/* Create Account Button (Using action-accept for the dark green button) */}
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