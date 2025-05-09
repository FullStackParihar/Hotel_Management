import React from "react";
import { FaTimes, FaListAlt, FaCheck } from "react-icons/fa";

const BookingsModal = ({ bookings, loading, error, onClose, onCheckIn }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-11/12 max-w-4xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-blue-300">My Bookings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-200">
            <FaTimes size={24} />
          </button>
        </div>
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full bg-slate-800/90 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-blue-900/50 text-left text-blue-200">
                  <th className="p-4">Room</th>
                  <th className="p-4">Check-In</th>
                  <th className="p-4">Check-Out</th>
                  <th className="p-4">Members</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Total Price</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4">Check-In Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-t border-slate-700/50 hover:bg-slate-700/50 transition-all duration-200"
                  >
                    <td className="p-4">{booking.roomId ? `Room ${booking.roomId.roomNumber} (${booking.roomId.type})` : "N/A"}</td>
                    <td className="p-4">{new Date(booking.checkIn).toLocaleDateString()}</td>
                    <td className="p-4">{new Date(booking.checkOut).toLocaleDateString()}</td>
                    <td className="p-4">{booking.members}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : booking.status === "rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">₹{booking.totalPrice.toFixed(2)}</td>
                    <td className="p-4">{booking.discountApplied}% ({booking.couponCode || "N/A"})</td>
                    <td className="p-4">
                      {booking.status === "approved" && !booking.checkedIn ? (
                        <button
                          onClick={() => onCheckIn(booking._id)}
                          className="flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 transition-all duration-200"
                        >
                          <FaCheck className="mr-2" /> Check-In
                        </button>
                      ) : booking.checkedIn ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                          Checked In
                        </span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-slate-800/70 rounded-xl p-12 text-center shadow-lg border border-slate-700/30">
            <FaListAlt className="text-5xl text-blue-400/50 mx-auto mb-4" />
            <p className="text-gray-300 text-xl mb-2">You have no bookings yet.</p>
            <p className="text-blue-300/70">Book a room to see your reservations here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsModal;