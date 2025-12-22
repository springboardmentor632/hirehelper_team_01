import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../utils/api';
import logo from '../assets/logo.png';

const Signup = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // confirmPassword removed to match User.js schema
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const userData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email_id: formData.email.trim().toLowerCase(),
            phone_number: formData.phoneNumber,
            password: formData.password,
        };

        try {
            await signupUser(userData);
            localStorage.setItem('pendingEmail', userData.email_id);
            navigate('/otp');
        } catch (err) {
            alert(err.message || 'Signup failed.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-app p-4 font-sans">
            <div className="flex flex-col lg:flex-row max-w-5xl w-full items-center lg:items-center">

                {/* Left Panel: Branding */}
                <div className="hidden lg:flex flex-col flex-1 justify-center pr-10">
                    <div className="w-48 h-48 flex items-center justify-center mb-4 rounded-full">
                        <img src={logo} alt="HireHelper Logo" className="w-full h-full object-contain p-4" />
                    </div>
                    <h1 className="text-[3.5rem] font-bold text-action-link mb-2">HireHelper</h1>
                    <p className="text-base text-text-secondary max-w-md">
                        HireHelper helps you connect with people around you to get help with tasks and offer your skills.
                    </p>
                </div>

                {/* Right Panel: Signup Card */}
                <div className="bg-bg-highlight p-8 md:p-10 rounded-lg border border-action-accept shadow-card flex flex-col items-center w-full max-w-sm lg:max-w-none">
                    
                    <div className="lg:hidden flex flex-col items-center mb-6">
                        <img src={logo} alt="Logo" className="w-24 h-24 object-contain p-2 mb-2" />
                        <h1 className="text-h1 font-bold text-action-link">HireHelper</h1>
                    </div>
                    
                    <form className="w-full" onSubmit={handleSignup}> 
                        {/* Name Row */}
                        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 mb-3 w-full"> 
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="flex-1 p-3.5 border border-border-default rounded-md focus:ring-2 focus:ring-action-accept"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="flex-1 p-3.5 border border-border-default rounded-md focus:ring-2 focus:ring-action-accept"
                                required
                            />
                        </div>

                        {/* email_id, phone_number, and password */}
                        {['email', 'phoneNumber', 'password'].map((field) => (
                            <input
                                key={field}
                                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                                name={field}
                                placeholder={field === 'phoneNumber' ? 'Phone Number' : field.charAt(0).toUpperCase() + field.slice(1)}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full p-3.5 mb-3 border border-border-default rounded-md focus:ring-2 focus:ring-action-accept"
                                required
                            />
                        ))}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 bg-action-accept text-action-decline font-bold text-lg rounded-md mt-4 ${isSubmitting ? 'opacity-50' : 'hover:opacity-90'}`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 text-sm text-text-secondary text-center">
                        Already have an account?
                        <Link to="/login" className="text-action-link font-semibold ml-1 hover:underline">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;