import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaVenusMars, FaCalendarAlt, FaLock, FaSignOutAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const baseURL = 'http://localhost:6969';

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
      const response = await axios.get(`${baseURL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = response.data.user;
      setUser(userData);
      setFormData({
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        email: userData.email || '',
        phone: userData.phone || '',
        gender: userData.gender || '',
        age: userData.age || '',
      });
    } catch (err) {
      console.error('fetchUser - Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch user details.');
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${baseURL}/user/me`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.error('handleUpdate - Error:', err);
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(`${baseURL}/user/forgot`, { email: user.email });
      setSuccess('OTP sent to your email for password reset.');
      navigate('/reset-password');
    } catch (err) {
      console.error('handlePasswordReset - Error:', err);
      setError(err.response?.data?.message || 'Failed to initiate password reset.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-gray-100 font-sans flex items-center justify-center py-12">
      <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
          <FaUser className="mr-2" /> My Profile
        </h2>

        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 mb-6">
            <p className="text-green-400">{success}</p>
          </div>
        )}

        {user && !loading && (
          <div className="space-y-6">
            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaUser className="text-blue-400 mr-3" />
                  <p>
                    <strong className="text-blue-200">Name:</strong> {user.firstname} {user.lastname}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-blue-400 mr-3" />
                  <p>
                    <strong className="text-blue-200">Email:</strong> {user.email}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-blue-400 mr-3" />
                  <p>
                    <strong className="text-blue-200">Phone:</strong> {user.phone || 'N/A'}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaVenusMars className="text-blue-400 mr-3" />
                  <p>
                    <strong className="text-blue-200">Gender:</strong> {user.gender || 'N/A'}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-blue-400 mr-3" />
                  <p>
                    <strong className="text-blue-200">Age:</strong> {user.age || 'N/A'}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaUser className="text-blue-400 mr-3" />
                  <p>
                    <strong className="text-blue-200">Role:</strong> {user.role}
                  </p>
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
                  >
                    <FaEdit className="mr-2" /> Edit Profile
                  </button>
                  <button
                    onClick={handlePasswordReset}
                    className="flex items-center bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
                  >
                    <FaLock className="mr-2" /> Change Password
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-semibold text-gray-200 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-sm font-semibold text-gray-200 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-200 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <FaPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-semibold text-gray-200 mb-1">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <FaVenusMars className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-semibold text-gray-200 mb-1">
                    Age
                  </label>
                  <div className="relative">
                    <input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="1"
                      max="120"
                      className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md disabled:opacity-50"
                  >
                    <FaSave className="mr-2" /> {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              </form>
            )}
            <button
              onClick={handleLogout}
              className="mt-6 flex items-center bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md w-full justify-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;