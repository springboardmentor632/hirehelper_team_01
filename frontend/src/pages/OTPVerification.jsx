import React, { useState, useRef, useEffect } from 'react';
import { Mail, RefreshCcw } from 'lucide-react';

const App = () => {
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
        .custom-bg {
          background-color: #c9f5a8;
        }
        .custom-card {
          background-color: #dcfccf;
          border: 1px solid rgba(62, 86, 34, 0.1);
        }
        .custom-btn {
          background-color: #3e5622;
          color: white;
        }
        .custom-btn:hover:not(:disabled) {
          background-color: #2d4018;
        }
        .custom-btn:disabled {
          background-color: #3e5622;
          opacity: 0.8;
          cursor: not-allowed;
        }
        .custom-input:focus {
          border-color: #3e5622;
          box-shadow: 0 0 0 1px #3e5622;
        }
        .custom-text-primary {
          color: #3e5622;
        }
      `}</style>
      
      {/* Updated container to use custom-bg class */}
      <div className="min-h-screen flex items-center justify-center custom-bg p-4 font-sans">
        <div 
          // Updated card to use custom-card class
          className="w-full max-w-md p-8 custom-card rounded-lg shadow-xl transition-all duration-300"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          
          {/* Logo/Icon Area */}
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white rounded-full shadow-sm">
              {/* Using custom text color class */}
              <Mail className="h-8 w-8 custom-text-primary" />
            </div>
          </div>

          {/* Title and Subtitle */}
          <h1 className="text-2xl font-bold text-center text-black mb-2">
            Verify Your Email
          </h1>
          <p className="text-center text-sm text-gray-600 mb-8">
            We've sent a 6-digit code to your email.
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-center space-x-2 md:space-x-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs.current[index]}
                type="tel"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                // Applied custom-input class for focus states
                className="custom-input w-10 h-12 md:w-12 md:h-14 text-center text-xl font-mono border border-gray-300 rounded-md 
                           outline-none transition-all duration-200 bg-white shadow-sm appearance-none text-gray-800"
                onKeyPress={(e) => {
                  if (!/^\d$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            ))}
          </div>

          {/* Verification Button */}
          <button
            onClick={handleVerify}
            disabled={!isOtpComplete || isVerifying}
            // Applied custom-btn class
            className={`custom-btn w-full py-3 rounded-md font-semibold transition-all duration-300 shadow-sm flex justify-center items-center text-sm
              ${isOtpComplete && !isVerifying ? 'active:scale-[0.99]' : ''}
            `}
          >
            {isVerifying ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </button>

          {/* Message Display (Success/Error/Info) */}
          {message && (
            <div 
              className={`mt-4 p-3 rounded-md text-center font-medium shadow-sm text-xs
                ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : ''}
                ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' : ''}
                ${message.type === 'info' ? 'bg-blue-50 text-blue-700 border border-blue-100' : ''}
              `}
            >
              {message.text}
            </div>
          )}

          {/* Resend Link */}
          <div className="mt-6 text-center text-xs text-gray-600">
            <span className="text-gray-500">Didn't receive the OTP? </span>
            <button
              onClick={handleResend}
              className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-600 transition duration-150 focus:outline-none ml-1"
            >
              Resend
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;