// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { NavLink, useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     otp: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     if (!formData.email || !formData.password || !formData.otp) {
//       alert("Please fill the data");
//       return;
//     }
//     try {
//       const res = await axios.post(
//         "http://localhost:6969/user/login",
//         formData
//       );
//       alert("login successfully...");
//       localStorage.setItem("isLogin", true);
//       navigate("/user");
//       handleSubmit();
//       console.log(res.data.token);
//       const token = res.data.token;
//       localStorage.setItem("token", token);
//     } catch (error) {
//       console.log("Error submitting data:", error);
//       alert(error.response.data.message);
//     }

//     setFormData({
//       email: "",
//       password: "",
//       otp: "",
//     });
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">LogIn</h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Your Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="******"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Otp</label>
//           <input
//             type="password"
//             name="otp"
//             placeholder="******"
//             value={formData.otp}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </form>

//       <div className="flex justify-between py-5">
//         <NavLink to="/forget-pass">
//           <button className="text-blue-900">Forget Password</button>
//         </NavLink>
//         <NavLink to="/reset-pass">
//           <button className="text-blue-900">Reset Password</button>
//         </NavLink>
//       </div>

//       <button
//         // type="submit"
//         onClick={handleSubmit}
//         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//       >
//         Submit
//       </button>
//       <NavLink to="/sign-up">
//         <button className="w-full mt-5 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200">
//           ?signUp
//         </button>
//       </NavLink>
//     </div>
//   );
// };

// export default Login;import React, { useState, useEffect } from "react";import axios from "axios";
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