 

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt, FaHotel, FaStar, FaBed, FaWifi, FaTv,
  FaSnowflake, FaGlassMartini, FaConciergeBell, FaDoorOpen,
  FaArrowRight, FaArrowLeft, FaRegStar, FaCoffee, FaSwimmingPool,
  FaParking, FaUser, FaCalendarAlt,
} from "react-icons/fa";
import useDarkMode from "../hooks/useDarkMode";  
import api from "../../../Utils/api";

const HotelList = ({
  hotels,
  filterRating,
  searchTerm,
  sortOrder,
  onBookNow,
  selectedState,
  selectedCity,
  loading,
  error,
  setError,
}) => {
  const [rooms, setRooms] = useState([]);
  const [expandedHotels, setExpandedHotels] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [roomLoading, setRoomLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState({});
 
  const scrollPositionRef = useRef(0);
  const [isDarkMode] = useDarkMode();  
  console.log("hotels", hotels);
 

  const fetchRooms = async (hotelId) => {
    if (!hotelId) {
      setRooms([]);
      return;
    }
    setRoomLoading(true);
    try {
      const response = await api.get(`/api/${hotelId}/rooms`);
      const activeRooms = Array.isArray(response.data) ? response.data.filter((r) => r.isActive) : [];
      setRooms(activeRooms);
      const initialImageIndex = activeRooms.reduce((acc, room) => {
        acc[room._id] = 0;
        return acc;
      }, {});
      setCurrentImageIndex((prev) => ({ ...prev, ...initialImageIndex }));
    } catch (err) {
      console.error("fetchRooms - Error:", err);
      setError(err.response?.data?.message || "Failed to fetch rooms.");
      setRooms([]);
    } finally {
      setRoomLoading(false);
    }
  };

  const fetchPreviewImage = async (hotelId) => {
    try {
      const response = await api.get(`/api/${hotelId}/rooms`);
      const rooms = Array.isArray(response.data) ? response.data.filter((r) => r.isActive) : [];
      if (rooms.length > 0 && rooms[0].images && rooms[0].images.length > 0) {
        return rooms[0].images[0];
      }
      return null;
    } catch (err) {
      console.error(`fetchPreviewImage for hotel ${hotelId} - Error:`, err);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllPreviewImages = async () => {
      const imagePromises = hotels.map(async (hotel) => {
        const image = await fetchPreviewImage(hotel._id);
        return { hotelId: hotel._id, image };
      });

      const results = await Promise.all(imagePromises);
      const newPreviewImages = results.reduce((acc, { hotelId, image }) => {
        if (image) acc[hotelId] = image;
        return acc;
      }, {});

      setPreviewImages(newPreviewImages);
    };

    if (hotels.length > 0 && !selectedState && !selectedCity) {
      fetchAllPreviewImages();
    }
  }, [hotels, selectedState, selectedCity]);

  const toggleHotelDetails = (hotelId) => {
    setExpandedHotels((prev) => {
      const newExpandedHotels = { ...prev, [hotelId]: !prev[hotelId] };
      if (newExpandedHotels[hotelId]) {
        fetchRooms(hotelId);
      } else {
        setRooms([]);
      }
      return newExpandedHotels;
    });
  };

  const handlePrevImage = (roomId, totalImages) => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev[roomId] === 0 ? totalImages - 1 : prev[roomId] - 1;
      return { ...prev, [roomId]: newIndex };
    });
  };

  const handleNextImage = (roomId, totalImages) => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev[roomId] === totalImages - 1 ? 0 : prev[roomId] + 1;
      return { ...prev, [roomId]: newIndex };
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const safeRating = rating ?? 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i}>
          {i <= safeRating ? (
            <FaStar className={`${isDarkMode ? "text-yellow-400" : "text-yellow-500"}`} />
          ) : (
            <FaRegStar className={`${isDarkMode ? "text-gray-600" : "text-gray-300"}`} />
          )}
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  const filteredHotels = (Array.isArray(hotels) ? hotels : [])
    .filter((hotel) => {
      try {
        const hotelRating = hotel.rating ?? 0;
        const meetsRatingFilter = filterRating === 0 || hotelRating >= filterRating;
        const hotelName = hotel.name || "";
        const meetsSearchFilter = hotelName.toLowerCase().includes(searchTerm.toLowerCase());
        return meetsRatingFilter && meetsSearchFilter;
      } catch (err) {
        console.error("Error filtering hotel:", hotel, err);
        return false;
      }
    })
    .sort((a, b) => {
      const ratingA = a.rating ?? 0;
      const ratingB = b.rating ?? 0;
      if (sortOrder === "asc") {
        return ratingA - ratingB;
      } else if (sortOrder === "desc") {
        return ratingB - ratingA;
      }
      return 0;
    });

  useEffect(() => {
    if (scrollPositionRef.current !== 0) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: "smooth" });
    }
  }, [rooms]);

  return (
    <section>
      {error && (
        <div
          className={`${
            isDarkMode ? "bg-red-900/20 border-red-500/50" : "bg-red-100 border-red-400"
          } border rounded-lg p-4 mb-8`}
        >
          <p className={`${isDarkMode ? "text-red-400" : "text-red-600"} text-center`}>{error}</p>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center py-12">
          <div
            className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 ${
              isDarkMode ? "border-blue-400" : "border-blue-600"
            }`}
          ></div>
        </div>
      ) : (
        <>
          {!selectedState && !selectedCity ? (
            <div className="mb-12">
              <h3
                className={`text-3xl font-bold mb-6 text-center ${
                  isDarkMode ? "text-blue-300" : "text-blue-600"
                }`}
              >
                Featured Hotels
              </h3>
              {hotels.length === 0 ? (
                <div
                  className={`${
                    isDarkMode ? "bg-gray-800/70 border-gray-700/30" : "bg-gray-100 border-gray-200"
                  } rounded-xl p-12 text-center shadow-lg border`}
                >
                  <FaHotel
                    className={`text-5xl mx-auto mb-4 ${
                      isDarkMode ? "text-blue-400/50" : "text-blue-600/50"
                    }`}
                  />
                  <p className={`text-xl mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    No hotels available.
                  </p>
                  <p className={`${isDarkMode ? "text-blue-300/70" : "text-blue-600/70"}`}>
                    Please check if the server is running or try again later.
                  </p>
                </div>
              ) : filteredHotels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredHotels.map((hotel) => (
                    <div
                      key={hotel._id}
                      className={`relative rounded-xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl border ${
                        isDarkMode
                          ? "bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/30 hover:shadow-blue-900/50"
                          : "bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:shadow-blue-600/30"
                      }`}
                    >
                      <div className="relative h-64 w-full">
                        {previewImages[hotel._id] ? (
                          <img
                            src={previewImages[hotel._id]}
                            alt={`${hotel.name || "Hotel"} featured image`}
                            className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                          />
                        ) : (
                          <div
                            className={`w-full h-full flex items-center justify-center ${
                              isDarkMode ? "bg-gray-800 text-gray-600" : "bg-gray-200 text-gray-400"
                            }`}
                          >
                            No Image Available
                          </div>
                        )}
                        <div
                          className={`absolute inset-0 ${
                            isDarkMode
                              ? "bg-gradient-to-t from-gray-900/80 to-transparent"
                              : "bg-gradient-to-t from-gray-200/80 to-transparent"
                          }`}
                        ></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className={`${isDarkMode ? "text-white" : "text-gray-900"} text-xl font-semibold`}>
                            {hotel.name || "Unknown Hotel"}
                          </h4>
                          <p
                            className={`text-sm flex items-center ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            <FaMapMarkerAlt
                              className={`mr-2 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                            />
                            {hotel.city.name || "Unknown City"}
                          </p>
                          <div className="flex items-center mt-2">
                            {renderStars(hotel.rating)}
                            <span
                              className={`ml-2 text-sm ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              ({hotel.rating ?? "N/A"})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`${
                    isDarkMode ? "bg-gray-800/70 border-gray-700/30" : "bg-gray-100 border-gray-200"
                  } rounded-xl p-12 text-center shadow-lg border`}
                >
                  <FaHotel
                    className={`text-5xl mx-auto mb-4 ${
                      isDarkMode ? "text-blue-400/50" : "text-blue-600/50"
                    }`}
                  />
                  <p className={`text-xl mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    No hotels match your filters.
                  </p>
                  <p className={`${isDarkMode ? "text-blue-300/70" : "text-blue-600/70"}`}>
                    Please adjust your filters or check back later.
                  </p>
                </div>
              )}
            </div>
          ) : hotels.length === 0 ? (
            <div
              className={`${
                isDarkMode ? "bg-gray-800/70 border-gray-700/30" : "bg-gray-100 border-gray-200"
              } rounded-xl p-12 text-center shadow-lg border`}
            >
              <FaHotel
                className={`text-5xl mx-auto mb-4 ${
                  isDarkMode ? "text-blue-400/50" : "text-blue-600/50"
                }`}
              />
              <p className={`text-xl mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                No hotels available.
              </p>
              <p className={`${isDarkMode ? "text-blue-300/70" : "text-blue-600/70"}`}>
                Please check if the server is running or try again later.
              </p>
            </div>
          ) : filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel._id}
                  className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border ${
                    isDarkMode
                      ? "bg-gradient-to-r from-gray-800/90 to-gray-800/80 border-gray-700/50 hover:shadow-blue-900/30"
                      : "bg-gradient-to-r from-white to-gray-50 border-gray-200 hover:shadow-blue-600/30"
                  } backdrop-blur-sm`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3
                        className={`text-2xl font-semibold text-transparent bg-clip-text ${
                          isDarkMode
                            ? "bg-gradient-to-r from-blue-300 to-purple-400"
                            : "bg-gradient-to-r from-blue-600 to-purple-600"
                        }`}
                      >
                        {hotel.name || "Unknown Hotel"}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollPositionRef.current = window.scrollY;
                          toggleHotelDetails(hotel._id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollPositionRef.current = window.scrollY;
                            toggleHotelDetails(hotel._id);
                          }
                        }}
                        className={`text-white px-5 py-2 rounded-full transition-all duration-200 shadow-md text-sm font-medium ${
                          isDarkMode
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-900/50"
                            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-blue-600/50"
                        }`}
                        aria-expanded={!!expandedHotels[hotel._id]}
                        aria-controls={`hotel-details-${hotel._id}`}
                      >
                        {expandedHotels[hotel._id] ? "Hide Rooms" : "View Rooms"}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="col-span-2">
                        <p
                          className={`flex items-start mb-2 ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          <FaMapMarkerAlt
                            className={`mt-1 mr-2 ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            } flex-shrink-0`}
                          />
                          <span>
                            <strong
                              className={`${isDarkMode ? "text-blue-200" : "text-blue-600"}`}
                            >
                              Address:
                            </strong>{" "}
                            {hotel.address || "N/A"}
                          </span>
                        </p>
                        <div className={`mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                          <span className="flex items-center mb-1">
                            <strong
                              className={`mr-2 ${isDarkMode ? "text-blue-200" : "text-blue-600"}`}
                            >
                              Rating:
                            </strong>
                            {renderStars(hotel.rating)}
                          </span>
                        </div>
                        <p
                          className={`flex items-center ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          <strong
                            className={`mr-2 ${isDarkMode ? "text-blue-200" : "text-blue-600"}`}
                          >
                            Price Range:
                          </strong>
                          <span
                            className={`bg-clip-text text-transparent font-semibold ${
                              isDarkMode
                                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                                : "bg-gradient-to-r from-green-500 to-emerald-600"
                            }`}
                          >
                            ₹{hotel.priceRange?.min ?? "N/A"} - ₹{hotel.priceRange?.max ?? "N/A"}
                          </span>
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {hotel.amenities && hotel.amenities.length > 0 ? (
                            hotel.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  isDarkMode
                                    ? "bg-blue-900/40 text-blue-200"
                                    : "bg-blue-100/80 text-blue-600"
                                }`}
                              >
                                {amenity === "Pool" && (
                                  <FaSwimmingPool
                                    className={`mr-1 ${
                                      isDarkMode ? "text-blue-400" : "text-blue-600"
                                    }`}
                                  />
                                )}
                                {amenity === "Parking" && (
                                  <FaParking
                                    className={`mr-1 ${
                                      isDarkMode ? "text-blue-400" : "text-blue-600"
                                    }`}
                                  />
                                )}
                                {amenity === "Restaurant" && (
                                  <FaCoffee
                                    className={`mr-1 ${
                                      isDarkMode ? "text-blue-400" : "text-blue-600"
                                    }`}
                                  />
                                )}
                                {amenity}
                              </span>
                            ))
                          ) : (
                            <span className={`${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                              No amenities available
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                          <FaHotel
                            className={`inline mr-2 ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          />
                          <strong
                            className={`${isDarkMode ? "text-blue-200" : "text-blue-600"}`}
                          >
                            Total Rooms:
                          </strong>{" "}
                          {hotel.totalRooms ?? "N/A"}
                        </p>
                        <p className={`${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                          <strong
                            className={`${isDarkMode ? "text-blue-200" : "text-blue-600"}`}
                          >
                            Contact:
                          </strong>{" "}
                          {(hotel.contact?.phone || hotel.contact?.email) ? (
                            <span
                              className={`${isDarkMode ? "text-blue-300" : "text-blue-600"}`}
                            >
                              {[hotel.contact?.phone, hotel.contact?.email]
                                .filter(Boolean)
                                .join(" | ")}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  {expandedHotels[hotel._id] && (
                    <div
                      id={`hotel-details-${hotel._id}`}
                      className={`p-6 border-t transition-all duration-300 ease-in-out animate-fadeIn ${
                        isDarkMode ? "bg-gray-900/80 border-gray-700/50" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <h4
                        className={`text-xl font-semibold mb-6 flex items-center ${
                          isDarkMode ? "text-blue-300" : "text-blue-600"
                        }`}
                      >
                        <FaBed className="mr-2" /> Available Rooms
                      </h4>
                      {roomLoading ? (
                        <div className="flex justify-center py-8">
                          <div
                            className={`animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 ${
                              isDarkMode ? "border-blue-400" : "border-blue-600"
                            }`}
                          ></div>
                        </div>
                      ) : rooms.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {rooms.map((room) => (
                            <div
                              key={room._id}
                              className={`rounded-xl p-5 shadow-lg transition-all duration-200 hover:shadow-xl border ${
                                isDarkMode
                                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/30 hover:shadow-blue-900/20"
                                  : "bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:shadow-blue-600/20"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-4">
                                <h5
                                  className={`text-lg font-medium ${
                                    isDarkMode ? "text-blue-200" : "text-blue-600"
                                  }`}
                                >
                                  Room {room.roomNumber || "N/A"}{" "}
                                  <span
                                    className={`${isDarkMode ? "text-blue-400" : "text-blue-500"}`}
                                  >
                                    ({room.type || "Standard"})
                                  </span>
                                </h5>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    room.isAvailable
                                      ? isDarkMode
                                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                                        : "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                                      : isDarkMode
                                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                                      : "bg-gradient-to-r from-red-400 to-red-500 text-white"
                                  }`}
                                >
                                  {room.isAvailable ? "Available" : "Booked"}
                                </span>
                              </div>
                              {room.images && room.images.length > 0 ? (
                                <div
                                  className={`relative mb-4 rounded-lg overflow-hidden shadow-inner ${
                                    isDarkMode ? "shadow-gray-900" : "shadow-gray-300"
                                  }`}
                                >
                                  <img
                                    src={room.images[currentImageIndex[room._id] || 0]}
                                    alt={`Room ${room.roomNumber || "N/A"} image`}
                                    className="w-full h-52 object-cover transition-all duration-700 hover:scale-110"
                                  />
                                  {room.images.length > 1 && (
                                    <>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handlePrevImage(room._id, room.images.length);
                                        }}
                                        className={`absolute top-1/2 left-2 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-200 ${
                                          isDarkMode
                                            ? "bg-gray-900/70 text-white hover:bg-gray-800"
                                            : "bg-gray-200/70 text-gray-800 hover:bg-gray-300"
                                        }`}
                                        aria-label="Previous image"
                                      >
                                        <FaArrowLeft />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleNextImage(room._id, room.images.length);
                                        }}
                                        className={`absolute top-1/2 right-2 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-200 ${
                                          isDarkMode
                                            ? "bg-gray-900/70 text-white hover:bg-gray-800"
                                            : "bg-gray-200/70 text-gray-800 hover:bg-gray-300"
                                        }`}
                                        aria-label="Next image"
                                      >
                                        <FaArrowRight />
                                      </button>
                                    </>
                                  )}
                                  <div
                                    className={`absolute bottom-0 left-0 right-0 p-3 ${
                                      isDarkMode
                                        ? "bg-gradient-to-t from-gray-900/90 to-transparent"
                                        : "bg-gradient-to-t from-gray-200/90 to-transparent"
                                    }`}
                                  >
                                    <p
                                      className={`font-medium flex items-center ${
                                        isDarkMode ? "text-white" : "text-gray-900"
                                      }`}
                                    >
                                      <FaBed
                                        className={`mr-2 ${
                                          isDarkMode ? "text-blue-400" : "text-blue-600"
                                        }`}
                                      />
                                      <span
                                        className={`bg-clip-text text-transparent font-bold ${
                                          isDarkMode
                                            ? "bg-gradient-to-r from-green-400 to-blue-400"
                                            : "bg-gradient-to-r from-green-500 to-blue-500"
                                        }`}
                                      >
                                        ₹{room.price || "N/A"}
                                      </span>
                                      <span
                                        className={`text-xs ml-2 ${
                                          isDarkMode ? "text-gray-300" : "text-gray-600"
                                        }`}
                                      >
                                        per night
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className={`w-full h-52 rounded-lg flex items-center justify-center mb-4 shadow-inner ${
                                    isDarkMode
                                      ? "bg-gray-800 text-gray-600 shadow-gray-900"
                                      : "bg-gray-200 text-gray-400 shadow-gray-300"
                                  }`}
                                >
                                  No Images Available
                                </div>
                              )}
                              <div className={`grid grid-cols-1 gap-3 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                                <p className="flex items-center">
                                  <strong
                                    className={`min-w-24 ${isDarkMode ? "text-blue-200" : "text-blue-600"}`}
                                  >
                                    Capacity:
                                  </strong>
                                  <span className="flex items-center">
                                    {Array(room.capacity || 1)
                                      .fill(null)
                                      .map((_, i) => (
                                        <FaUser
                                          key={i}
                                          className={`mr-1 ${
                                            isDarkMode ? "text-gray-400" : "text-gray-500"
                                          }`}
                                        />
                                      ))}
                                    {room.capacity || "N/A"} guests
                                  </span>
                                </p>
                                <div>
                                  <strong
                                    className={`block mb-2 ${isDarkMode ? "text-blue-200" : "text-blue-600"}`}
                                  >
                                    Amenities:
                                  </strong>
                                  <div className="flex flex-wrap gap-2">
                                    {room.amenities?.length > 0 ? (
                                      room.amenities.map((amenity, index) => {
                                        const iconMap = {
                                          WiFi: (
                                            <FaWifi
                                              className={`${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                                            />
                                          ),
                                          TV: (
                                            <FaTv
                                              className={`${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                                            />
                                          ),
                                          "Air Conditioning": (
                                            <FaSnowflake
                                              className={`${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                                            />
                                          ),
                                          "Mini Bar": (
                                            <FaGlassMartini
                                              className={`${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                                            />
                                          ),
                                          "Room Service": (
                                            <FaConciergeBell
                                              className={`${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                                            />
                                          ),
                                          Balcony: (
                                            <FaDoorOpen
                                              className={`${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                                            />
                                          ),
                                        };
                                        return (
                                          <span
                                            key={index}
                                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                                              isDarkMode ? "bg-gray-800" : "bg-gray-100"
                                            }`}
                                          >
                                            {iconMap[amenity] || null} {amenity}
                                          </span>
                                        );
                                      })
                                    ) : (
                                      "N/A"
                                    )}
                                  </div>
                                </div>
                                <p className="mt-1">
                                  <strong
                                    className={`${isDarkMode ? "text-blue-200" : "text-blue-600"}`}
                                  >
                                    Description:
                                  </strong>{" "}
                                  <span
                                    className={`italic ${
                                      isDarkMode ? "text-gray-300" : "text-gray-500"
                                    }`}
                                  >
                                    {room.description || "No description available."}
                                  </span>
                                </p>
                              </div>
                              {room.isAvailable && (
                                <button
                                  onClick={() => onBookNow(room)}
                                  className={`mt-4 w-full text-white py-3 rounded-lg transition-all duration-200 shadow-lg font-medium flex items-center justify-center ${
                                    isDarkMode
                                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-900/50"
                                      : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-blue-600/50"
                                  }`}
                                >
                                  <FaCalendarAlt className="mr-2" /> Book Now
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className={`rounded-xl p-8 text-center border ${
                            isDarkMode
                              ? "bg-gray-800/50 border-gray-700/30"
                              : "bg-gray-100 border-gray-200"
                          }`}
                        >
                          <FaBed
                            className={`text-4xl mx-auto mb-4 ${
                              isDarkMode ? "text-blue-400/50" : "text-blue-600/50"
                            }`}
                          />
                          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            No active rooms available for this hotel.
                          </p>
                          <p
                            className={`mt-2 ${isDarkMode ? "text-blue-300/70" : "text-blue-600/70"}`}
                          >
                            Please check back later or try another hotel.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`${
                isDarkMode ? "bg-gray-800/70 border-gray-700/30" : "bg-gray-100 border-gray-200"
              } rounded-xl p-12 text-center shadow-lg border`}
            >
              <FaHotel
                className={`text-5xl mx-auto mb-4 ${
                  isDarkMode ? "text-blue-400/50" : "text-blue-600/50"
                }`}
              />
              <p className={`text-xl mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                No hotels match your filters.
              </p>
              <p className={`${isDarkMode ? "text-blue-300/70" : "text-blue-600/70"}`}>
                Please adjust your filters or check back later.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default HotelList;