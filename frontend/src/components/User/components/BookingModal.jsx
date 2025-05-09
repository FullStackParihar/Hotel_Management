import React from "react";
import { FaTimes, FaBed, FaUser, FaWifi, FaTv, FaSnowflake, FaGlassMartini, FaConciergeBell, FaDoorOpen, FaArrowLeft, FaArrowRight, FaUsers, FaChild, FaPhone, FaTicketAlt } from "react-icons/fa";

const BookingModal = ({
  room,
  bookingForm,
  coupons,
  isFirstBooking,
  totalPrice,
  discountApplied,
  couponError,
  loading,
  currentImageIndex,
  onClose,
  onFormChange,
  onImageChange,
  onSubmit,
}) => {
  const iconMap = {
    WiFi: <FaWifi className="text-blue-400" />,
    TV: <FaTv className="text-blue-400" />,
    "Air Conditioning": <FaSnowflake className="text-blue-400" />,
    "Mini Bar": <FaGlassMartini className="text-blue-400" />,
    "Room Service": <FaConciergeBell className="text-blue-400" />,
    Balcony: <FaDoorOpen className="text-blue-400" />,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-11/12 max-w-4xl flex overflow-hidden">
        <div className="w-7/12 p-6 bg-gradient-to-br from-slate-900 to-blue-900">
          <h3 className="text-2xl font-semibold text-blue-300 mb-4">
            Room {room.roomNumber || "N/A"} ({room.type || "Standard"})
          </h3>
          {room.images && room.images.length > 0 ? (
            <div className="relative mb-4 rounded-lg overflow-hidden shadow-inner shadow-slate-900">
              <img
                src={room.images[currentImageIndex]}
                alt={`Room ${room.roomNumber || "N/A"}`}
                className="w-full h-48 object-cover"
              />
              {room.images.length > 1 && (
                <>
                  <button
                    onClick={() => onImageChange("prev")}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-slate-900/70 text-white p-2 rounded-full hover:bg-slate-800 transition-colors duration-200"
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    onClick={() => onImageChange("next")}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-slate-900/70 text-white p-2 rounded-full hover:bg-slate-800 transition-colors duration-200"
                  >
                    <FaArrowRight />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-48 bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 shadow-inner shadow-slate-900 mb-4">
              No Images Available
            </div>
          )}
          <div className="text-gray-200">
            <p className="flex items-center mb-2">
              <FaBed className="mr-2 text-blue-400" />
              <span className="text-green-400 font-bold">₹{room.price || "N/A"} per night</span>
            </p>
            <p className="flex items-center mb-2">
              <strong className="text-blue-200 min-w-24">Capacity:</strong>
              <span className="flex items-center">
                {Array(room.capacity || 1)
                  .fill()
                  .map((_, i) => (
                    <FaUser key={i} className="text-gray-400 mr-1" />
                  ))}
                {room.capacity || "N/A"} guests
              </span>
            </p>
            <div className="mb-2">
              <strong className="text-blue-200 block">Amenities:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {room.amenities?.length > 0 ? (
                  room.amenities.map((amenity, index) => (
                    <span key={index} className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full text-sm">
                      {iconMap[amenity] || null} {amenity}
                    </span>
                  ))
                ) : (
                  "N/A"
                )}
              </div>
            </div>
            <p>
              <strong className="text-blue-200">Description:</strong>{" "}
              <span className="text-gray-300 italic">{room.description || "No description available."}</span>
            </p>
          </div>
        </div>
        <div className="w-5/12 p-6 bg-slate-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-blue-300">Book This Room</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-200">
              <FaTimes size={24} />
            </button>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-semibold text-gray-200 mb-1">
                First Name
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={bookingForm.firstname}
                onChange={onFormChange}
                required
                className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-semibold text-gray-200 mb-1">
                Last Name
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={bookingForm.lastname}
                onChange={onFormChange}
                required
                className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label htmlFor="members" className="block text-sm font-semibold text-gray-200 mb-1">
                Number of Members
              </label>
              <div className="relative">
                <input
                  id="members"
                  name="members"
                  type="number"
                  value={bookingForm.members}
                  onChange={onFormChange}
                  min="1"
                  max={room.capacity || 10}
                  required
                  className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                />
                <FaUsers className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              </div>
            </div>
            <div>
              <label htmlFor="checkIn" className="block text-sm font-semibold text-gray-200 mb-1">
                Check-In Date
              </label>
              <input
                id="checkIn"
                name="checkIn"
                type="date"
                value={bookingForm.checkIn}
                onChange={onFormChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="checkOut" className="block text-sm font-semibold text-gray-200 mb-1">
                Check-Out Date
              </label>
              <input
                id="checkOut"
                name="checkOut"
                type="date"
                value={bookingForm.checkOut}
                onChange={onFormChange}
                required
                min={bookingForm.checkIn || new Date().toISOString().split("T")[0]}
                className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="couponCode" className="block text-sm font-semibold text-gray-200 mb-1">
                Coupon Code
              </label>
              <div className="relative">
                <select
                  id="couponCode"
                  name="couponCode"
                  value={bookingForm.couponCode}
                  onChange={onFormChange}
                  disabled={isFirstBooking}
                  className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 disabled:bg-slate-600/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  <option value="">-- Select a Coupon --</option>
                  {coupons.map((coupon) => (
                    <option key={coupon._id} value={coupon.code}>
                      {coupon.code} ({coupon.discount}% off)
                    </option>
                  ))}
                </select>
                <FaTicketAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              </div>
              {isFirstBooking && (
                <p className="text-sm text-green-400 mt-2">50% discount applied automatically for your first booking!</p>
              )}
              {couponError && <p className="text-sm text-red-400 mt-2">{couponError}</p>}
            </div>
            <div>
              <p className="text-gray-200">
                <strong>Base Price:</strong>{" "}
                <span className="text-green-400 font-bold">
                  ₹{(room.price * Math.ceil((new Date(bookingForm.checkOut) - new Date(bookingForm.checkIn)) / (1000 * 60 * 60 * 24))).toFixed(2)}
                </span>
              </p>
              {discountApplied > 0 && (
                <p className="text-gray-200">
                  <strong>Discount Applied:</strong>{" "}
                  <span className="text-green-400">{discountApplied}% ({bookingForm.couponCode})</span>
                </p>
              )}
              <p className="text-gray-200">
                <strong>Total Price:</strong>{" "}
                <span className="text-green-400 font-bold">₹{totalPrice.toFixed(2)}</span>
              </p>
            </div>
            <div className="flex items-center">
              <input
                id="hasChild"
                name="hasChild"
                type="checkbox"
                checked={bookingForm.hasChild}
                onChange={onFormChange}
                className="mr-2 h-4 w-4 text-blue-400 bg-slate-700 border-slate-600 rounded focus:ring-blue-400"
              />
              <label htmlFor="hasChild" className="text-sm font-semibold text-gray-200 flex items-center">
                <FaChild className="mr-2 text-blue-400" /> Children Included
              </label>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-200 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={bookingForm.phone}
                  onChange={onFormChange}
                  required
                  pattern="\d{10}"
                  className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  placeholder="Enter 10-digit phone number"
                />
                <FaPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !!couponError}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-900/50 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;