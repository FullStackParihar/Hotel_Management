 


// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate, Outlet, useOutletContext } from 'react-router-dom';
// import axios from 'axios';
// import { FiHome, FiUser, FiUsers, FiBook, FiMap, FiMapPin, FiKey, FiTag, FiLogOut, FiMenu, FiMoon, FiSun } from 'react-icons/fi';

 
// const API_URL = 'http://localhost:6969/';
// const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// api.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config; 
//     },
//     error => Promise.reject(error)
// );
// const UserDashboard = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [darkMode, setDarkMode] = useState(false);
//     const [user, setUser] = useState(null); 
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 setLoading(true);
//                 const response = await api.get('user/me'); // Fetch current user, not all users
//                 setUser(response.data); // Expecting a single user object
//                 console.log('User data:', response.data);
//             } catch (err) {
//                 setError('Failed to fetch user details. Please log in again.');
//                 console.error('Error fetching user:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUser();
//     }, []);

//     // Add a useEffect to log user state after it updates
//     useEffect(() => {
//         if (user) {
//             console.log('Updated user state:', user);
//         }
//     }, [user]);

//     const toggleSidebar = () => {
//         setSidebarOpen(!sidebarOpen);
//     };

//     const toggleDarkMode = () => {
//         setDarkMode(!darkMode);
//         document.documentElement.classList.toggle('dark');
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/login');
//     };

//     if (loading) {
//         return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
//     }

//     if (error) {
//         return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;
//     }

//     if (!user) {
//         return <div className="text-center text-gray-600 dark:text-gray-300">No user data available.</div>;
//     }

//     const isAdmin = user.role === 'admin';

//     return (
//         <div className={`flex min-h-screen ${darkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-700' : 'bg-gradient-to-br from-gray-100 to-gray-300'} transition-colors duration-500`}>
//             {/* Sidebar */}
//             <aside
//                 className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-900 to-blue-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//                     } lg:translate-x-0 lg:static lg:inset-0 shadow-xl rounded-r-2xl backdrop-blur-md bg-opacity-90`}
//             >
//                 <div className="flex items-center justify-between p-6 border-b border-indigo-600">
//                     <h2 className="text-2xl font-extrabold tracking-tight">Hotel Dashboard</h2>
//                     <button onClick={toggleSidebar} className="lg:hidden">
//                         <FiMenu size={24} className="text-indigo-200 hover:text-white transition-colors duration-200" />
//                     </button>
//                 </div>
//                 <nav className="mt-6 space-y-2 px-4">
//                     <NavLink
//                         to=""
//                         end
//                         className={({ isActive }) =>
//                             `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
//                             }`
//                         }
//                         onClick={() => setSidebarOpen(false)}
//                     >
//                         <FiHome className="mr-3" size={20} />
//                         Overview
//                     </NavLink>
//                     <NavLink
//                         to="profile"
//                         className={({ isActive }) =>
//                             `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
//                             }`
//                         }
//                         onClick={() => setSidebarOpen(false)}
//                     >
//                         <FiUser className="mr-3" size={20} />
//                         My Profile
//                     </NavLink>
//                     {isAdmin && ( // Only show Users tab to admins
//                         <NavLink
//                             to="users"
//                             className={({ isActive }) =>
//                                 `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
//                                 }`
//                             }
//                             onClick={() => setSidebarOpen(false)}
//                         >
//                             <FiUsers className="mr-3" size={20} />
//                             Users
//                         </NavLink>
//                     )}
//                     <NavLink
//                         to="bookings"
//                         className={({ isActive }) =>
//                             `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
//                             }`
//                         }
//                         onClick={() => setSidebarOpen(false)}
//                     >
//                         <FiBook className="mr-3" size={20} />
//                         Bookings
//                     </NavLink>
//                     <NavLink
//                         to="states"
//                         className={({ isActive }) =>
//                             `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
//                             }`
//                         }
//                         onClick={() => setSidebarOpen(false)}
//                     >
//                         <FiMap className="mr-3" size={20} />
//                         States
//                     </NavLink>
//                     <NavLink
//                         to="cities"
//                         className={({ isActive }) =>
//                             `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
//                             }`
//                         }
//                         onClick={() => setSidebarOpen(false)}
//                     >
//                         <FiMapPin className="mr-3" size={20} />
//                         Cities
//                     </NavLink>
//                     <NavLink
//                         to="hotels"
//                         className={({ isActive }) =>
//                             `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
//                             }`
//                         }
//                         onClick={() => setSidebarOpen(false)}
//                     >
//                         <FiHome className="mr-3" size={20} />
//                         Hotels
//                     </NavLink>
//                     <NavLink
//                         to="rooms"
//                         className={({ isActive }) =>
//                             `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
//                             }`
//                         }
//                         onClick={() => setSidebarOpen(false)}
//                     >
//                         <FiKey className="mr-3" size={20} />
//                         Rooms
//                     </NavLink>
//                     <NavLink
//                         to="coupons"
//                         className={({ isActive }) =>
//                             `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
//                             }`
//                         }
//                         onClick={() => setSidebarOpen(false)}
//                     >
//                         <FiTag className="mr-3" size={20} />
//                         Coupons
//                     </NavLink>
//                 </nav>
//             </aside>

//             {/* Main Content */}
//             <div className="flex-1 flex flex-col">
//                 {/* Header */}
//                 <header className="bg-white/80 dark:bg-gray-800/80 shadow-xl backdrop-blur-lg">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//                         <div className="flex items-center">
//                             <button onClick={toggleSidebar} className="lg:hidden mr-4">
//                                 <FiMenu size={24} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors duration-200" />
//                             </button>
//                             <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Hotel Management Dashboard</h1>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                             <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
//                                 {darkMode ? <FiSun size={20} className="text-yellow-400" /> : <FiMoon size={20} className="text-gray-600" />}
//                             </button>
//                             <span className="text-gray-600 dark:text-gray-300 font-medium">{user.firstname || 'User'}</span>
//                             <button
//                                 onClick={handleLogout}
//                                 className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
//                             >
//                                 <FiLogOut className="mr-2" />
//                                 Logout
//                             </button>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Main Content */}
//                 <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                     <Outlet context={{ user, isAdmin }} />
//                 </main>
//             </div>
//         </div>
//     );
// };

// const OverviewTab = () => {
//     const { user, isAdmin } = useOutletContext();
//     const [stats, setStats] = useState({ bookings: 0,  hotels: 0, locations: 0, coupons: 0 });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 setLoading(true);
//                 const [bookingsRes, hotelsRes, locationsRes, couponsRes] = await Promise.all([
//                     api.get(isAdmin ? 'api/bookings/' : 'api/bookings/'),
//                     api.get('api/hotels'),
//                     api.get('api/states'),
//                     api.get('api/coupons/'),
//                 ]);
//                 setStats({
//                     bookings: bookingsRes.data.length,
//                     hotels: hotelsRes.data.length,
//                     locations: locationsRes.data.length,
//                     coupons: couponsRes.data.length,
//                 });
//                 console.log
//             } catch (err) {
//                 setError('Failed to fetch overview stats.');
//                 console.error('Error fetching stats:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchStats();
//     }, [isAdmin]);

//     if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
//     if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

//     return (
//         <div>
//             <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Overview</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50">
//                     <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full">
//                         <FiBook className="text-indigo-600 dark:text-indigo-400" size={28} />
//                     </div>
//                     <div>
//                         <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Bookings</h3>
//                         <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats.bookings}</p>
//                     </div>
//                 </div>
//                 <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50">
//                     <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full">
//                         <FiHome className="text-green-600 dark:text-green-400" size={28} />
//                     </div>
//                     <div>
//                         <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Hotels</h3>
//                         <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats.hotels}</p>
//                     </div>
//                 </div>
//                 <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50">
//                     <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-full">
//                         <FiMap className="text-yellow-600 dark:text-yellow-400" size={28} />
//                     </div>
//                     <div>
//                         <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Locations</h3>
//                         <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats.locations}</p>
//                     </div>
//                 </div>
//                 <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50">
//                     <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
//                         <FiTag className="text-purple-600 dark:text-purple-400" size={28} />
//                     </div>
//                     <div>
//                         <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Available Coupons</h3>
//                         <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats.coupons}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Profile Tab - Updated to show all users
// const ProfileTab = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 setLoading(true);
//                 const response = await api.get('/user/getAllUsers'); // Using the same endpoint as UsersTab
//                 console.log("response.data:", response.data);
//                 const usersData = Array.isArray(response.data) ? response.data : response.data.userData || [];
//                 setUsers(usersData);
//             } catch (err) {
//                 setError('Failed to fetch users. Please check your permissions or try again.');
//                 console.error('Error fetching users:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUsers();
//     }, []);

//     if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
//     if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

//     return (
//         <div>
//             <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">All Users</h2>
//             <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-100/80 dark:bg-gray-700/80">
//                         <tr>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
//                         {users.length > 0 ? (
//                             users.map(user => (
//                                 <tr key={user._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
//                                     <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
//                                         {user.firstname} {user.lastname}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.email}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.role}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="3" className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">
//                                     No users found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// const UsersTab = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 setLoading(true);
//                 const response = await api.get('/user/getAllUsers'); // Use the api instance
//                 console.log("response.data:", response.data);
//                 // Adjust based on the actual response structure
//                 // If response.data is an array, use it directly
//                 // If response.data is an object like { userData: [...] }, use response.data.userData
//                 const usersData = Array.isArray(response.data) ? response.data : response.data.userData || [];
//                 setUsers(usersData);
//             } catch (err) {
//                 setError('Failed to fetch users. Please check your permissions or try again.');
//                 console.error('Error fetching users:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUsers();
//     }, []);

//     if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
//     if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

//     return (
//         <div>
//             <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Users</h2>
//             <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-100/80 dark:bg-gray-700/80">
//                         <tr>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
//                         {users.length > 0 ? (
//                             users.map(user => (
//                                 <tr key={user._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
//                                     <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
//                                         {user.firstname} {user.lastname}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.email}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.role}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="3" className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">
//                                     No users found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// const BookingsTab = () => {
//     const { user, isAdmin } = useOutletContext();
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 setLoading(true);
//                 const endpoint = isAdmin ? '/api/bookings/' : '/api/bookings/';

//                 const response = await api.get(endpoint);
//                 setBookings(response.data.bookings);
//                 console.log("booking------------------", response.data.bookings)
//             } catch (err) {
//                 setError('Failed to fetch bookings.');
//                 console.error('Error fetching bookings:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchBookings();
//     }, [isAdmin]);

//     if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
//     if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

//     return (
//         <div>
//             <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Bookings</h2>
//             <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-100/80 dark:bg-gray-700/80">
//                         <tr>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Booking ID</th>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Hotel</th>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Check-in</th>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Check-out</th>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
//                         {bookings.map(booking => (
//                             <tr key={booking._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{booking._id}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{booking.roomId?.hotel?.name || 'N/A'}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
//                                     {new Date(booking.checkIn).toLocaleDateString()}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
//                                     {new Date(booking.checkOut).toLocaleDateString()}
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{booking.status}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// // Locations Tab
// const LocationsTab = () => {
//     const [locations, setLocations] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchLocations = async () => {
//             try {
//                 setLoading(true);
//                 const response = await api.get('/locations/all');
//                 setLocations(response.data.bookings);
//             } catch (err) {
//                 setError('Failed to fetch locations.');
//                 console.error('Error fetching locations:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchLocations();
//     }, []);

//     if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
//     if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

//     return (
//         <div>
//             <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Locations</h2>
//             <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-100/80 dark:bg-gray-700/80">
//                         <tr>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Address</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
//                         {locations.map(location => (
//                             <tr key={location._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{location.name}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{location.address || 'N/A'}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// // States Tab
// const StatesTab = () => {
//     const [states, setStates] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchStates = async () => {
//             try {
//                 setLoading(true);
//                 const response = await api.get('api/states');
//                 setStates(response.data);
//             } catch (err) {
//                 setError('Failed to fetch states.');
//                 console.error('Error fetching states:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchStates();
//     }, []);

//     if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
//     if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

//     return (
//         <div>
//             <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">States</h2>
//             <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-100/80 dark:bg-gray-700/80">
//                         <tr>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
//                         {states.map(state => (
//                             <tr key={state._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{state.name}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// // Cities Tab
// const CitiesTab = () => {
//     const [states, setStates] = useState([]);
//     const [selectedState, setSelectedState] = useState('');
//     const [cities, setCities] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchStates = async () => {
//             try {
//                 setLoading(true);
//                 const response = await api.get('api/states');
//                 setStates(response.data);
//                 if (response.data.length > 0) {
//                     setSelectedState(response.data[0]._id);
//                 }
//             } catch (err) {
//                 setError('Failed to fetch states.');
//                 console.error('Error fetching states:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchStates();
//     }, []);

//     useEffect(() => {
//         if (selectedState) {
//             const fetchCities = async () => {
//                 try {
//                     setLoading(true);
//                     const response = await api.get(`/api/states/${selectedState}/cities`);
//                     setCities(response.data);
//                 } catch (err) {
//                     setError('Failed to fetch cities.');
//                     console.error('Error fetching cities:', err);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchCities();
//         }
//     }, [selectedState]);

//     if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
//     if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

//     return (
//         <div>
//             <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Cities</h2>
//             <div className="mb-6">
//                 <label className="block text-gray-700 dark:text-gray-300 mb-2">Select State</label>
//                 <select
//                     value={selectedState}
//                     onChange={e => setSelectedState(e.target.value)}
//                     className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
//                 >
//                     {states.map(state => (
//                         <option key={state._id} value={state._id}>
//                             {state.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-100/80 dark:bg-gray-700/80">
//                         <tr>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
//                         {cities.map(city => (
//                             <tr key={city._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{city.name}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// // Hotels Tab
// const HotelsTab = () => {
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [selectedState, setSelectedState] = useState('');
//     const [selectedCity, setSelectedCity] = useState('');
//     const [hotels, setHotels] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchStates = async () => {
//             try {
//                 setLoading(true);
//                 const response = await api.get('api/states');
//                 setStates(response.data);
//                 if (response.data.length > 0) {
//                     setSelectedState(response.data[0]._id);
//                 }
//             } catch (err) {
//                 setError('Failed to fetch states.');
//                 console.error('Error fetching states:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchStates();
//     }, []);

//     useEffect(() => {
//         if (selectedState) {
//             const fetchCities = async () => {
//                 try {
//                     setLoading(true);
//                     const response = await api.get(`/api/states/${selectedState}/cities`);
//                     setCities(response.data);
//                     if (response.data.length > 0) {
//                         setSelectedCity(response.data[0]._id);
//                     } else {
//                         setSelectedCity('');
//                         setHotels([]);
//                     }
//                 } catch (err) {
//                     setError('Failed to fetch cities.');
//                     console.error('Error fetching cities:', err);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchCities();
//         }
//     }, [selectedState]);

//     useEffect(() => {
//         if (selectedCity) {
//             const fetchHotels = async () => {
//                 try {
//                     setLoading(true);
//                     const response = await api.get(`api/cities/${selectedCity}/hotels`);
//                     setHotels(response.data);
//                 } catch (err) {
//                     setError('Failed to fetch hotels.');
//                     console.error('Error fetching hotels:', err);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchHotels();
//         }
//     }, [selectedCity]);

//     const fetchAllHotels = async () => {
//         try {
//             setLoading(true);
//             const response = await api.get('api/hotels');
//             setHotels(response.data);
//             setSelectedState('');
//             setSelectedCity('');
//         } catch (err) {
//             setError('Failed to fetch all hotels.');
//             console.error('Error fetching hotels:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
//     if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

//     return (
//         <div>
//             <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Hotels</h2>
//             <div className="mb-6 flex space-x-4">
//                 <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Select State</label>
//                     <select
//                         value={selectedState}
//                         onChange={e => setSelectedState(e.target.value)}
//                         className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
//                     >
//                         <option value="">Select State</option>
//                         {states.map(state => (
//                             <option key={state._id} value={state._id}>
//                                 {state.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Select City</label>
//                     <select
//                         value={selectedCity}
//                         onChange={e => setSelectedCity(e.target.value)}
//                         className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
//                         disabled={!selectedState}
//                     >
//                         <option value="">Select City</option>
//                         {cities.map(city => (
//                             <option key={city._id} value={city._id}>
//                                 {city.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <button
//                     onClick={fetchAllHotels}
//                     className="mt-8 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
//                 >
//                     View All Hotels
//                 </button>
//             </div>
//             <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-100/80 dark:bg-gray-700/80">
//                         <tr>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
//                         {hotels.map(hotel => (
//                             <tr key={hotel._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{hotel.name}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// // Rooms Tab
// const RoomsTab = () => {
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [hotels, setHotels] = useState([]);
//     const [selectedState, setSelectedState] = useState('');
//     const [selectedCity, setSelectedCity] = useState('');
//     const [selectedHotel, setSelectedHotel] = useState('');
//     const [rooms, setRooms] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchStates = async () => {
//             try {
//                 setLoading(true);
//                 const response = await api.get('api/states');
//                 setStates(response.data);
//                 if (response.data.length > 0) {
//                     setSelectedState(response.data[0]._id);
//                 }
//             } catch (err) {
//                 setError('Failed to fetch states.');
//                 console.error('Error fetching states:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchStates();
//     }, []);

//     useEffect(() => {
//         if (selectedState) {
//             const fetchCities = async () => {
//                 try {
//                     setLoading(true);
//                     const response = await api.get(`/api/states/${selectedState}/cities`);
//                     setCities(response.data);
//                     if (response.data.length > 0) {
//                         setSelectedCity(response.data[0]._id);
//                     } else {
//                         setSelectedCity('');
//                         setHotels([]);
//                         setRooms([]);
//                     }
//                 } catch (err) {
//                     setError('Failed to fetch cities.');
//                     console.error('Error fetching cities:', err);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchCities();
//         }
//     }, [selectedState]);

//     useEffect(() => {
//         if (selectedCity) {
//             const fetchHotels = async () => {
//                 try {
//                     setLoading(true);
//                     const response = await api.get(`/api/cities/${selectedCity}/hotels`);
//                     setHotels(response.data);
//                     if (response.data.length > 0) {
//                         setSelectedHotel(response.data[0]._id);
//                     } else {
//                         setSelectedHotel('');
//                         setRooms([]);
//                     }
//                 } catch (err) {
//                     setError('Failed to fetch hotels.');
//                     console.error('Error fetching hotels:', err);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchHotels();
//         }
//     }, [selectedCity]);

//     useEffect(() => {
//         if (selectedHotel) {
//             const fetchRooms = async () => {
//                 try {
//                     setLoading(true);
//                     const response = await api.get(`/api/${selectedHotel}/rooms`);
//                     setRooms(response.data);
//                 } catch (err) {
//                     setError('Failed to fetch rooms.');
//                     console.error('Error fetching rooms:', err);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchRooms();
//         }
//     }, [selectedHotel]);

//     if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
//     if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

//     return (
//         <div>
//             <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Rooms</h2>
//             <div className="mb-6 flex space-x-4">
//                 <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Select State</label>
//                     <select
//                         value={selectedState}
//                         onChange={e => setSelectedState(e.target.value)}
//                         className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
//                     >
//                         <option value="">Select State</option>
//                         {states.map(state => (
//                             <option key={state._id} value={state._id}>
//                                 {state.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Select City</label>
//                     <select
//                         value={selectedCity}
//                         onChange={e => setSelectedCity(e.target.value)}
//                         className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
//                         disabled={!selectedState}
//                     >
//                         <option value="">Select City</option>
//                         {cities.map(city => (
//                             <option key={city._id} value={city._id}>
//                                 {city.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 dark:text-gray-300 mb-2">Select Hotel</label>
//                     <select
//                         value={selectedHotel}
//                         onChange={e => setSelectedHotel(e.target.value)}
//                         className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
//                         disabled={!selectedCity}
//                     >
//                         <option value="">Select Hotel</option>
//                         {hotels.map(hotel => (
//                             <option key={hotel._id} value={hotel._id}>
//                                 {hotel.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//             <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-100/80 dark:bg-gray-700/80">
//                         <tr>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Room Number</th>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Type</th>
//                             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Price</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
//                         {rooms.map(room => (
//                             <tr key={room._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{room.roomNumber}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{room.type || 'N/A'}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">₹{room.price || 'N/A'}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// // Coupons Tab
// const CouponsTab = () => {
//     const [allCoupons, setAllCoupons] = useState([]);
//     const [availableCoupons, setAvailableCoupons] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchCoupons = async () => {
//             try {
//                 setLoading(true);
//                 const [allRes, availableRes] = await Promise.all([
//                     api.get('api/coupons'),
//                     api.get('api/coupons/available'),
//                 ]);
//                 setAllCoupons(allRes.data);
//                 setAvailableCoupons(availableRes.data);
//             } catch (err) {
//                 setError('Failed to fetch coupons.');
//                 console.error('Error fetching coupons:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchCoupons();
//     }, []);

//     if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
//     if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

//     return (
//         <div>
//             <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Coupons</h2>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* All Coupons */}
//                 <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 backdrop-blur-md">
//                     <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">All Coupons</h3>
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                             <thead className="bg-gray-100/80 dark:bg-gray-700/80">
//                                 <tr>
//                                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Code</th>
//                                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Discount</th>
//                                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
//                                 {allCoupons.map(coupon => (
//                                     <tr key={coupon._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
//                                         <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.code}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.discount}%</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.isActive ? 'Active' : 'Inactive'}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//                 {/* Available Coupons */}
//                 <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 backdrop-blur-md">
//                     <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Available Coupons</h3>
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                             <thead className="bg-gray-100/80 dark:bg-gray-700/80">
//                                 <tr>
//                                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Code</th>
//                                     <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Discount</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
//                                 {availableCoupons.map(coupon => (
//                                     <tr key={coupon._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
//                                         <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.code}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.discount}%</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export const dashboardRoutes = [
//     { path: '', element: <OverviewTab /> },
//     { path: 'profile', element: <ProfileTab /> },
//     { path: 'users', element: <UsersTab /> },
//     { path: 'bookings', element: <BookingsTab /> },
//     { path: 'states', element: <StatesTab /> },
//     { path: 'cities', element: <CitiesTab /> },
//     { path: 'hotels', element: <HotelsTab /> },
//     { path: 'rooms', element: <RoomsTab /> },
//     { path: 'coupons', element: <CouponsTab /> },
// ];

// export default UserDashboard; 


import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { FiHome, FiUser, FiUsers, FiBook, FiMap, FiMapPin, FiKey, FiTag, FiLogOut, FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const API_URL = 'http://localhost:6969/';
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

const UserDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await api.get('user/me');
                setUser(response.data);
                console.log('User data:', response.data);
            } catch (err) {
                setError('Failed to fetch user details. Please log in again.');
                console.error('Error fetching user:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            console.log('Updated user state:', user);
        }
    }, [user]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;
    }

    if (!user) {
        return <div className="text-center text-gray-600 dark:text-gray-300">No user data available.</div>;
    }

    const isAdmin = user.role === 'admin';

    return (
        <div className={`flex min-h-screen ${darkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-700' : 'bg-gradient-to-br from-gray-100 to-gray-300'} transition-colors duration-500`}>
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-900 to-blue-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static lg:inset-0 shadow-xl rounded-r-2xl backdrop-blur-md bg-opacity-90`}
            >
                <div className="flex items-center justify-between p-6 border-b border-indigo-600">
                    <h2 className="text-2xl font-extrabold tracking-tight">Hotel Dashboard</h2>
                    <button onClick={toggleSidebar} className="lg:hidden">
                        <FiMenu size={24} className="text-indigo-200 hover:text-white transition-colors duration-200" />
                    </button>
                </div>
                <nav className="mt-6 space-y-2 px-4">
                    <NavLink
                        to=""
                        end
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                            }`
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiHome className="mr-3" size={20} />
                        Overview
                    </NavLink>
                    <NavLink
                        to="profile"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                            }`
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiUser className="mr-3" size={20} />
                        My Profile
                    </NavLink>
                    {isAdmin && (
                        <NavLink
                            to="users"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                                }`
                            }
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FiUsers className="mr-3" size={20} />
                            Users
                        </NavLink>
                    )}
                    <NavLink
                        to="bookings"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                            }`
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiBook className="mr-3" size={20} />
                        Bookings
                    </NavLink>
                    <NavLink
                        to="states"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                            }`
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiMap className="mr-3" size={20} />
                        States
                    </NavLink>
                    <NavLink
                        to="cities"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                            }`
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiMapPin className="mr-3" size={20} />
                        Cities
                    </NavLink>
                    <NavLink
                        to="hotels"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                            }`
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiHome className="mr-3" size={20} />
                        Hotels
                    </NavLink>
                    <NavLink
                        to="rooms"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                            }`
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiKey className="mr-3" size={20} />
                        Rooms
                    </NavLink>
                    <NavLink
                        to="coupons"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                            }`
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FiTag className="mr-3" size={20} />
                        Coupons
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white/80 dark:bg-gray-800/80 shadow-xl backdrop-blur-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <button onClick={toggleSidebar} className="lg:hidden mr-4">
                                <FiMenu size={24} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors duration-200" />
                            </button>
                            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Hotel Management Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                                {darkMode ? <FiSun size={20} className="text-yellow-400" /> : <FiMoon size={20} className="text-gray-600" />}
                            </button>
                            <span className="text-gray-600 dark:text-gray-300 font-medium">{user.firstname || 'User'}</span>
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

                {/* Main Content */}
                <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet context={{ user, isAdmin, darkMode }} />
                </main>
            </div>
        </div>
    );
};

const OverviewTab = () => {
    const { user, isAdmin, darkMode } = useOutletContext();
    const [stats, setStats] = useState({ bookings: 0, hotels: 0, locations: 0, coupons: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [bookingsRes, hotelsRes, locationsRes, couponsRes] = await Promise.all([
                    api.get(isAdmin ? 'api/bookings/' : 'api/bookings/'),
                    api.get('api/hotels'),
                    api.get('api/states'),
                    api.get('api/coupons/'),
                ]);
                setStats({
                    bookings: Array.isArray(bookingsRes.data) ? bookingsRes.data.length : bookingsRes.data.bookings?.length || 0,
                    hotels: Array.isArray(hotelsRes.data) ? hotelsRes.data.length : 0,
                    locations: Array.isArray(locationsRes.data) ? locationsRes.data.length : 0,
                    coupons: Array.isArray(couponsRes.data) ? couponsRes.data.length : 0,
                });
            } catch (err) {
                setError('Failed to fetch overview stats.');
                console.error('Error fetching stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [isAdmin]);

    if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
    if (error) return (
        <div className="text-center text-red-600 dark:text-red-400">
            {error}
            <button
                onClick={() => {
                    setError(null);
                    setLoading(true);
                    fetchStats();
                }}
                className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
                Retry
            </button>
        </div>
    );

    // Chart data for both Bar and Doughnut charts
    const chartData = {
        labels: ['Bookings', 'Hotels', 'Locations', 'Coupons'],
        datasets: [{
            label: 'Count',
            data: [stats.bookings, stats.hotels, stats.locations, stats.coupons],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(234, 179, 8, 0.8)',
                'rgba(168, 85, 247, 0.8)'
            ],
            borderColor: [
                'rgba(99, 102, 241, 1)',
                'rgba(34, 197, 94, 1)',
                'rgba(234, 179, 8, 1)',
                'rgba(168, 85, 247, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Options for Bar chart
    const barOptions = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Count',
                    color: darkMode ? '#D1D5DB' : '#4B5563'
                },
                ticks: {
                    color: darkMode ? '#D1D5DB' : '#4B5563'
                }
            },
            x: {
                ticks: {
                    color: darkMode ? '#D1D5DB' : '#4B5563'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    // Options for Doughnut chart
    const doughnutOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: darkMode ? '#D1D5DB' : '#4B5563'
                }
            }
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
                    <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                        <FiBook className="text-indigo-600 dark:text-indigo-400" size={28} />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Bookings</h3>
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats.bookings}</p>
                    </div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
                    <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full">
                        <FiHome className="text-green-600 dark:text-green-400" size={28} />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Hotels</h3>
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats.hotels}</p>
                    </div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
                    <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                        <FiMap className="text-yellow-600 dark:text-yellow-400" size={28} />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Locations</h3>
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats.locations}</p>
                    </div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
                    <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
                        <FiTag className="text-purple-600 dark:text-purple-400" size={28} />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Available Coupons</h3>
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats.coupons}</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Statistics Overview (Bar)</h3>
                    <div className="h-64">
                        <Bar data={chartData} options={barOptions} />
                    </div>
                </div>

                {/* Doughnut Chart */}
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Statistics Breakdown (Doughnut)</h3>
                    <div className="h-64">
                        <Doughnut data={chartData} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileTab = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await api.get('/user/getAllUsers');
                console.log("response.data:", response.data);
                const usersData = Array.isArray(response.data) ? response.data : response.data.userData || [];
                setUsers(usersData);
            } catch (err) {
                setError('Failed to fetch users. Please check your permissions or try again.');
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
    if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

    return (
        <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">All Users</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                        {user.firstname} {user.lastname}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.role}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const UsersTab = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await api.get('/user/getAllUsers');
                console.log("response.data:", response.data);
                const usersData = Array.isArray(response.data) ? response.data : response.data.userData || [];
                setUsers(usersData);
            } catch (err) {
                setError('Failed to fetch users. Please check your permissions or try again.');
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
    if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

    return (
        <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Users</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                        {user.firstname} {user.lastname}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.role}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const BookingsTab = () => {
    const { user, isAdmin } = useOutletContext();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const endpoint = isAdmin ? '/api/bookings/' : '/api/bookings/';
                const response = await api.get(endpoint);
                setBookings(response.data.bookings);
                console.log("booking------------------", response.data.bookings);
            } catch (err) {
                setError('Failed to fetch bookings.');
                console.error('Error fetching bookings:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [isAdmin]);

    if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
    if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

    return (
        <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Bookings</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Booking ID</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Hotel</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Check-in</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Check-out</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                        {bookings.map(booking => (
                            <tr key={booking._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{booking._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{booking.roomId?.hotel?.name || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                    {new Date(booking.checkIn).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                    {new Date(booking.checkOut).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const LocationsTab = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const response = await api.get('/locations/all');
                setLocations(response.data.bookings);
            } catch (err) {
                setError('Failed to fetch locations.');
                console.error('Error fetching locations:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
    if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

    return (
        <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Locations</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Address</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                        {locations.map(location => (
                            <tr key={location._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{location.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{location.address || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const StatesTab = () => {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                setLoading(true);
                const response = await api.get('api/states');
                setStates(response.data);
            } catch (err) {
                setError('Failed to fetch states.');
                console.error('Error fetching states:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStates();
    }, []);

    if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
    if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

    return (
        <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">States</h2>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                        {states.map(state => (
                            <tr key={state._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{state.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CitiesTab = () => {
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                setLoading(true);
                const response = await api.get('api/states');
                setStates(response.data);
                if (response.data.length > 0) {
                    setSelectedState(response.data[0]._id);
                }
            } catch (err) {
                setError('Failed to fetch states.');
                console.error('Error fetching states:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStates();
    }, []);

    useEffect(() => {
        if (selectedState) {
            const fetchCities = async () => {
                try {
                    setLoading(true);
                    const response = await api.get(`/api/states/${selectedState}/cities`);
                    setCities(response.data);
                } catch (err) {
                    setError('Failed to fetch cities.');
                    console.error('Error fetching cities:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchCities();
        }
    }, [selectedState]);

    if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
    if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

    return (
        <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Cities</h2>
            <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Select State</label>
                <select
                    value={selectedState}
                    onChange={e => setSelectedState(e.target.value)}
                    className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                >
                    {states.map(state => (
                        <option key={state._id} value={state._id}>
                            {state.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                        {cities.map(city => (
                            <tr key={city._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{city.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const HotelsTab = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                setLoading(true);
                const response = await api.get('api/states');
                setStates(response.data);
                if (response.data.length > 0) {
                    setSelectedState(response.data[0]._id);
                }
            } catch (err) {
                setError('Failed to fetch states.');
                console.error('Error fetching states:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStates();
    }, []);

    useEffect(() => {
        if (selectedState) {
            const fetchCities = async () => {
                try {
                    setLoading(true);
                    const response = await api.get(`/api/states/${selectedState}/cities`);
                    setCities(response.data);
                    if (response.data.length > 0) {
                        setSelectedCity(response.data[0]._id);
                    } else {
                        setSelectedCity('');
                        setHotels([]);
                    }
                } catch (err) {
                    setError('Failed to fetch cities.');
                    console.error('Error fetching cities:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchCities();
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedCity) {
            const fetchHotels = async () => {
                try {
                    setLoading(true);
                    const response = await api.get(`api/cities/${selectedCity}/hotels`);
                    setHotels(response.data);
                } catch (err) {
                    setError('Failed to fetch hotels.');
                    console.error('Error fetching hotels:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchHotels();
        }
    }, [selectedCity]);

    const fetchAllHotels = async () => {
        try {
            setLoading(true);
            const response = await api.get('api/hotels');
            setHotels(response.data);
            setSelectedState('');
            setSelectedCity('');
        } catch (err) {
            setError('Failed to fetch all hotels.');
            console.error('Error fetching hotels:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
    if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

    return (
        <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Hotels</h2>
            <div className="mb-6 flex space-x-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Select State</label>
                    <select
                        value={selectedState}
                        onChange={e => setSelectedState(e.target.value)}
                        className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    >
                        <option value="">Select State</option>
                        {states.map(state => (
                            <option key={state._id} value={state._id}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Select City</label>
                    <select
                        value={selectedCity}
                        onChange={e => setSelectedCity(e.target.value)}
                        className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        disabled={!selectedState}
                    >
                        <option value="">Select City</option>
                        {cities.map(city => (
                            <option key={city._id} value={city._id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={fetchAllHotels}
                    className="mt-8 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
                >
                    View All Hotels
                </button>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                        {hotels.map(hotel => (
                            <tr key={hotel._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{hotel.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const RoomsTab = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedHotel, setSelectedHotel] = useState('');
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                setLoading(true);
                const response = await api.get('api/states');
                setStates(response.data);
                if (response.data.length > 0) {
                    setSelectedState(response.data[0]._id);
                }
            } catch (err) {
                setError('Failed to fetch states.');
                console.error('Error fetching states:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStates();
    }, []);

    useEffect(() => {
        if (selectedState) {
            const fetchCities = async () => {
                try {
                    setLoading(true);
                    const response = await api.get(`/api/states/${selectedState}/cities`);
                    setCities(response.data);
                    if (response.data.length > 0) {
                        setSelectedCity(response.data[0]._id);
                    } else {
                        setSelectedCity('');
                        setHotels([]);
                        setRooms([]);
                    }
                } catch (err) {
                    setError('Failed to fetch cities.');
                    console.error('Error fetching cities:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchCities();
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedCity) {
            const fetchHotels = async () => {
                try {
                    setLoading(true);
                    const response = await api.get(`/api/cities/${selectedCity}/hotels`);
                    setHotels(response.data);
                    if (response.data.length > 0) {
                        setSelectedHotel(response.data[0]._id);
                    } else {
                        setSelectedHotel('');
                        setRooms([]);
                    }
                } catch (err) {
                    setError('Failed to fetch hotels.');
                    console.error('Error fetching hotels:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchHotels();
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedHotel) {
            const fetchRooms = async () => {
                try {
                    setLoading(true);
                    const response = await api.get(`/api/${selectedHotel}/rooms`);
                    setRooms(response.data);
                } catch (err) {
                    setError('Failed to fetch rooms.');
                    console.error('Error fetching rooms:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchRooms();
        }
    }, [selectedHotel]);

    if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
    if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

    return (
        <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Rooms</h2>
            <div className="mb-6 flex space-x-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Select State</label>
                    <select
                        value={selectedState}
                        onChange={e => setSelectedState(e.target.value)}
                        className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    >
                        <option value="">Select State</option>
                        {states.map(state => (
                            <option key={state._id} value={state._id}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Select City</label>
                    <select
                        value={selectedCity}
                        onChange={e => setSelectedCity(e.target.value)}
                        className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        disabled={!selectedState}
                    >
                        <option value="">Select City</option>
                        {cities.map(city => (
                            <option key={city._id} value={city._id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Select Hotel</label>
                    <select
                        value={selectedHotel}
                        onChange={e => setSelectedHotel(e.target.value)}
                        className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        disabled={!selectedCity}
                    >
                        <option value="">Select Hotel</option>
                        {hotels.map(hotel => (
                            <option key={hotel._id} value={hotel._id}>
                                {hotel.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Room Number</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                        {rooms.map(room => (
                            <tr key={room._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{room.roomNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{room.roomNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{room.type || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">₹{room.price || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CouponsTab = () => {
    const [allCoupons, setAllCoupons] = useState([]);
    const [availableCoupons, setAvailableCoupons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                setLoading(true);
                const [allRes, availableRes] = await Promise.all([
                    api.get('api/coupons'),
                    api.get('api/coupons/available'),
                ]);
                setAllCoupons(allRes.data);
                setAvailableCoupons(availableRes.data);
            } catch (err) {
                setError('Failed to fetch coupons.');
                console.error('Error fetching coupons:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCoupons();
    }, []);

    if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
    if (error) return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;

    return (
        <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Coupons</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">All Coupons</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Code</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Discount</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                                {allCoupons.map(coupon => (
                                    <tr key={coupon._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.discount}%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.isActive ? 'Active' : 'Inactive'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Available Coupons</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Code</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Discount</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                                {availableCoupons.map(coupon => (
                                    <tr key={coupon._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.discount}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const dashboardRoutes = [
    { path: '', element: <OverviewTab /> },
    { path: 'profile', element: <ProfileTab /> },
    { path: 'users', element: <UsersTab /> },
    { path: 'bookings', element: <BookingsTab /> },
    { path: 'states', element: <StatesTab /> },
    { path: 'cities', element: <CitiesTab /> },
    { path: 'hotels', element: <HotelsTab /> },
    { path: 'rooms', element: <RoomsTab /> },
    { path: 'coupons', element: <CouponsTab /> },
];

export default UserDashboard;