 

import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiHome, FiBook, FiUsers, FiDollarSign, FiMap, FiMapPin, FiLogOut, FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Base API URL
const API_URL = 'http://localhost:6969/api';

 
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

 
export const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-indigo-900 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-700">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <button onClick={toggleSidebar} className="lg:hidden">
            <FiMenu size={24} />
          </button>
        </div>
        <nav className="mt-4">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FiHome className="mr-3" size={20} />
            Home
          </NavLink>
          <NavLink
            to="/dashboard/bookings"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FiBook className="mr-3" size={20} />
            Bookings
          </NavLink>
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FiUsers className="mr-3" size={20} />
            Users
          </NavLink>
          <NavLink
            to="/dashboard/revenue"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FiDollarSign className="mr-3" size={20} />
            Revenue
          </NavLink>
          <NavLink
            to="/dashboard/rooms"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FiHome className="mr-3" size={20} />
            Rooms
          </NavLink>
          <NavLink
            to="/dashboard/states"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FiMap className="mr-3" size={20} />
            States
          </NavLink>
          <NavLink
            to="/dashboard/cities"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FiMapPin className="mr-3" size={20} />
            Cities
          </NavLink>
          <NavLink
            to="/dashboard/hotels"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <FiHome className="mr-3" size={20} />
            Hotels
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="lg:hidden mr-4">
                <FiMenu size={24} className="text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                {darkMode ? <FiSun size={20} className="text-yellow-400" /> : <FiMoon size={20} className="text-gray-600" />}
              </button>
              <span className="text-gray-600 dark:text-gray-300">Admin</span>
              <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200">
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Home Tab (Widgets)
export const HomeTab = () => {
  const [quickStats, setQuickStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuickStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/quick-stats');
        setQuickStats(response.data);
      } catch (err) {
        setError('Failed to fetch quick stats. Please try again later.');
        console.error('Error fetching quick stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuickStats();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;
  }

  if (!quickStats) {
    return <div className="text-center text-gray-600 dark:text-gray-300">No data available.</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Bookings Widget */}
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate('/admin/dashboard/bookings')}
        >
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900 rounded-full">
            <FiBook className="text-indigo-600 dark:text-indigo-400" size={28} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Bookings</h3>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{quickStats.bookings?.total || 0}</p>
          </div>
        </div>
        {/* Users Widget */}
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate('/admin/dashboard/users')}
        >
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-full">
            <FiUsers className="text-green-600 dark:text-green-400" size={28} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Users</h3>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {(quickStats.users?.active || 0) + (quickStats.users?.inactive || 0)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Active: {quickStats.users?.active || 0}</p>
          </div>
        </div>
        {/* Revenue Widget */}
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate('/admin/dashboard/revenue')}
        >
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-full">
            <FiDollarSign className="text-yellow-600 dark:text-yellow-400" size={28} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Revenue</h3>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">₹{quickStats.revenue || 0}</p>
          </div>
        </div>
        {/* Rooms Widget */}
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate('/admin/dashboard/rooms')}
        >
          <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-full">
            <FiHome className="text-purple-600 dark:text-purple-400" size={28} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Rooms</h3>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{quickStats.rooms?.totalRooms || 0}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Available: {quickStats.rooms?.availableRooms || 0}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* States Widget */}
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate('/admin/dashboard/states')}
        >
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900 rounded-full">
            <FiMap className="text-indigo-600 dark:text-indigo-400" size={28} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">States</h3>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{quickStats.states || 0}</p>
          </div>
        </div>
        {/* Cities Widget */}
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate('/admin/dashboard/cities')}
        >
          <div className="p-4 bg-teal-50 dark:bg-teal-900 rounded-full">
            <FiMapPin className="text-teal-600 dark:text-teal-400" size={28} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Cities</h3>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{quickStats.cities || 0}</p>
          </div>
        </div>
        {/* Hotels Widget */}
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate('/admin/dashboard/hotels')}
        >
          <div className="p-4 bg-red-50 dark:bg-red-900 rounded-full">
            <FiHome className="text-red-600 dark:text-red-400" size={28} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Hotels</h3>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{quickStats.hotels || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Bookings Tab
export const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/bookingss', {
          params: { status: activeSubTab === 'all' ? undefined : activeSubTab },
        });
        console.log('Bookings response:', response.data); 
        
        // Handle the case where the response is an object with a bookings property
        if (response.data && response.data.bookings && Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
        } else if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          throw new Error('Invalid bookings data structure');
        }
      } catch (err) {
        setError('Failed to fetch bookings. Please try again later.');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [activeSubTab]);

  if (loading) {
    return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Bookings</h2>
      {/* Sub-tabs */}
      <div className="flex space-x-4 mb-6">
        {['all', 'checkins', 'cancelled', 'approved', 'new'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              activeSubTab === tab
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {tab === 'all' ? 'All Bookings' : tab === 'checkins' ? 'Check-ins' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      {/* Bookings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto backdrop-blur-sm bg-opacity-90">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Hotel</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Room</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Check-in</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Check-out</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {bookings.length > 0 ? (
              bookings.map(booking => (
                <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{booking.userId?.name || booking.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{booking.roomId?.hotel?.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{booking.roomId?.roomNumber || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{new Date(booking.checkIn).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{new Date(booking.checkOut).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'approved'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Users Tab
export const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/userss');
        console.log('Users response:', response.data); 
        
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Users</h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto backdrop-blur-sm bg-opacity-90">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">role</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.firstname } {user.lastname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.role }</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.isDisabled
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                        : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                        
            
                    }`}
                  >
                    {user.isDisabled ? 'Inactive' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Revenue Tab
export const RevenueTab = () => {
  const [revenueDetails, setRevenueDetails] = useState(null);
  const [revenueTrends, setRevenueTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoading(true);
        setError(null);
        const [detailsResponse, trendsResponse] = await Promise.all([
          api.get('/revenue'),
          api.get('/revenue-trends'),
        ]);
        setRevenueDetails(detailsResponse.data);
        setRevenueTrends(trendsResponse.data);
      } catch (err) {
        setError('Failed to fetch revenue details. Please try again later.');
        console.error('Error fetching revenue:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRevenue();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;
  }

  if (!revenueDetails) {
    return <div className="text-center text-gray-600 dark:text-gray-300">No data available.</div>;
  }

  // Prepare chart data
  const chartData = {
    labels: revenueTrends.map(trend => trend.date),
    datasets: [
      {
        label: 'Revenue (₹)',
        data: revenueTrends.map(trend => trend.revenue),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue Trends (Last 30 Days)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Revenue (₹)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Revenue</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-opacity-90">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Revenue Summary</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">₹{revenueDetails.totalRevenue || 0}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Total Bookings: {revenueDetails.totalBookings || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-opacity-90">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Revenue Trends (Last 30 Days)</h3>
          <div className="w-full h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Rooms Tab
export const RoomsTab = () => {
  const [roomStats, setRoomStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/rooms');
        setRoomStats(response.data);
      } catch (err) {
        setError('Failed to fetch room stats. Please try again later.');
        console.error('Error fetching rooms:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;
  }

  if (!roomStats) {
    return <div className="text-center text-gray-600 dark:text-gray-300">No data available.</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center backdrop-blur-sm bg-opacity-90">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Total Rooms</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{roomStats.totalRooms || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center backdrop-blur-sm bg-opacity-90">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Available Rooms</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{roomStats.availableRooms || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center backdrop-blur-sm bg-opacity-90">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Busy Rooms</h3>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">{roomStats.busyRooms || 0}</p>
        </div>
      </div>
    </div>
  );
};

// States Tab
export const StatesTab = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/states');
        setStates(response.data);
      } catch (err) {
        setError('Failed to fetch states. Please try again later.');
        console.error('Error fetching states:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">States</h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto backdrop-blur-sm bg-opacity-90">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {states.map(state => (
              <tr key={state._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{state.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Cities Tab
export const CitiesTab = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/cities');
        console.log('Cities data:', response.data);  
        setCities(response.data);
      } catch (err) {
        setError('Failed to fetch cities. Please try again later.');
        console.error('Error fetching cities:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Cities</h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto backdrop-blur-sm bg-opacity-90">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">State</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {cities.map(city => (
              <tr key={city._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{city.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{city.state?.name || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Hotels Tab
export const HotelsTab = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/hotels');
        setHotels(response.data);
      } catch (err) {
        setError('Failed to fetch hotels. Please try again later.');
        console.error('Error fetching hotels:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Hotels</h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto backdrop-blur-sm bg-opacity-90">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">City</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {hotels.map(hotel => (
              <tr key={hotel._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{hotel.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{hotel.city?.name || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

 
export const dashboardRoutes = [
  {
    index: true,  
    element: <HomeTab />,
  },
  {
    path: 'bookings',
    element: <BookingsTab />,
  },
  {
    path: 'users',
    element: <UsersTab />,
  },
  {
    path: 'revenue',
    element: <RevenueTab />,
  },
  {
    path: 'rooms',
    element: <RoomsTab />,
  },
  {
    path: 'states',
    element: <StatesTab />,
  },
  {
    path: 'cities',
    element: <CitiesTab />,
  },
  {
    path: 'hotels',
    element: <HotelsTab />,
  },
];

export default AdminDashboard;