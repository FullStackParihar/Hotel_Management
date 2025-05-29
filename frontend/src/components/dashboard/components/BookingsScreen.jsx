import React from 'react';
import { FiRefreshCw, FiSearch } from 'react-icons/fi';

const BookingsScreen = ({
    bookingsLoading,
    bookingsError,
    paginatedBookings,
    bookingsPage,
    totalBookingPages,
    setBookingsPage,
    bookingsFilters,
    setBookingsFilters,
    bookingsSort,
    setBookingsSort,
    uniqueBookingStatuses,
    uniqueBookingHotels,
 
}) => (
    <section className="space-y-8">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Bookings</h2>
        
        {bookingsLoading ? (
            <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>
        ) : bookingsError ? (
            <div className="text-center text-red-600 dark:text-red-400">{bookingsError}</div>
        ) : (
            <>
                <div className="mb-6 flex flex-wrap gap-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Status</label>
                        <select
                            value={bookingsFilters.status}
                            onChange={e => setBookingsFilters({ ...bookingsFilters, status: e.target.value })}
                            className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        >
                            <option value="">All Statuses</option>
                            {uniqueBookingStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Hotel</label>
                        <select
                            value={bookingsFilters.hotel}
                            onChange={e => setBookingsFilters({ ...bookingsFilters, hotel: e.target.value })}
                            className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        >
                            <option value="">All Hotels</option>
                            {uniqueBookingHotels.map(hotel => (
                                <option key={hotel} value={hotel}>{hotel}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                        <input
                            type="date"
                            value={bookingsFilters.startDate}
                            onChange={e => setBookingsFilters({ ...bookingsFilters, startDate: e.target.value })}
                            className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">End Date</label>
                        <input
                            type="date"
                            value={bookingsFilters.endDate}
                            onChange={e => setBookingsFilters({ ...bookingsFilters, endDate: e.target.value })}
                            className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Search</label>
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={bookingsFilters.search}
                                onChange={e => setBookingsFilters({ ...bookingsFilters, search: e.target.value })}
                                placeholder="Search by ID or Hotel"
                                className="w-full max-w-xs pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setBookingsFilters({ status: '', hotel: '', startDate: '', endDate: '', search: '' })}
                        className="flex items-center mt-8 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
                    >
                        <FiRefreshCw className="mr-2" />
                        Reset Filters
                    </button>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Booking ID
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Hotel
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => setBookingsSort({ field: 'checkIn', order: bookingsSort.order === 'asc' ? 'desc' : 'asc' })}>
                                    Check-in {bookingsSort.field === 'checkIn' && (bookingsSort.order === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => setBookingsSort({ field: 'checkOut', order: bookingsSort.order === 'asc' ? 'desc' : 'asc' })}>
                                    Check-out {bookingsSort.field === 'checkOut' && (bookingsSort.order === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                            {paginatedBookings.length > 0 ? (
                                paginatedBookings.map(booking => (
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">
                                        No bookings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center px-6 py-4">
                        <button
                            onClick={() => setBookingsPage(p => Math.max(p - 1, 1))}
                            disabled={bookingsPage === 1}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
                        >
                            Previous
                        </button>
                        <span className="text-gray-700 dark:text-gray-200">
                            Page {bookingsPage} of {totalBookingPages}
                        </span>
                        <button
                            onClick={() => setBookingsPage(p => Math.min(p + 1, totalBookingPages))}
                            disabled={bookingsPage === totalBookingPages}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </>
        )}
    </section>
);

export default BookingsScreen;