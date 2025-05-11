import React from "react";
import { FaHotel, FaSignOutAlt, FaUser, FaListAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ userDetails, setShowBookingsModal, loading, setLoading, setError }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("handleLogout - Error:", err);
      setError(err.response?.data?.message || "Failed to log out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-gray-800/90 backdrop-blur-md shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
          <FaHotel className="mr-2 text-blue-400" /> My Hotel
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-300">
            <FaUser className="mr-2 text-blue-400" />
            <span className="font-medium">
              {userDetails ? `${userDetails.firstname} ${userDetails.lastname}` : "Loading..."}
            </span>
          </div>
          <Link
            to="/profile"
            className="flex items-center text-gray-300 hover:text-white bg-blue-600/90 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
          >
            <FaUser className="mr-2" /> Profile
          </Link>
          <button
            onClick={() => setShowBookingsModal(true)}
            className="flex items-center text-gray-300 hover:text-white bg-blue-600/90 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
          >
            <FaListAlt className="mr-2" /> My Bookings
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-300 hover:text-white bg-red-600/90 hover:bg-red-600 px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;