 

import React from "react";
import { FaHotel, FaSignOutAlt, FaUser, FaListAlt, FaSun, FaMoon } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";

const Header = ({ userDetails, setShowBookingsModal, loading, setLoading, setError }) => {
  const navigate = useNavigate();
  const [isDarkMode, toggleMode] = useDarkMode();

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      const isLogout = confirm('Are you sure to logout?');
      if (isLogout) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (err) {
      console.error("handleLogout - Error:", err);
      setError(err.response?.data?.message || "Failed to log out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className={`${isDarkMode ? 'bg-gray-800/90 text-gray-300' : 'bg-gray-200/90 text-gray-800'} backdrop-blur-md shadow-xl sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className={`text-3xl font-bold text-transparent bg-clip-text ${isDarkMode ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'} flex items-center`}>
          <FaHotel className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} /> My Hotel
        </h1>
       
        <div className="flex items-center space-x-4">

       
          <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>

          
            {/* Profile Image and User Name */}
            <div className="flex items-center space-x-2">
              {userDetails?.profileImage ? (
                <img
                  src={userDetails.profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow-md"
                  onError={(e) => console.error("Image load error:", e)}
                />
              ) : (
                <div className={`${isDarkMode ? 'bg-slate-700 text-gray-400' : 'bg-gray-300 text-gray-600'} w-10 h-10 rounded-full flex items-center justify-center border-2 border-blue-500 shadow-md`}>
                  <FaUser size={20} />
                </div>
              )}
              <span className="font-medium">
                {userDetails ? `Hello, ${userDetails.firstname} ${userDetails.lastname}` : "Loading..."}
              </span>
            </div>
          </div>

          <Link
            to="/profile"
            className={`${isDarkMode ? 'text-gray-300 bg-blue-600/90 hover:bg-blue-600 hover:text-white' : 'text-gray-700 bg-blue-500/90 hover:bg-blue-500 hover:text-gray-100'} flex items-center px-4 py-2 rounded-lg transition-all duration-200 shadow-md`}
          >
            <FaUser className="mr-2" /> Profile
          </Link>

          <button
            onClick={() => setShowBookingsModal(true)}
            className={`${isDarkMode ? 'text-gray-300 bg-blue-600/90 hover:bg-blue-600 hover:text-white' : 'text-gray-700 bg-blue-500/90 hover:bg-blue-500 hover:text-gray-100'} flex items-center px-4 py-2 rounded-lg transition-all duration-200 shadow-md`}
          >
            <FaListAlt className="mr-2" /> My Bookings
          </button>

          <button
            onClick={handleLogout}
            className={`${isDarkMode ? 'text-gray-300 bg-red-600/90 hover:bg-red-600 hover:text-white' : 'text-gray-700 bg-red-500/90 hover:bg-red-500 hover:text-gray-100'} flex items-center px-4 py-2 rounded-lg transition-all duration-200 shadow-md`}
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
          <button
          onClick={toggleMode}
          className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} p-2 rounded-full   transition-colors duration-200`}
        >
          {isDarkMode ? <FaSun size={18} className="text-yellow-400" /> : <FaMoon size={18} className="text-gray-600" />}
        </button>
        </div>
      </div>
    </header>
  );
};

export default Header;