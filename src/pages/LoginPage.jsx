import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock, FiMail } from "react-icons/fi";

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Please enter your email");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'}/login/`,
        { email, password }
      );
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      const msg = err.response?.data?.non_field_errors?.[0]
        || err.response?.data?.detail
        || "Invalid email or password.";
      setLoginError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'}/google-login/`,
        { token: credentialResponse.credential }
      );
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      console.error("Google Sign-In failed:", err);
      setLoginError("Google Sign-In failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-blue-600">✱ LearnPro</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Start your journey with a <span className="text-blue-600">secure login</span>
          </h1>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  placeholder="Enter Email"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${emailError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                />
                <FiMail className="absolute right-3 top-3 text-gray-400" />
              </div>
              {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  placeholder="Create Password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${passwordError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer text-gray-400"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forget Password?
                </Link>
              </div>
            </div>
            {loginError && (
              <p className="text-sm text-red-500 text-center bg-red-50 border border-red-200 rounded-lg py-2 px-4">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login to Learn"}
            </button>
            <div className="flex items-center justify-center gap-4">
              <hr className="w-1/3 border-t border-gray-300" />
              <span className="text-sm text-gray-500">Or continue with email</span>
              <hr className="w-1/3 border-t border-gray-300" />
            </div>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log('Google Login Failed');
                  setLoginError('Google Sign-In failed. Please try again.');
                }}
                theme="filled_blue"
                size="large"
                text="continue_with"
                shape="rectangular"
              />
            </div>
            <p className="text-sm text-center text-gray-600">
              New to LearnPro?{" "}
              <a href="/signup" className="text-blue-600 hover:underline font-medium">
                Sign Up
              </a>
            </p>
            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to the{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms of Service
              </a>{" "}
              applicable to LearnPro and confirm you have read our{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 bg-blue-50 items-center justify-center p-8">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Morgan Gibbs"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-medium">Morgan Gibbs</h4>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              I completed LearnPro’s Web Development course and had a great experience. It covered
              core technologies like HTML, CSS, JavaScript. The instructors were clear, and
              recorded sessions made it easy to revisit fast-paced parts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
