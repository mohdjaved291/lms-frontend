import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from './image/logo.png';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    password: '',
    confirm_password: '',
    role: 'student',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    const trimmed = {
      full_name: formData.full_name.trim(),
      email: formData.email.trim(),
      phone_number: formData.phone_number.trim(),
      date_of_birth: formData.date_of_birth.trim(),
      password: formData.password.trim(),
      confirm_password: formData.confirm_password.trim(),
    };
    if (!trimmed.full_name || !trimmed.email || !trimmed.phone_number || !trimmed.date_of_birth || !trimmed.password || !trimmed.confirm_password) {
      alert("Please fill in all fields.");
      return;
    }
    if (trimmed.password !== trimmed.confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'}/register/`,
        { ...trimmed, role: formData.role }
      );
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      const data = err.response?.data;
      const msg = data
        ? Object.values(data).flat().join(' ')
        : 'Registration failed. Please try again.';
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'}/google-login/`,
        { token: credentialResponse.credential }
      );
      localStorage.setItem('accessToken', res.data.access);
      localStorage.setItem('refreshToken', res.data.refresh);
      navigate('/home');
    } catch (err) {
      alert("Google Sign-In failed");
    }
  };

  return (
    <>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          .signup-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #ffffff;
          }
          .signup-box {
            display: flex;
            width: 100%;
            max-width: 1400px;
            height: 100vh;

          }
          .form-section {
            flex: 1;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .logo-container {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
          }
          .logo-container h1 {
            font-size: 28px;
            font-weight: 600;
            color: #4F46E5;
          }
          .form-section h3 {
            margin-bottom: 30px;
            font-size: 28px;
            font-weight: 400;
            color: #333;
            line-height: 1.4;
          }
          .highlight {
            color: #4F46E5;
            font-weight: 500;
          }
          .signup-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .form-group {
            display: flex;
            gap: 20px;
          }
          .form-group input {
            flex: 1;
            padding: 14px 16px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
          }
          .form-group input:focus {
            border-color: #4F46E5;
          }
          .input-wrapper,
          .password-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .input-wrapper label,
          .password-wrapper label {
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
          }
          .password-wrapper {
            position: relative;
          }
          .password-wrapper input {
            padding-right: 45px;
          }
          .eye-icon {
            position: absolute;
            right: 14px;
            bottom: 14px;
            cursor: pointer;
            color: #9ca3af;
            font-size: 18px;
          }
          .signup-btn {
            width: 100%;
            max-width: 280px;
            padding: 14px;
            background: #4F46E5;
            color: white;
            border-radius: 8px;
            border: none;
            margin: 20px auto 0;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s;
            display: block;
          }
          .signup-btn:hover {
            background: #4338CA;
          }
          .divider {
            text-align: center;
            margin: 20px auto;
            font-size: 14px;
            color: #6b7280;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            max-width: 280px;
            width: 100%;
          }
          .divider::before,
          .divider::after {
            content: '';
            flex: 1;
            height: 1px;
            background: #d1d5db;
          }
          .google-btn {
            width: 100%;
            max-width: 280px;
            margin: 0 auto;
            padding: 2px;
            background: transparent;
            border-radius: 8px;
            display: flex;
            justify-content: center;
          }
          .google-btn > div {
            width: 100% !important;
          }
          .terms,
          .login-text {
            text-align: center;
            margin-top: 20px;
            font-size: 13px;
            color: #6b7280;
          }
          .terms b,
          .login-text b {
            color: #111827;
          }
          .login-text a {
            color: #4F46E5;
            text-decoration: none;
          }
          .login-text a:hover {
            text-decoration: underline;
          }
          /* Image Section */
          .image-section {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            background: #f8fafc;
          }
          .vertical-blue-bar {
            position: absolute;
            width: 90px;
            height: 120%;
            background: #4F46E5;
            left: 43%;
            z-index: 1;
          }
          .image-card {
            width: 450px;
            height: 520px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 12px;
            z-index: 2;
            position: relative;
          }
          .image-card img:not(.center-logo) {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 40px;
          }
          .image-card img:nth-child(1) {
            border-top-left-radius: 80px;
          }
          .image-card img:nth-child(2) {
            border-top-right-radius: 80px;
          }
          .image-card img:nth-child(3) {
            border-bottom-left-radius: 80px;
          }
          .image-card img:nth-child(4) {
            border-bottom-right-radius: 80px;
          }
          .center-logo {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70px;
            height: 70px;
            border-radius: 20px;
            padding: 15px;
            background: white;
            z-index: 10;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
          /* Responsive */
          @media (max-width: 1024px) {
            .signup-box {
              flex-direction: column;
            }
            .image-section {
              display: none;
            }
            .form-section {
              padding: 30px;
            }
          }
          @media (max-width: 768px) {
            .form-group {
              flex-direction: column;
              gap: 15px;
            }
            .signup-btn,
            .google-btn {
              max-width: 100%;
            }
          }
        `}
      </style>
      <div className="signup-container">
        <div className="signup-box">
          {/* Form Section */}
          <div className="form-section">
                  <div className="logo-container">
                    <span className="logo-icon"><img src={logo} alt='logo'></img></span>
                    <h1>LearnPro</h1>
                  </div>
            <h3>
              Start your journey with a <span className="highlight">sign up</span> to learn.
            </h3>
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-wrapper">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-wrapper">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone_number"
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-wrapper">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="password-wrapper">
                  <label>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                  {showPassword ? (
                    <FaEyeSlash className="eye-icon" onClick={() => setShowPassword(false)} />
                  ) : (
                    <FaEye className="eye-icon" onClick={() => setShowPassword(true)} />
                  )}
                </div>
                <div className="password-wrapper">
                  <label>Confirm Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    placeholder="Confirm your password"
                    onChange={handleChange}
                  />
                  {showConfirmPassword ? (
                    <FaEyeSlash className="eye-icon" onClick={() => setShowConfirmPassword(false)} />
                  ) : (
                    <FaEye className="eye-icon" onClick={() => setShowConfirmPassword(true)} />
                  )}
                </div>
              </div>
              {formError && (
                <p style={{ color: '#dc2626', fontSize: '13px', textAlign: 'center' }}>{formError}</p>
              )}
              <button className="signup-btn" type="submit" disabled={submitting}>
                {submitting ? 'Signing up...' : 'Sign up to Learn'}
              </button>
              <div className="divider">Or continue with</div>
              <div className="google-btn">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => console.log("Login Failed")}
                  theme="filled_blue"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                />
              </div>
            </form>
            <p className="terms">
              By continuing, you agree to the <b>Terms of Service</b> and confirm you read our <b>Privacy Policy</b>.
            </p>
            <p className="login-text">
              Already on LearnPro? <Link to="/login"><b>Login</b></Link>
            </p>
          </div>
          {/* Image Section */}
          <div className="image-section">
            <div className="vertical-blue-bar"></div>
            <div className="image-card">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 1" />
              <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="User 2" />
              <img src="https://randomuser.me/api/portraits/men/36.jpg" alt="User 3" />
              <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="User 4" />
              <img src={logo} alt="LearnPro Logo" className="center-logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
