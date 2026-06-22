import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Verification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [remainingTime, setRemainingTime] = useState(60);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifyError('');
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setVerifyError('Please enter a valid 6-digit OTP.');
      return;
    }

    setVerifying(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'}/verify-email/`,
        { otp: otpCode }
      );
      alert('Email verified successfully. You can now login.');
      navigate('/login');
    } catch (err) {
      setVerifyError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setVerifyError('Missing email — please sign up again.');
      return;
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'}/resend-verify-email/`,
        { email }
      );
      setRemainingTime(60);
      alert('A new verification code has been sent.');
    } catch (err) {
      setVerifyError(err.response?.data?.error || 'Failed to resend code.');
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    navigate('/enroll'); // Redirect to Enroll Page after Google login
  };

  const handleGoogleLoginError = () => {
    console.log('Google login failed');
  };

  // Styles
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  };

  const leftStyle = {
    flex: 1,
    padding: '2rem',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const rightStyle = {
    flex: 1,
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4285f4',
    marginBottom: '2rem',
  };

  const headingStyle = {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333',
  };

  const subHeadingStyle = {
    color: '#666',
    marginBottom: '2rem',
  };

  const otpContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '1.5rem',
  };

  const otpInputStyle = {
    width: '50px',
    height: '55px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1.2rem',
    textAlign: 'center',
    padding: '0',
    marginRight: '8px',
    outline: 'none',
  };

  const timerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    color: '#666',
  };

  const resendLinkStyle = {
    color: '#4285f4',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const verifyButtonStyle = {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '1rem',
  };

  const dividerStyle = {
    textAlign: 'center',
    margin: '1rem 0',
    color: '#666',
  };

  const googleButtonStyle = {
    marginBottom: '1rem',
  };

  const loginTextStyle = {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#666',
  };

  const linkStyle = {
    color: '#4285f4',
    textDecoration: 'none',
  };

  const termsTextStyle = {
    fontSize: '0.9rem',
    color: '#666',
    marginTop: '2rem',
    textAlign: 'center',
  };

  const rightImageStyle = {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '8px',
    marginBottom: '2rem',
  };

  const testimonialStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const testimonialAvatarStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
  };

  const testimonialContentStyle = {
    margin: '0',
  };

  const testimonialHeadingStyle = {
    margin: '0 0 0.5rem 0',
    color: '#333',
  };

  const testimonialParagraphStyle = {
    margin: '0',
    color: '#666',
    fontSize: '0.9rem',
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}>
        <div style={logoStyle}>✱ LearnPro</div>
        <h1 style={headingStyle}>Let's Get you Back to Learning!</h1>
        <p style={subHeadingStyle}>Enter Your Verification Code</p>
        <form onSubmit={handleVerify}>
          <div style={otpContainerStyle}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                style={{
                  ...otpInputStyle,
                  borderColor: digit ? '#4285f4' : '#ccc',
                }}
              />
            ))}
          </div>
          <div style={timerContainerStyle}>
            <span>
              Remaining Time: 00:{remainingTime < 10 ? `0${remainingTime}` : remainingTime}s
            </span>
            <span
              style={resendLinkStyle}
              onClick={remainingTime === 0 ? handleResendCode : null}
            >
              {remainingTime === 0 ? 'Resend code' : "Didn't receive code?"}
            </span>
          </div>
          {verifyError && (
            <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '1rem' }}>{verifyError}</p>
          )}
          <button type="submit" style={verifyButtonStyle} disabled={verifying}>
            {verifying ? 'Verifying...' : 'Verify'}
          </button>
        </form>
        <div style={dividerStyle}>Or continue with email</div>
        <div style={googleButtonStyle}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            theme="filled_blue"
            size="large"
          />
        </div>
        <p style={loginTextStyle}>
          Already have an account? <Link to="/login" style={linkStyle}>Login</Link>
        </p>
        <p style={termsTextStyle}>
          By continuing, you agree to the{' '}
          <a href="#" style={linkStyle}>
            Terms of Service
          </a>{' '}
          applicable to LearnPro and confirm you read our{' '}
          <a href="#" style={linkStyle}>
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <div style={rightStyle}>
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
          alt="People learning"
          style={rightImageStyle}
        />
        <div style={testimonialStyle}>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Morgan Gibbs"
            style={testimonialAvatarStyle}
          />
          <div style={testimonialContentStyle}>
            <h4 style={testimonialHeadingStyle}>Morgan Gibbs</h4>
            <p style={testimonialParagraphStyle}>
              I completed LearnPro's Web Development course and had a great experience. It covered
              core technologies like HTML, CSS, JavaScript. The instructors were clear, and
              recorded sessions made it easy to revisit fast-paced parts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
