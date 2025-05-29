// import React from 'react';
// import { Bar, Doughnut } from 'react-chartjs-2';
// import { FiBook, FiHome, FiMap, FiTag } from 'react-icons/fi';

// const OverviewScreen = ({ overviewStats, overviewLoading, overviewError, isDarkMode, fetchStats }) => {
//     const overviewChartData = {
//         labels: ['Bookings', 'Hotels', 'Locations', 'Coupons'],
//         datasets: [{
//             label: 'Count',
//             data: [overviewStats.bookings, overviewStats.hotels, overviewStats.locations, overviewStats.coupons],
//             backgroundColor: [
//                 'rgba(99, 102, 241, 0.8)',
//                 'rgba(34, 197, 94, 0.8)',
//                 'rgba(234, 179, 8, 0.8)',
//                 'rgba(168, 85, 247, 0.8)',
//             ],
//             borderColor: [
//                 'rgba(99, 102, 241, 1)',
//                 'rgba(34, 197, 94, 1)',
//                 'rgba(234, 179, 8, 1)',
//                 'rgba(168, 85, 247, 1)',
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
//                 formatter: value => value.toLocaleString(),
//             },
//             tooltip: {
//                 backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
//                 titleColor: isDarkMode ? '#FFFFFF' : '#000000',
//                 bodyColor: isDarkMode ? '#D1D5DB' : '#4B5563',
//                 borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
//                 borderWidth: 1,
//                 cornerRadius: 8,
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
//                 formatter: value => value.toLocaleString(),
//             },
//             tooltip: {
//                 backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
//                 titleColor: isDarkMode ? '#FFFFFF' : '#000000',
//                 bodyColor: isDarkMode ? '#D1D5DB' : '#4B5563',
//                 borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
//                 borderWidth: 1,
//                 cornerRadius: 8,
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
//                             setOverviewError(null);
//                             setOverviewLoading(true);
//                             fetchStats();
//                         }}
//                         className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             ) : (
//                 <>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                         <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
//                             <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full">
//                                 <FiBook className="text-indigo-600 dark:text-indigo-400" size={28} />
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Bookings</h3>
//                                 <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{overviewStats.bookings}</p>
//                             </div>
//                         </div>
//                         <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
//                             <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full">
//                                 <FiHome className="text-green-600 dark:text-green-400" size={28} />
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Hotels</h3>
//                                 <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{overviewStats.hotels}</p>
//                             </div>
//                         </div>
//                         <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
//                             <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-full">
//                                 <FiMap className="text-yellow-600 dark:text-yellow-400" size={28} />
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Total Locations</h3>
//                                 <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{overviewStats.locations}</p>
//                             </div>
//                         </div>
//                         <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex items-center space-x-4 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
//                             <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
//                                 <FiTag className="text-purple-600 dark:text-purple-400" size={28} />
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">Available Coupons</h3>
//                                 <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{overviewStats.coupons}</p>
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

const OverviewScreen = ({ overviewStats, overviewLoading, overviewError, isDarkMode, fetchStats, totalUsers, totalRevenue, setCurrentScreen }) => {
    const overviewChartData = {
        labels: ['Bookings', 'Hotels', 'Locations', 'Coupons', 'Users', 'Revenue'],
        datasets: [{
            label: 'Count',
            data: [
                overviewStats.bookings,
                overviewStats.hotels,
                overviewStats.locations,
                overviewStats.coupons,
                totalUsers, // Added Total Users
                totalRevenue, // Added Total Revenue (in dollars)
            ],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(234, 179, 8, 0.8)',
                'rgba(168, 85, 247, 0.8)',
                'rgba(255, 99, 132, 0.8)', // Color for Users
                'rgba(54, 162, 235, 0.8)', // Color for Revenue
            ],
            borderColor: [
                'rgba(99, 102, 241, 1)',
                'rgba(34, 197, 94, 1)',
                'rgba(234, 179, 8, 1)',
                'rgba(168, 85, 247, 1)',
                'rgba(255, 99, 132, 1)', // Border color for Users
                'rgba(54, 162, 235, 1)', // Border color for Revenue
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
                title: { display: true, text: 'Value', color: isDarkMode ? '#D1D5DB' : '#4B5563', font: { size: 14, weight: 'bold' } }, // Changed label to "Value" to accommodate mixed data
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
                formatter: (value, context) => {
                    // Format Revenue with dollar sign, others as plain numbers
                    return context.dataIndex === 5 ? `$${value.toLocaleString()}` : value.toLocaleString();
                },
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
                        return context.dataIndex === 5 ? `${label}: $${value.toLocaleString()}` : `${label}: ${value.toLocaleString()}`;
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
                formatter: (value, context) => {
                    // Format Revenue with dollar sign, others as plain numbers
                    return context.dataIndex === 5 ? `$${value.toLocaleString()}` : value.toLocaleString();
                },
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
                        return context.dataIndex === 5 ? `${label}: $${value.toLocaleString()}` : `${label}: ${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return (
        <section className="space-y-8">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Overview</h2>
            {overviewLoading ? (
                <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>
            ) : overviewError ? (
                <div className="text-center text-red-600 dark:text-red-400">
                    {overviewError}
                    <button
                        onClick={() => {
                            setOverviewError(null);
                            setOverviewLoading(true);
                            fetchStats();
                        }}
                        className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <>
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
                            onClick={() => setCurrentScreen('hotels')} // Could redirect to a Locations screen if it existed
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
                </>
            )}
        </section>
    );
};

export default OverviewScreen;