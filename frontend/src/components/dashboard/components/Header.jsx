import React from 'react';
import { FiLogOut, FiMoon, FiSun } from 'react-icons/fi';

const Header = ({ user, isDarkMode, toggleMode, handleLogout, handleBack }) => (
    <header className="bg-white/80 dark:bg-gray-800/80 shadow-xl backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Hotel Management Dashboard</h1>
            <div className="flex items-center space-x-4">
                <button onClick={toggleMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                    {isDarkMode ? <FiSun size={20} className="text-yellow-400" /> : <FiMoon size={20} className="text-gray-600" />}
                </button>
                <span className="text-gray-600 dark:text-gray-300 font-medium">{user.firstname || 'User'}</span>
                <button
                    onClick={handleBack}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    <FiLogOut className="mr-2" />
                    Back to Admin Panel
                </button>
                
                <button
                    onClick={handleLogout}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    <FiLogOut className="mr-2" />
                    Logout
                </button>
            </div>
        </div>
    </header>
);

export default Header;