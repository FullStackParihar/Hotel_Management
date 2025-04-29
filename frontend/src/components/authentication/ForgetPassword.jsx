// import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      console.log('handleEmailSubmit - Sending email:', email);
      await axios.post("http://localhost:5000/user/forgot", { email });
      setShowOtpForm(true);
      setMessage("OTP sent to your email");
      setError("");
    } catch (error) {
      console.error("handleEmailSubmit - Forgot password error:", error);
      setError(error.response?.data?.message || "Failed to send OTP");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      setError("Please enter OTP and new password");
      return;
    }

    setLoading(true);
    try {
      console.log('handleResetSubmit - Resetting password for:', email);
      await axios.post("http://localhost:5000/user/resetPassword", {
        email,
        otp,
        newPassword,
      });
      setMessage("Password reset successfully! Redirecting to login...");
      setError("");
      setEmail("");
      setOtp("");
      setNewPassword("");
      setShowOtpForm(false);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      console.error("handleResetSubmit - Reset password error:", error);
      setError(error.response?.data?.message || "Failed to reset password");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center flex items-center justify-center">
          <FaKey className="mr-2" aria-hidden="true" />
          {showOtpForm ? "Reset Password" : "Forgot Password"}
        </h2>
        {!showOtpForm ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6" aria-label="Forgot password form">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 py-3 sm:text-sm border border-gray-300 rounded-md placeholder-gray-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
              </div>
            </div>
            {error && (
              <div className="mt-4 text-center text-red-600 font-semibold border border-red-300 rounded-md p-2 bg-red-50">
                {error}
              </div>
            )}
            {message && (
              <div className="mt-4 text-center text-green-600 font-semibold border border-green-300 rounded-md p-2 bg-green-50">
                {message}
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                disabled={loading}
                aria-label="Send OTP"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-6" aria-label="Reset password form">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <div className="mt-1 relative rounded-md">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  maxLength="6"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 sm:text-sm border border-gray-300 rounded-md placeholder-gray-500"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  aria-label="OTP"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative rounded-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 py-3 sm:text-sm border border-gray-300 rounded-md placeholder-gray-500"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  aria-label="New password"
                />
              </div>
            </div>
            {error && (
              <div className="mt-4 text-center text-red-600 font-semibold border border-red-300 rounded-md p-2 bg-red-50">
                {error}
              </div>
            )}
            {message && (
              <div className="mt-4 text-center text-green-600 font-semibold border border-green-300 rounded-md p-2 bg-green-50">
                {message}
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                disabled={loading}
                aria-label="Reset password"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        )}
        <div className="mt-8 text-center">
          <NavLink
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
          >
            Back to Log In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;