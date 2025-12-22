import React, { useState, useRef } from 'react';
import logo from '../assets/logo.png'; // Ensure path is correct
import { verifySignupOtp, resendSignupOtp } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    // Array to hold the 6-digit OTP code
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input automatically
        if (element.value !== "" && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move to previous input on backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        const code = otp.join("");
        const email_id = localStorage.getItem('pendingEmail');
        if (!email_id) return alert('No pending email found');
        try {
            await verifySignupOtp({ email_id, otp: code });
            // on success, remove pending and navigate to login
            localStorage.removeItem('pendingEmail');
            alert('Email verified — you can now log in.');
            navigate('/login');
        } catch (err) {
            alert(err.message || 'OTP verification failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-app p-4 font-sans">
            {/* Main Card */}
            <div className="bg-bg-highlight p-8 md:p-10 rounded-lg border-[1px] border-action-accept shadow-card flex flex-col items-center w-full max-w-md">
                
                {/* Logo */}
                <div className="w-20 h-20 mb-6 bg-white rounded-md p-2 flex items-center justify-center border border-border-default">
                    <img src={logo} alt="HireHelper Logo" className="w-full h-full object-contain" />
                </div>

                {/* Text Content */}
                <h1 className="text-2xl font-bold text-text-primary mb-2">Verify Your Email</h1>
                <p className="text-text-secondary text-center mb-8">
                    We've sent a 6-digit code to your email.
                </p>

                {/* Verification Form */}
                <form onSubmit={handleVerify} className="w-full flex flex-col items-center">
                    
                    {/* OTP Inputs */}
                    <div className="flex justify-between w-full mb-8 gap-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-full h-12 border border-border-default rounded-md text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-action-accept bg-white text-text-primary"
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-action-accept text-action-decline font-bold text-lg rounded-md transition hover:opacity-90 shadow-md"
                    >
                        Verify Code
                    </button>

                    {/* Resend Link */}
                    <p className="mt-6 text-sm text-text-secondary">
                        Didn't receive the OTP? 
                        <button
                            type="button"
                            className="text-action-link font-semibold ml-1 hover:underline"
                            onClick={async () => {
                                const email_id = localStorage.getItem('pendingEmail');
                                if (!email_id) return alert('No pending email found');
                                try {
                                    await resendSignupOtp(email_id);
                                    alert('OTP resent');
                                } catch (err) {
                                    alert(err.message || 'Resend failed');
                                }
                            }}
                        >
                            Resend
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmail;