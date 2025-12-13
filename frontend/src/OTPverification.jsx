import React, { useState, useRef, useEffect } from 'react';
import { Mail, RefreshCcw } from 'lucide-react';

const OTPverification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState('');

  const inputRefs = useRef(otp.map(() => React.createRef()));

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    const newOtp = [...otp];

    if (value.length > 1) {
      const pastedDigits = value.split('').filter(char => /^\d$/.test(char));
      let filledCount = 0;
      for (let i = 0; i < pastedDigits.length && index + i < newOtp.length; i++) {
        newOtp[index + i] = pastedDigits[i];
        filledCount++;
      }
      setOtp(newOtp);
      const nextIndex = Math.min(index + filledCount, newOtp.length - 1);
      if (inputRefs.current[nextIndex] && inputRefs.current[nextIndex].current) {
        inputRefs.current[nextIndex].current.focus();
      }
      return;
    }

    if (value === '' || /^\d$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < otp.length - 1) {
        if (inputRefs.current[index + 1] && inputRefs.current[index + 1].current) {
          inputRefs.current[index + 1].current.focus();
        }
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        const prevIndex = index - 1;
        event.preventDefault();
        
        const newOtp = [...otp];
        newOtp[prevIndex] = '';
        setOtp(newOtp);

        if (inputRefs.current[prevIndex] && inputRefs.current[prevIndex].current) {
          inputRefs.current[prevIndex].current.focus();
        }
      }
    }
  };

  const handleVerify = () => {
    setMessage('');
    setIsVerifying(true);
    const code = otp.join('');

    setTimeout(() => {
      setIsVerifying(false);
      if (code.length === 6 && /^\d{6}$/.test(code)) {
        setMessage({ type: 'success', text: `Verification successful! Code: ${code}` });
      } else {
        setMessage({ type: 'error', text: 'Please enter a complete 6-digit code.' });
      }
    }, 1500);
  };

  const handleResend = () => {
    setMessage('');
    setOtp(['', '', '', '', '', '']);
    if (inputRefs.current[0] && inputRefs.current[0].current) {
      inputRefs.current[0].current.focus();
    }

    setTimeout(() => {
      setMessage({ type: 'info', text: 'A new OTP has been sent to your email.' });
    }, 500);
  };

  useEffect(() => {
    if (inputRefs.current[0] && inputRefs.current[0].current) {
      inputRefs.current[0].current.focus();
    }
  }, []);
  
  const isOtpComplete = otp.every(digit => digit !== '' && /^\d$/.test(digit));

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #dcfce7; /* green-100 */
        }
        
        .app-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          box-sizing: border-box;
        }

        .card {
          width: 100%;
          max-width: 450px;
          padding: 2.5rem;
          background-color: rgba(187, 247, 208, 0.9); /* green-200 with opacity */
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .logo-circle {
          padding: 1rem;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .title {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          color: #166534; /* green-800 */
          margin: 0 0 0.5rem 0;
        }

        .subtitle {
          text-align: center;
          font-size: 0.875rem;
          color: #16a34a; /* green-600 */
          margin: 0 0 2rem 0;
        }

        .otp-inputs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .otp-field {
          width: 2.75rem;
          height: 3.5rem;
          text-align: center;
          font-size: 1.25rem;
          font-family: monospace;
          border: 2px solid #86efac; /* green-300 */
          border-radius: 0.5rem;
          background-color: white;
          outline: none;
          transition: all 0.2s;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
        }

        .otp-field:focus {
          border-color: #16a34a; /* green-600 */
          box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.5); /* ring effect */
        }
        
        @media (min-width: 768px) {
          .otp-inputs { gap: 0.75rem; }
          .otp-field { width: 3rem; height: 3.75rem; font-size: 1.5rem; }
        }

        .verify-btn {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.75rem;
          font-weight: 600;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          font-size: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .verify-btn:disabled {
          background-color: #86efac; /* Lighter green */
          cursor: not-allowed;
          opacity: 0.8;
          box-shadow: none;
        }

        .verify-btn:not(:disabled) {
          background-color: #15803d; /* green-700 */
        }

        .verify-btn:not(:disabled):hover {
          background-color: #14532d; /* green-900 */
        }

        .verify-btn:not(:disabled):active {
          transform: scale(0.98);
        }

        .spinner {
          animation: spin 1s linear infinite;
          height: 1.25rem;
          width: 1.25rem;
          margin-right: 0.75rem;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .message {
          margin-top: 1rem;
          padding: 0.75rem;
          border-radius: 0.5rem;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .message.success { background-color: #dcfce7; color: #15803d; }
        .message.error { background-color: #fee2e2; color: #b91c1c; }
        .message.info { background-color: #dbeafe; color: #1d4ed8; }

        .resend-container {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: #15803d;
        }

        .resend-btn {
          background: none;
          border: none;
          color: #15803d;
          font-weight: 600;
          text-decoration: underline;
          text-decoration-style: dashed;
          cursor: pointer;
          padding: 0 0 0 0.25rem;
          display: inline-flex;
          align-items: center;
          font-family: inherit;
        }

        .resend-btn:hover {
          color: #14532d;
        }
      `}</style>

      <div className="app-wrapper">
        <div className="card">
          
          <div className="logo-container">
            <div className="logo-circle">
              <Mail size={32} color="#16a34a" />
            </div>
          </div>

          <h1 className="title">Verify Your Email</h1>
          <p className="subtitle">We've sent a 6-digit code to your email.</p>

          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs.current[index]}
                type="tel"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otp-field"
                onKeyPress={(e) => {
                  if (!/^\d$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={!isOtpComplete || isVerifying}
            className="verify-btn"
          >
            {isVerifying ? (
              <>
                <svg className="spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </button>

          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="resend-container">
            <span>Didn't receive the OTP?</span>
            <button onClick={handleResend} className="resend-btn">
              <RefreshCcw size={12} style={{ marginRight: '4px' }} />
              Resend
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default OTPverification;