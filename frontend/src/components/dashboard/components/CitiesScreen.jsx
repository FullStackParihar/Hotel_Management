// src/components/UserDashboard/CitiesScreen.jsx
import React from 'react';

const CitiesScreen = ({ citiesLoading, citiesError, citiesStates, selectedState, setSelectedState, cities }) => {
    return (
        <section className="space-y-8">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Cities</h2>
            {citiesLoading ? (
                <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>
            ) : citiesError ? (
                <div className="text-center text-red-600 dark:text-red-400">{citiesError}</div>
            ) : (
                <>
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Select State</label>
                        <select
                            value={selectedState}
                            onChange={e => setSelectedState(e.target.value)}
                            className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                        >
                            {citiesStates.map(state => (
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
                </>
            )}
        </section>
    );
};

export default CitiesScreen;