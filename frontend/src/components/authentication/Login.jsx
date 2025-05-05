import { NavLink, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all the fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:6969/user/login", formData);
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("token", res.data.token);
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLogin");
    if (isLoggedIn) {
      // Redirect based on role stored in localStorage or fetch user data
      const token = localStorage.getItem("token");
      // You might need to fetch user role from the backend using the token
      // For now, assuming role-based redirection happens after login
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      <div className="relative bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-sm border border-gray-700/50">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full -top-48 -left-48 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full -bottom-48 -right-48 blur-3xl"></div>
        </div>

        {/* Form Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center justify-center gap-2">
            <FaSignInAlt className="text-indigo-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Login</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-center text-sm text-red-400 font-medium bg-red-500/10 border border-red-500/30 rounded-lg p-2">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-3">
            <NavLink to="/forget-pass" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
              Forgot Password?
            </NavLink>
            <div className="text-sm">
              <span className="text-gray-400">Don't have an account? </span>
              <NavLink to="/sign-up" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";
//    import axios from "axios";
//    import { useNavigate } from "react-router-dom";
//    import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

//    const Login = () => {
//      const navigate = useNavigate();
//      const [formData, setFormData] = useState({
//        email: "",
//        password: "",
//        role: "user", // Default to user role
//      });
//      const [error, setError] = useState("");
//      const [loading, setLoading] = useState(false);

//      const baseURL = "http://localhost:6969";

//      const handleChange = (e) => {
//        setFormData({ ...formData, [e.target.name]: e.target.value });
//      };

//      const handleSubmit = async (e) => {
//        e.preventDefault();
//        setLoading(true);
//        setError("");
//        try {
//          const response = await axios.post(`${baseURL}/api/users/login`, formData);
//          const { token } = response.data;

//          // Store token in localStorage
//          localStorage.setItem("token", token);

//          // Redirect based on role
//          if (formData.role === "admin") {
//            navigate("/admin");
//          } else {
//            navigate("/user");
//          }
//        } catch (err) {
//          console.error("Login Error:", err);
//          setError(err.response?.data?.message || "Login failed. Please try again.");
//        } finally {
//          setLoading(false);
//        }
//      };

//      return (
//        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
//          <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md">
//            <h2 className="text-3xl font-bold text-center text-blue-300 mb-6 flex items-center justify-center">
//              <FaSignInAlt className="mr-2" /> Login
//            </h2>
//            {error && (
//              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 mb-6 text-center text-red-400">
//                {error}
//              </div>
//            )}
//            <form onSubmit={handleSubmit} className="space-y-6">
//              <div>
//                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
//                  Email
//                </label>
//                <div className="relative">
//                  <input
//                    id="email"
//                    name="email"
//                    type="email"
//                    value={formData.email}
//                    onChange={handleChange}
//                    required
//                    className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
//                    placeholder="Enter your email"
//                  />
//                  <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
//                </div>
//              </div>
//              <div>
//                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
//                  Password
//                </label>
//                <div className="relative">
//                  <input
//                    id="password"
//                    name="password"
//                    type="password"
//                    value={formData.password}
//                    onChange={handleChange}
//                    required
//                    className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
//                    placeholder="Enter your password"
//                  />
//                  <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
//                </div>
//              </div>
//              <div>
//                <label htmlFor="role" className="block text-sm font-medium text-gray-200 mb-2">
//                  Role
//                </label>
//                <select
//                  id="role"
//                  name="role"
//                  value={formData.role}
//                  onChange={handleChange}
//                  className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
//                >
//                  <option value="user">User</option>
//                  <option value="admin">Admin</option>
//                </select>
//              </div>
//              <button
//                type="submit"
//                disabled={loading}
//                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-900/50 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//              >
//                {loading ? (
//                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mx-auto"></div>
//                ) : (
//                  <>
//                    <FaSignInAlt className="mr-2" /> Login
//                  </>
//                )}
//              </button>
//            </form>
//          </div>
//        </div>
//      );
//    };

//    export default Login;