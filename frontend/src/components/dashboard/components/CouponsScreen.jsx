import React from 'react';

const CouponsScreen = ({ couponsLoading, couponsError, allCoupons, availableCoupons }) => (
    <section className="space-y-8">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Coupons</h2>
        {couponsLoading ? (
            <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>
        ) : couponsError ? (
            <div className="text-center text-red-600 dark:text-red-400">{couponsError}</div>
        ) : (
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
                                {allCoupons.length > 0 ? (
                                    allCoupons.map(coupon => (
                                        <tr key={coupon._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.code}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.discount}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                        coupon.isActive
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                    }`}
                                                >
                                                    {coupon.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">
                                            No coupons found.
                                        </td>
                                    </tr>
                                )}
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
                                {availableCoupons.length > 0 ? (
                                    availableCoupons.map(coupon => (
                                        <tr key={coupon._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.code}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">{coupon.discount}%</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">
                                            No available coupons found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}
    </section>
);

export default CouponsScreen;