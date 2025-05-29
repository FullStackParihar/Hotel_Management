import React from 'react';
import { FiRefreshCw, FiSearch } from 'react-icons/fi';

const HotelsScreen = ({
    hotelsLoading,
    hotelsError,
    hotelsStates,
    selectedHotelState,
    setSelectedHotelState,
    hotelsCities,
    selectedHotelCity,
    setSelectedHotelCity,
    hotelsSearch,
    setHotelsSearch,
    paginatedHotels,
    hotelsPage,
    totalHotelPages,
    setHotelsPage,
    fetchAllHotels,
}) => (
    <section className="space-y-8">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Hotels</h2>
        {hotelsLoading ? (
            <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>
        ) : hotelsError ? (
            <div className="text-center text-red-600 dark:text-red-400">{hotelsError}</div>
        ) : (
            <>
                <div className="mb-6 flex flex-wrap gap-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Select State</label>
                        <select
                            value={selectedHotelState}
                            onChange={e => setSelectedHotelState(e.target.value)}
                            className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        >
                            <option value="">Select State</option>
                            {hotelsStates.map(state => (
                                <option key={state._id} value={state._id}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Select City</label>
                        <select
                            value={selectedHotelCity}
                            onChange={e => setSelectedHotelCity(e.target.value)}
                            className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            disabled={!selectedHotelState}
                        >
                            <option value="">Select City</option>
                            {hotelsCities.map(city => (
                                <option key={city._id} value={city._id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Search Hotels</label>
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={hotelsSearch}
                                onChange={e => setHotelsSearch(e.target.value)}
                                placeholder="Search by hotel name"
                                className="w-full max-w-xs pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            />
                        </div>
                    </div>
                    <button
                        onClick={fetchAllHotels}
                        className="mt-8 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
                    >
                        View All Hotels
                    </button>
                    <button
                        onClick={() => setHotelsSearch('')}
                        className="mt-8 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 flex items-center"
                    >
                        <FiRefreshCw className="mr-2" />
                        Reset Search
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
                            {paginatedHotels.length > 0 ? (
                                paginatedHotels.map(hotel => (
                                    <tr key={hotel._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{hotel.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">
                                        No hotels found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center px-6 py-4">
                        <button
                            onClick={() => setHotelsPage(p => Math.max(p - 1, 1))}
                            disabled={hotelsPage === 1}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
                        >
                            Previous
                        </button>
                        <span className="text-gray-700 dark:text-gray-200">
                            Page {hotelsPage} of {totalHotelPages}
                        </span>
                        <button
                            onClick={() => setHotelsPage(p => Math.min(p + 1, totalHotelPages))}
                            disabled={hotelsPage === totalHotelPages}
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

export default HotelsScreen;