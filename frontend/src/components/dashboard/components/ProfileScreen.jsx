import React from 'react';

const ProfileScreen = ({ profileLoading, profileError, profileUsers }) => (
    <section className="space-y-8">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">All Users</h2>
        {profileLoading ? (
            <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>
        ) : profileError ? (
            <div className="text-center text-red-600 dark:text-red-400">{profileError}</div>
        ) : (
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-x-auto backdrop-blur-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100/80 dark:bg-gray-700/80">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                        {profileUsers.length > 0 ? (
                            profileUsers.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                        {user.firstname} {user.lastname}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{user.isDisabled ? 'Disabled' : 'Active'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}
    </section>
);

export default ProfileScreen;