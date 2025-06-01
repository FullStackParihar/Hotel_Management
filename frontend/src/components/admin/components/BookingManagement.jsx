 
import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaBed, FaPhone, FaUsers, FaChild, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaTrash } from "react-icons/fa";
import api from "../../../Utils/api";

const BookingManagement = ({ bookings, fetchBookings, loading, setLoading, setError, baseURL }) => {
    const [bookingFilter, setBookingFilter] = useState("all");
    const [checkInFilter, setCheckInFilter] = useState({ start: "", end: "" });
    const [checkedInFilter, setCheckedInFilter] = useState("all");

    const handleUpdateStatus = async (bookingId, status) => {
        setLoading(true);
        setError("");
        try {
            const response = await api.patch(`/api/bookings/${bookingId}/status`,
                { status },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            alert(response.data.message);
            fetchBookings();
        } catch (err) {
            setError(err.response?.data?.message || `Failed to ${status} booking.`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        if (!confirm("Are you sure you want to delete this booking? This action cannot be undone.")) return;

        setLoading(true);
        setError("");
        try {
            const response = await api.delete(`/api/bookings/${bookingId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            alert(response.data.message || "Booking deleted successfully.");
            fetchBookings();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete booking.");
        } finally {
            setLoading(false);
        }
    };

    const handleCheckInFilterChange = (e) => {
        const { name, value } = e.target;
        setCheckInFilter((prev) => ({ ...prev, [name]: value }));
    };

   
    const filteredBookings = bookings
        .filter((booking) => {
           
            if (bookingFilter !== "all") {
                return booking.status === bookingFilter;
            }
            return true;
        })
        .filter((booking) => {
           
            const checkInDate = new Date(booking.checkIn);
            const startDate = checkInFilter.start ? new Date(checkInFilter.start) : null;
            const endDate = checkInFilter.end ? new Date(checkInFilter.end) : null;

            if (startDate && checkInDate < startDate) return false;
            if (endDate && checkInDate > endDate) return false;
            return true;
        })
        .filter((booking) => {
             
            if (checkedInFilter === "checkedIn") return booking.checkedIn === true;
            if (checkedInFilter === "notCheckedIn") return booking.checkedIn === false;
            return true;
        });

    return (
        <div>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">Manage Bookings</h2>
        
            <div className="flex gap-2 mb-6">
                {["all", "pending", "approved", "rejected"].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setBookingFilter(filter)}
                        className={`flex-1 py-2 rounded-md ${
                            bookingFilter === filter
                                ? `bg-${
                                    filter === "all" ? "blue" : filter === "pending" ? "yellow" : filter === "approved" ? "green" : "red"
                                }-600 text-white`
                                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                        } transition-all duration-200`}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>
            <div className="flex gap-2 mb-6">
                {["all", "checkedIn", "notCheckedIn"].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setCheckedInFilter(filter)}
                        className={`flex-1 py-2 rounded-md ${
                            checkedInFilter === filter
                                ? `bg-${
                                    filter === "all" ? "blue" : filter === "checkedIn" ? "green" : "gray"
                                }-600 text-white`
                                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                        } transition-all duration-200`}
                    >
                        {filter === "all" ? "All" : filter === "checkedIn" ? "Checked In" : "Not Checked In"}
                    </button>
                ))}
            </div>
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                </div>
            ) : filteredBookings.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {filteredBookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-gradient-to-r from-slate-800/80 to-slate-800/60 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-700/50 transition-all duration-200 hover:shadow-blue-900/30"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-blue-300">
                                    Booking for {booking.name}
                                </h3>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        booking.status === "approved"
                                            ? "bg-green-600/80 text-white"
                                            : booking.status === "rejected"
                                            ? "bg-red-600/80 text-white"
                                            : "bg-yellow-600/80 text-white"
                                    }`}
                                >
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-200">
                                <div>
                                    <p className="flex items-center mb-2">
                                        <FaUser className="mr-2 text-blue-400" />
                                        <strong>User:</strong> {booking.userId?.firstname} {booking.userId?.lastname} ({booking.userId?.email})
                                    </p>
                                    <p className="flex items-center mb-2">
                                        <FaBed className="mr-2 text-blue-400" />
                                        <strong>Room:</strong> {booking.roomId?.roomNumber} ({booking.roomId?.type})
                                    </p>
                                    <p className="flex items-center mb-2">
                                        <FaPhone className="mr-2 text-blue-400" />
                                        <strong>Phone:</strong> {booking.phone}
                                    </p>
                                    <p className="flex items-center mb-2">
                                        <FaUsers className="mr-2 text-blue-400" />
                                        <strong>Members:</strong> {booking.members}
                                    </p>
                                    <p className="flex items-center">
                                        <FaChild className="mr-2 text-blue-400" />
                                        <strong>Children Included:</strong> {booking.hasChild ? "Yes" : "No"}
                                    </p>
                                </div>
                                <div>
                                    <p className="flex items-center mb-2">
                                        <FaCalendarAlt className="mr-2 text-blue-400" />
                                        <strong>Check-In:</strong> {new Date(booking.checkIn).toLocaleDateString()}
                                    </p>
                                    <p className="flex items-center mb-2">
                                        <FaCalendarAlt className="mr-2 text-blue-400" />
                                        <strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleDateString()}
                                    </p>
                                    <p className="flex items-center mb-2">
                                        <FaMapMarkerAlt className="mr-2 text-blue-400" />
                                        <strong>Price:</strong> ₹{booking.roomId?.price || "N/A"} per night
                                    </p>
                                    <p className="flex items-center">
                                        <FaCheckCircle className="mr-2 text-blue-400" />
                                        <strong>Checked In:</strong>{" "}
                                        <span className={`${booking.checkedIn ? "text-green-400" : "text-gray-400"}`}>
                                            {booking.checkedIn ? "Yes" : "No"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex space-x-4">
                                {booking.status === "pending" && (
                                    <>
                                        <button
                                            onClick={() => handleUpdateStatus(booking._id, "approved")}
                                            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-all duration-200 shadow-md"
                                            disabled={loading}
                                        >
                                            <FaCheckCircle className="mr-2" /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(booking._id, "rejected")}
                                            className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all duration-200 shadow-md"
                                            disabled={loading}
                                        >
                                            <FaTimesCircle className="mr-2" /> Reject
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => handleDeleteBooking(booking._id)}
                                    className="flex items-center px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-md"
                                    disabled={loading}
                                >
                                    <FaTrash className="mr-2" /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-slate-800/70 rounded-xl p-12 text-center shadow-lg border border-slate-700/30">
                    <FaCalendarAlt className="text-5xl text-blue-400/50 mx-auto mb-4" />
                    <p className="text-gray-300 text-xl mb-2">No bookings found.</p>
                    <p className="text-blue-300/70">Check back later for new bookings.</p>
                </div>
            )}
        </div>
    );
};

export default BookingManagement;