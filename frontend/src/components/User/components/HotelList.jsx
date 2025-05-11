import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt, FaHotel, FaStar, FaBed, FaWifi, FaTv,
  FaSnowflake, FaGlassMartini, FaConciergeBell, FaDoorOpen,
  FaArrowRight, FaArrowLeft, FaRegStar, FaCoffee, FaSwimmingPool,
  FaParking, FaUser, FaCalendarAlt,
} from "react-icons/fa";

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
  const baseURL = "http://localhost:6969";
  const scrollPositionRef = useRef(0);

  const fetchRooms = async (hotelId) => {
    if (!hotelId) {
      setRooms([]);
      return;
    }
    setRoomLoading(true);
    try {
      const response = await axios.get(`${baseURL}/api/${hotelId}/rooms`);
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
          {i <= safeRating ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray-400" />}
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
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-8">
          <p className="text-red-400 text-center">{error}</p>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          {!selectedState && !selectedCity ? (
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-blue-300 mb-6 text-center">Featured Hotels</h3>
              {hotels.length === 0 ? (
                <div className="bg-gray-800/70 rounded-xl p-12 text-center shadow-lg border border-gray-700/30">
                  <FaHotel className="text-5xl text-blue-400/50 mx-auto mb-4" />
                  <p className="text-gray-300 text-xl mb-2">No hotels available.</p>
                  <p className="text-blue-300/70">Please check if the server is running or try again later.</p>
                </div>
              ) : filteredHotels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredHotels.map((hotel) => (
                    <div
                      key={hotel._id}
                      className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-blue-900/50 border border-gray-700/30"
                    >
                      <div className="relative h-64 w-full">
                        {hotel.rooms && hotel.rooms.length > 0 && hotel.rooms[0].images && hotel.rooms[0].images.length > 0 ? (
                          <img
                            src={hotel.rooms[0].images[0]}
                            alt={`${hotel.name || "Hotel"} featured image`}
                            className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                            No Image Available
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="text-xl font-semibold text-white">{hotel.name || "Unknown Hotel"}</h4>
                          <p className="text-sm text-gray-300 flex items-center">
                            <FaMapMarkerAlt className="mr-2 text-blue-400" />
                            {hotel.cityId?.name || "Unknown City"}
                          </p>
                          <div className="flex items-center mt-2">
                            {renderStars(hotel.rating)}
                            <span className="ml-2 text-sm text-gray-300">({hotel.rating ?? "N/A"})</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <button
                          onClick={() => {
                            scrollPositionRef.current = window.scrollY;
                            toggleHotelDetails(hotel._id);
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-blue-900/50 font-medium"
                        >
                          Explore Rooms
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-800/70 rounded-xl p-12 text-center shadow-lg border border-gray-700/30">
                  <FaHotel className="text-5xl text-blue-400/50 mx-auto mb-4" />
                  <p className="text-gray-300 text-xl mb-2">No hotels match your filters.</p>
                  <p className="text-blue-300/70">Please adjust your filters or check back later.</p>
                </div>
              )}
            </div>
          ) : hotels.length === 0 ? (
            <div className="bg-gray-800/70 rounded-xl p-12 text-center shadow-lg border border-gray-700/30">
              <FaHotel className="text-5xl text-blue-400/50 mx-auto mb-4" />
              <p className="text-gray-300 text-xl mb-2">No hotels available.</p>
              <p className="text-blue-300/70">Please check if the server is running or try again later.</p>
            </div>
          ) : filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel._id}
                  className="bg-gradient-to-r from-gray-800/90 to-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-blue-900/30 hover:shadow-xl border border-gray-700/50"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
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
                        className="text-white px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-md hover:shadow-blue-900/50 text-sm font-medium"
                        aria-expanded={!!expandedHotels[hotel._id]}
                        aria-controls={`hotel-details-${hotel._id}`}
                      >
                        {expandedHotels[hotel._id] ? "Hide Rooms" : "View Rooms"}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="col-span-2">
                        <p className="text-gray-200 flex items-start mb-2">
                          <FaMapMarkerAlt className="mt-1 mr-2 text-blue-400 flex-shrink-0" />
                          <span>
                            <strong className="text-blue-200">Address:</strong> {hotel.address || "N/A"}
                          </span>
                        </p>
                        <div className="text-gray-200 mb-2">
                          <span className="flex items-center mb-1">
                            <strong className="text-blue-200 mr-2">Rating:</strong>
                            {renderStars(hotel.rating)}
                          </span>
                        </div>
                        <p className="text-gray-200 flex items-center">
                          <strong className="text-blue-200 mr-2">Price Range:</strong>
                          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-semibold">
                            ₹{hotel.priceRange?.min ?? "N/A"} - ₹{hotel.priceRange?.max ?? "N/A"}
                          </span>
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {hotel.amenities && hotel.amenities.length > 0 ? (
                            hotel.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-900/40 text-blue-200"
                              >
                                {amenity === "Pool" && <FaSwimmingPool className="mr-1" />}
                                {amenity === "Parking" && <FaParking className="mr-1" />}
                                {amenity === "Restaurant" && <FaCoffee className="mr-1" />}
                                {amenity}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-300">No amenities available</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-200 mb-2">
                          <FaHotel className="inline mr-2 text-blue-400" />
                          <strong className="text-blue-200">Total Rooms:</strong>{" "}
                          {hotel.totalRooms ?? "N/A"}
                        </p>
                        <p className="text-gray-200">
                          <strong className="text-blue-200">Contact:</strong>{" "}
                          {(hotel.contact?.phone || hotel.contact?.email) ? (
                            <span className="text-blue-300">
                              {[hotel.contact?.phone, hotel.contact?.email].filter(Boolean).join(" | ")}
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
                      className="bg-gray-900/80 p-6 border-t border-gray-700/50 transition-all duration-300 ease-in-out animate-fadeIn"
                    >
                      <h4 className="text-xl font-semibold text-blue-300 mb-6 flex items-center">
                        <FaBed className="mr-2" /> Available Rooms
                      </h4>
                      {roomLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                        </div>
                      ) : rooms.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {rooms.map((room) => (
                            <div
                              key={room._id}
                              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg transition-all duration-200 hover:shadow-blue-900/20 hover:shadow-lg border border-gray-700/30"
                            >
                              <div className="flex justify-between items-center mb-4">
                                <h5 className="text-lg font-medium text-blue-200">
                                  Room {room.roomNumber || "N/A"}{" "}
                                  <span className="text-blue-400">({room.type || "Standard"})</span>
                                </h5>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    room.isAvailable
                                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                                      : "bg-gradient-to-r from-red-500 to-red-600 text-white"
                                  }`}
                                >
                                  {room.isAvailable ? "Available" : "Booked"}
                                </span>
                              </div>
                              {room.images && room.images.length > 0 ? (
                                <div className="relative mb-4 rounded-lg overflow-hidden shadow-inner shadow-gray-900">
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
                                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-900/70 text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                                        aria-label="Previous image"
                                      >
                                        <FaArrowLeft />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleNextImage(room._id, room.images.length);
                                        }}
                                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-900/70 text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                                        aria-label="Next image"
                                      >
                                        <FaArrowRight />
                                      </button>
                                    </>
                                  )}
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-3">
                                    <p className="text-white font-medium flex items-center">
                                      <FaBed className="mr-2 text-blue-400" />
                                      <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">
                                        ₹{room.price || "N/A"}
                                      </span>
                                      <span className="text-xs ml-2 text-gray-300">per night</span>
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="w-full h-52 bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 shadow-inner shadow-gray-900 mb-4">
                                  No Images Available
                                </div>
                              )}
                              <div className="grid grid-cols-1 gap-3 text-gray-200">
                                <p className="flex items-center">
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
                                <div>
                                  <strong className="text-blue-200 block mb-2">Amenities:</strong>
                                  <div className="flex flex-wrap gap-2">
                                    {room.amenities?.length > 0 ? (
                                      room.amenities.map((amenity, index) => {
                                        const iconMap = {
                                          WiFi: <FaWifi className="text-blue-400" />,
                                          TV: <FaTv className="text-blue-400" />,
                                          "Air Conditioning": <FaSnowflake className="text-blue-400" />,
                                          "Mini Bar": <FaGlassMartini className="text-blue-400" />,
                                          "Room Service": <FaConciergeBell className="text-blue-400" />,
                                          Balcony: <FaDoorOpen className="text-blue-400" />,
                                        };
                                        return (
                                          <span
                                            key={index}
                                            className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-sm"
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
                                  <strong className="text-blue-200">Description:</strong>{" "}
                                  <span className="text-gray-300 italic">
                                    {room.description || "No description available."}
                                  </span>
                                </p>
                              </div>
                              {room.isAvailable && (
                                <button
                                  onClick={() => onBookNow(room)}
                                  className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-900/50 font-medium flex items-center justify-center"
                                >
                                  <FaCalendarAlt className="mr-2" /> Book Now
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700/30">
                          <FaBed className="text-4xl text-blue-400/50 mx-auto mb-4" />
                          <p className="text-gray-300 text-lg">No active rooms available for this hotel.</p>
                          <p className="text-blue-300/70 mt-2">Please check back later or try another hotel.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/70 rounded-xl p-12 text-center shadow-lg border border-gray-700/30">
              <FaHotel className="text-5xl text-blue-400/50 mx-auto mb-4" />
              <p className="text-gray-300 text-xl mb-2">No hotels match your filters.</p>
              <p className="text-blue-300/70">Please adjust your filters or check back later.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default HotelList;