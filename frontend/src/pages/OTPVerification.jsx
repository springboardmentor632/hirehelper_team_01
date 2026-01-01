import React, { useState, useRef } from 'react';
import logo from '../assets/logo.png';
import { verifySignupOtp, resendSignupOtp } from '../utils/api';
import { resetPassword } from '../utils/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') || 'signup'; // 'signup' or 'reset'
    const email = searchParams.get('email') || '';
    
    // Array to hold the 6-digit OTP code
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        const code = otp.join("");

        if (code.length < 6) {
            setError('Please enter the complete OTP');
            return;
        }

        try {
            setLoading(true);
            
            if (type === 'reset') {
                // Password reset OTP verification
                const newPassword = localStorage.getItem('resetPassword');
                const resetEmail = localStorage.getItem('resetEmail') || email;
                
                if (!newPassword) {
                    setError('Password not found. Please try again.');
                    return;
                }

                await resetPassword({ email_id: resetEmail, otp: code, newPassword });
                
                // Clean up storage
                localStorage.removeItem('resetPassword');
                localStorage.removeItem('resetEmail');
                
                alert('Password changed successfully! Please login with your new password.');
                navigate('/login');
            } else {
                // Signup OTP verification
                const pendingEmail = localStorage.getItem('pendingEmail') || email;
                
                if (!pendingEmail) {
                    setError('No email found. Please try again.');
                    return;
                }

                await verifySignupOtp({ email_id: pendingEmail, otp: code });
                localStorage.removeItem('pendingEmail');
                alert('Email verified — you can now log in.');
                navigate('/login');
            }
        } catch (err) {
            setError(err.message || 'OTP verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError('');
        const pendingEmail = localStorage.getItem('pendingEmail') || email;
        
        if (!pendingEmail) {
            setError('No email found. Please try again.');
            return;
        }

        try {
            setLoading(true);
            if (type === 'reset') {
                // For reset, call forgot password again
                const { forgotPassword } = await import('../utils/api');
                await forgotPassword(pendingEmail);
            } else {
                // For signup
                await resendSignupOtp(pendingEmail);
            }
            alert('OTP resent');
        } catch (err) {
            setError(err.message || 'Resend failed');
        } finally {
            setLoading(false);
        }
    };

    const heading = type === 'reset' ? 'Verify OTP' : 'Verify Your Email';
    const description = type === 'reset' 
        ? `We've sent a 6-digit OTP to ${email || 'your email'}.` 
        : 'We\'ve sent a 6-digit code to your email.';

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-app p-4 font-sans">
            {/* Main Card */}
            <div className="bg-bg-highlight p-8 md:p-10 rounded-lg border-[1px] border-action-accept shadow-card flex flex-col items-center w-full max-w-md">
                
                {/* Logo */}
                <div className="w-20 h-20 mb-6 bg-white rounded-md p-2 flex items-center justify-center border border-border-default">
                    <img src={logo} alt="HireHelper Logo" className="w-full h-full object-contain" />
                </div>

                {/* Text Content */}
                <h1 className="text-2xl font-bold text-text-primary mb-2">{heading}</h1>
                <p className="text-text-secondary text-center mb-8">{description}</p>

                {error && (
                    <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}

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
                        disabled={loading}
                        className="w-full py-3 bg-action-accept text-action-decline font-bold text-lg rounded-md transition hover:opacity-90 shadow-md disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Verify Code'}
                    </button>

                    {/* Resend Link */}
                    <p className="mt-6 text-sm text-text-secondary">
                        Didn't receive the OTP? 
                        <button
                            type="button"
                            disabled={loading}
                            className="text-action-link font-semibold ml-1 hover:underline disabled:opacity-50"
                            onClick={handleResend}
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