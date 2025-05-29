 
// import React from 'react';
// import { Bar, Doughnut } from 'react-chartjs-2';
// import { FiBook, FiHome, FiMap, FiTag, FiUsers, FiDollarSign } from 'react-icons/fi';

// const OverviewScreen = ({ overviewStats, overviewLoading, overviewError, isDarkMode, fetchStats, totalUsers, totalRevenue, setCurrentScreen }) => {
//     const overviewChartData = {
//         labels: ['Bookings', 'Hotels', 'Locations', 'Coupons', 'Users'],
//         datasets: [{
//             label: 'Count',
//             data: [
//                 overviewStats.bookings,
//                 overviewStats.hotels,
//                 overviewStats.locations,
//                 overviewStats.coupons,
//                 totalUsers,
//             ],
//             backgroundColor: [
//                 'rgba(99, 102, 241, 0.8)',
//                 'rgba(34, 197, 94, 0.8)',
//                 'rgba(234, 179, 8, 0.8)',
//                 'rgba(168, 85, 247, 0.8)',
//                 'rgba(255, 99, 132, 0.8)',
//             ],
//             borderColor: [
//                 'rgba(99, 102, 241, 1)',
//                 'rgba(34, 197, 94, 1)',
//                 'rgba(234, 179, 8, 1)',
//                 'rgba(168, 85, 247, 1)',
//                 'rgba(255, 99, 132, 1)',
//             ],
//             borderWidth: 2,
//             borderRadius: 10,
//         }],
//     };

//     const barOptions = {
//         maintainAspectRatio: false,
//         animation: { duration: 1500, easing: 'easeOutCubic' },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 title: { display: true, text: 'Count', color: isDarkMode ? '#D1D5DB' : '#4B5563', font: { size: 14, weight: 'bold' } },
//                 ticks: { color: isDarkMode ? '#D1D5DB' : '#4B5563', font: { size: 12 } },
//                 grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
//             },
//             x: {
//                 ticks: { color: isDarkMode ? '#D1D5DB' : '#4B5563', font: { size: 12 } },
//                 grid: { display: false },
//             },
//         },
//         plugins: {
//             legend: { display: false },
//             datalabels: {
//                 display: true,
//                 color: isDarkMode ? '#FFFFFF' : '#000000',
//                 font: { weight: 'bold', size: 12 },
//                 anchor: 'end',
//                 align: 'top',
//                 formatter: (value) => value.toLocaleString(),
//             },
//             tooltip: {
//                 backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
//                 titleColor: isDarkMode ? '#FFFFFF' : '#000000',
//                 bodyColor: isDarkMode ? '#D1D5DB' : '#4B5563',
//                 borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
//                 borderWidth: 1,
//                 cornerRadius: 8,
//                 callbacks: {
//                     label: (context) => {
//                         const label = context.label || '';
//                         const value = context.raw || 0;
//                         return `${label}: ${value.toLocaleString()}`;
//                     },
//                 },
//             },
//         },
//     };

//     const doughnutOptions = {
//         maintainAspectRatio: false,
//         animation: { duration: 1500, easing: 'easeOutCubic' },
//         plugins: {
//             legend: {
//                 position: 'bottom',
//                 labels: { color: isDarkMode ? '#D1D5DB' : '#4B5563', font: { size: 12 }, padding: 20, boxWidth: 20 },
//             },
//             datalabels: {
//                 display: true,
//                 color: '#FFFFFF',
//                 font: { weight: 'bold', size: 12 },
//                 formatter: (value) => value.toLocaleString(),
//             },
//             tooltip: {
//                 backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
//                 titleColor: isDarkMode ? '#FFFFFF' : '#000000',
//                 bodyColor: isDarkMode ? '#D1D5DB' : '#4B5563',
//                 borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
//                 borderWidth: 1,
//                 cornerRadius: 8,
//                 callbacks: {
//                     label: (context) => {
//                         const label = context.label || '';
//                         const value = context.raw || 0;
//                         return `${label}: ${value.toLocaleString()}`;
//                     },
//                 },
//             },
//         },
//     };

//     return (
//         <section className="space-y-8">
//             <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Overview</h2>
//             {overviewLoading ? (
//                 <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>
//             ) : overviewError ? (
//                 <div className="text-center text-red-600 dark:text-red-400">
//                     {overviewError}
//                     <button
//                         onClick={() => {
//                             fetchStats();
//                         }}
//                         className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             ) : (
//                 <>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         <div
//                             className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
//                             onClick={() => setCurrentScreen('bookings')}
//                         >
//                             <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full">
//                                 <FiBook className="text-indigo-600 dark:text-indigo-400" size={28} />
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Bookings</h3>
//                                 <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{overviewStats.bookings}</p>
//                             </div>
//                         </div>
//                         <div
//                             className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
//                             onClick={() => setCurrentScreen('hotels')}
//                         >
//                             <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full">
//                                 <FiHome className="text-green-600 dark:text-green-400" size={28} />
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Hotels</h3>
//                                 <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{overviewStats.hotels}</p>
//                             </div>
//                         </div>
//                         <div
//                             className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
//                             onClick={() => setCurrentScreen('hotels')}
//                         >
//                             <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-full">
//                                 <FiMap className="text-yellow-600 dark:text-yellow-400" size={28} />
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Locations</h3>
//                                 <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{overviewStats.locations}</p>
//                             </div>
//                         </div>
//                         <div
//                             className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
//                             onClick={() => setCurrentScreen('coupons')}
//                         >
//                             <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
//                                 <FiTag className="text-purple-600 dark:text-purple-400" size={28} />
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Available Coupons</h3>
//                                 <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{overviewStats.coupons}</p>
//                             </div>
//                         </div>
//                         <div
//                             className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
//                             onClick={() => setCurrentScreen('users')}
//                         >
//                             <div className="p-4 bg-red-100 dark:bg-red-900 rounded-full">
//                                 <FiUsers className="text-red-600 dark:text-red-400" size={28} />
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Users</h3>
//                                 <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{totalUsers}</p>
//                             </div>
//                         </div>
//                         <div
//                             className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
//                             onClick={() => setCurrentScreen('revenue')}
//                         >
//                             <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
//                                 <FiDollarSign className="text-blue-600 dark:text-blue-400" size={28} />
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Revenue</h3>
//                                 <p className="text-3xl font-extrabold text-gray-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                         <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 backdrop-blur-md">
//                             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Statistics Overview (Bar)</h3>
//                             <div className="h-64">
//                                 <Bar data={overviewChartData} options={barOptions} />
//                             </div>
//                         </div>
//                         <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 backdrop-blur-md">
//                             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Statistics Breakdown (Doughnut)</h3>
//                             <div className="h-64">
//                                 <Doughnut data={overviewChartData} options={doughnutOptions} />
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </section>
//     );
// };

// export default OverviewScreen;


import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FiBook, FiHome, FiMap, FiTag, FiUsers, FiDollarSign } from 'react-icons/fi';

const OverviewScreen = ({ overviewStats, overviewLoading, overviewError, isDarkMode, fetchStats, totalUsers, totalRevenue, setCurrentScreen, recentBookings }) => {
    const overviewChartData = {
        labels: ['Bookings', 'Hotels', 'Locations', 'Coupons', 'Users'],
        datasets: [{
            label: 'Count',
            data: [
                overviewStats.bookings,
                overviewStats.hotels,
                overviewStats.locations,
                overviewStats.coupons,
                totalUsers,
            ],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(234, 179, 8, 0.8)',
                'rgba(168, 85, 247, 0.8)',
                'rgba(255, 99, 132, 0.8)',
            ],
            borderColor: [
                'rgba(99, 102, 241, 1)',
                'rgba(34, 197, 94, 1)',
                'rgba(234, 179, 8, 1)',
                'rgba(168, 85, 247, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2,
            borderRadius: 10,
        }],
    };

    const barOptions = {
        maintainAspectRatio: false,
        animation: { duration: 1500, easing: 'easeOutCubic' },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Count', color: isDarkMode ? '#D1D5DB' : '#4B5563', font: { size: 14, weight: 'bold' } },
                ticks: { color: isDarkMode ? '#D1D5DB' : '#4B5563', font: { size: 12 } },
                grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
            },
            x: {
                ticks: { color: isDarkMode ? '#D1D5DB' : '#4B5563', font: { size: 12 } },
                grid: { display: false },
            },
        },
        plugins: {
            legend: { display: false },
            datalabels: {
                display: true,
                color: isDarkMode ? '#FFFFFF' : '#000000',
                font: { weight: 'bold', size: 12 },
                anchor: 'end',
                align: 'top',
                formatter: (value) => value.toLocaleString(),
            },
            tooltip: {
                backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                titleColor: isDarkMode ? '#FFFFFF' : '#000000',
                bodyColor: isDarkMode ? '#D1D5DB' : '#4B5563',
                borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                borderWidth: 1,
                cornerRadius: 8,
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    const doughnutOptions = {
        maintainAspectRatio: false,
        animation: { duration: 1500, easing: 'easeOutCubic' },
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: isDarkMode ? '#D1D5DB' : '#4B5563', font: { size: 12 }, padding: 20, boxWidth: 20 },
            },
            datalabels: {
                display: true,
                color: '#FFFFFF',
                font: { weight: 'bold', size: 12 },
                formatter: (value) => value.toLocaleString(),
            },
            tooltip: {
                backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                titleColor: isDarkMode ? '#FFFFFF' : '#000000',
                bodyColor: isDarkMode ? '#D1D5DB' : '#4B5563',
                borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                borderWidth: 1,
                cornerRadius: 8,
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return (
        <section className="space-y-8 max-w-full mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight text-center">Overview</h2>
            {overviewLoading ? (
                <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>
            ) : overviewError ? (
                <div className="text-center text-red-600 dark:text-red-400">
                    {overviewError}
                    <button
                        onClick={() => {
                            fetchStats();
                        }}
                        className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content (Cards and Charts) */}
                    <div className="flex-1 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div
                                className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() => setCurrentScreen('bookings')}
                            >
                                <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                                    <FiBook className="text-indigo-600 dark:text-indigo-400" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Bookings</h3>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{overviewStats.bookings}</p>
                                </div>
                            </div>
                            <div
                                className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() => setCurrentScreen('hotels')}
                            >
                                <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full">
                                    <FiHome className="text-green-600 dark:text-green-400" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Hotels</h3>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{overviewStats.hotels}</p>
                                </div>
                            </div>
                            <div
                                className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() => setCurrentScreen('hotels')}
                            >
                                <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                                    <FiMap className="text-yellow-600 dark:text-yellow-400" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Locations</h3>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{overviewStats.locations}</p>
                                </div>
                            </div>
                            <div
                                className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() => setCurrentScreen('coupons')}
                            >
                                <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
                                    <FiTag className="text-purple-600 dark:text-purple-400" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Available Coupons</h3>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{overviewStats.coupons}</p>
                                </div>
                            </div>
                            <div
                                className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() => setCurrentScreen('users')}
                            >
                                <div className="p-4 bg-red-100 dark:bg-red-900 rounded-full">
                                    <FiUsers className="text-red-600 dark:text-red-400" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Users</h3>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{totalUsers}</p>
                                </div>
                            </div>
                            <div
                                className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() => setCurrentScreen('revenue')}
                            >
                                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                                    <FiDollarSign className="text-blue-600 dark:text-blue-400" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Revenue</h3>
                                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 backdrop-blur-md">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Statistics Overview (Bar)</h3>
                                <div className="h-64">
                                    <Bar data={overviewChartData} options={barOptions} />
                                </div>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 backdrop-blur-md">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Statistics Breakdown (Doughnut)</h3>
                                <div className="h-64">
                                    <Doughnut data={overviewChartData} options={doughnutOptions} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Bookings Section */}
                    <div className="lg:w-1/3 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 backdrop-blur-md">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Recent Bookings</h3>
                        {recentBookings && recentBookings.length > 0 ? (
                            <div className="space-y-4">
                                {recentBookings.map((booking) => (
                                    <div
                                        key={booking._id}
                                        className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {booking.roomId?.hotel?.name || 'N/A'}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Check-In: {new Date(booking.checkIn).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                ${booking.totalPrice?.toLocaleString() || '0.00'}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {booking.status || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400">No recent bookings available.</p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default OverviewScreen;