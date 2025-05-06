 

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt, FaHotel, FaStar, FaBed, FaWifi, FaTv,
  FaSnowflake, FaGlassMartini, FaConciergeBell, FaDoorOpen,
  FaArrowRight, FaArrowLeft, FaSignOutAlt, FaSearch, FaUser,
  FaRegStar, FaCoffee, FaSwimmingPool, FaParking, FaArrowDown,
  FaSortAmountUp, FaSortAmountDown, FaCalendarAlt, FaTimes,
  FaUsers, FaPhone, FaChild
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserPanel = () => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [expandedHotels, setExpandedHotels] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [filterRating, setFilterRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    members: 1,
    checkIn: "",
    checkOut: "",
    hasChild: false,
    phone: "",
  });

  const baseURL = "http://localhost:6969";
  const scrollPositionRef = useRef(0);

  // Fetch logged-in user's ID from token
  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded._id;
    }
    return null;
  };

  // Fetch states
  const fetchStates = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/states`);
      const activeStates = response.data.filter((s) => s.isActive);
      setStates(activeStates);
    } catch (err) {
      console.error("fetchStates - Error:", err);
      setError(err.response?.data?.message || "Failed to fetch states.");
    }
  };

  // Fetch cities
  const fetchCities = async (stateId) => {
    if (!stateId) {
      setCities([]);
      setHotels([]);
      setRooms([]);
      setExpandedHotels({});
      return;
    }
    try {
      const response = await axios.get(`${baseURL}/api/states/${stateId}/cities`);
      const activeCities = response.data.filter((c) => c.isActive);
      setCities(activeCities);
    } catch (err) {
      console.error("fetchCities - Error:", err);
      setError(err.response?.data?.message || "Failed to fetch cities.");
    }
  };

  // Fetch hotels by city
  const fetchHotels = async (cityId) => {
    if (!cityId) {
      setHotels([]);
      setRooms([]);
      setExpandedHotels({});
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/api/cities/${cityId}/hotels`);
      const activeHotels = response.data.filter((h) => h.isActive);
      setHotels(activeHotels);
      setExpandedHotels({});
    } catch (err) {
      console.error("fetchHotels - Error:", err);
      setError(err.response?.data?.message || "Failed to fetch hotels.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all hotels
  const fetchAllHotels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/api/hotels`);
      console.log("fetchAllHotels - Response:", response.data); // Debugging log
      const activeHotels = response.data.filter((h) => h.isActive);
      console.log("fetchAllHotels - Active Hotels:", activeHotels); // Debugging log
      setHotels(activeHotels);
      setExpandedHotels({});
    } catch (err) {
      console.error("fetchAllHotels - Error:", err);
      setError(err.response?.data?.message || "Failed to fetch hotels. Please ensure the server is running and the API endpoint is correct.");
    } finally {
      setLoading(false);
    }
    console.log("Hotels state:", hotels);
  };

  // Fetch rooms
  const fetchRooms = async (hotelId) => {
    if (!hotelId) {
      setRooms([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/api/${hotelId}/rooms`);
      const activeRooms = response.data.filter((r) => r.isActive);
      setRooms(activeRooms);
      const initialImageIndex = activeRooms.reduce((acc, room) => {
        acc[room._id] = 0;
        return acc;
      }, {});
      setCurrentImageIndex(initialImageIndex);
    } catch (err) {
      console.error("fetchRooms - Error:", err);
      setError(err.response?.data?.message || "Failed to fetch rooms.");
    } finally {
      setLoading(false);
    }
  };

  const toggleHotelDetails = (hotelId) => {
    setExpandedHotels((prev) => ({
      ...prev,
      [hotelId]: !prev[hotelId],
    }));
  };

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setSelectedCity("");
    setHotels([]);
    setRooms([]);
    setExpandedHotels({});
    if (stateId) {
      await fetchCities(stateId);
    } else {
      await fetchAllHotels();
      setFilterRating(0);
      setSearchTerm("");
      setSortOrder("");
    }
  };

  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setRooms([]);
    if (cityId) {
      await fetchHotels(cityId);
    } else {
      await fetchAllHotels();
      setFilterRating(0);
      setSearchTerm("");
      setSortOrder("");
    }
  };

  const handlePrevImage = (roomId, totalImages) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [roomId]: prev[roomId] === 0 ? totalImages - 1 : prev[roomId] - 1,
    }));
  };

  const handleNextImage = (roomId, totalImages) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [roomId]: prev[roomId] === totalImages - 1 ? 0 : prev[roomId] + 1,
    }));
  };

  // Filter hotels with safeguard for undefined properties
  const filteredHotels = hotels
    .filter(hotel => {
      try {
        const hotelRating = hotel.rating ?? 0;
        const meetsRatingFilter = filterRating === 0 || hotelRating >= filterRating;
        const hotelName = hotel.name || ""; // Safeguard for undefined name
        const meetsSearchFilter = hotelName.toLowerCase().includes(searchTerm.toLowerCase());
        return meetsRatingFilter && meetsSearchFilter;
      } catch (err) {
        console.error("Error filtering hotel:", hotel, err);
        return false; // Exclude hotel if filtering fails
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
    console.log("Filtered hotels:", filteredHotels);

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error("handleLogout - Error:", err);
      setError(err.response?.data?.message || "Failed to log out.");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const safeRating = rating ?? 0; // Safeguard for undefined rating
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i}>
          {i <= safeRating ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray-400" />}
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("User not logged in.");
      }
      const bookingData = {
        userId,
        roomId: selectedRoom._id,
        name: bookingForm.name,
        members: parseInt(bookingForm.members),
        checkIn: new Date(bookingForm.checkIn),
        checkOut: new Date(bookingForm.checkOut),
        hasChild: bookingForm.hasChild,
        phone: bookingForm.phone,
      };
      const response = await axios.post(`${baseURL}/api/bookings`, bookingData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert(response.data.message);
      setShowBookingModal(false);
      setBookingForm({
        name: "",
        members: 1,
        checkIn: "",
        checkOut: "",
        hasChild: false,
        phone: "",
      });
    } catch (err) {
      console.error("handleBookingSubmit - Error:", err);
      setError(err.response?.data?.message || "Failed to submit booking.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    fetchStates();
    fetchAllHotels();
  }, []);

  useEffect(() => {
    if (scrollPositionRef.current !== 0) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: "smooth" });
    }
  }, [rooms]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-gray-100 font-sans">
      <header className="bg-slate-800/90 backdrop-blur-md shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
            <FaHotel className="mr-2 text-blue-400" /> My Hotel
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-300 hover:text-white bg-red-600/90 hover:bg-red-600 px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden mb-8">
        <div className="bg-[url('https://images.unsplash.com/photo-1571896349842-33c89424de2d')] bg-cover bg-center h-80">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          <div className="absolute inset-0 bg-blue-900/30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-3xl px-4">
              <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">Find Your Perfect Stay</h1>
              <p className="text-xl text-blue-100 mb-8 drop-shadow">Discover the best hotels and accommodations for your next adventure</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-4 pb-16">
        {/* Search Section */}
        <section className="bg-gradient-to-r from-slate-800/90 to-blue-900/90 rounded-2xl p-8 shadow-xl mb-10 backdrop-blur-md transform -mt-24 mx-4 lg:mx-auto">
          <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
            <FaSearch className="mr-2" /> Search Hotels 
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="state-select" className="block text-sm font-semibold text-gray-200 mb-2">
                Select State
              </label>
              <div className="relative">
                <select
                  id="state-select"
                  value={selectedState}
                  onChange={handleStateChange}
                  className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 appearance-none"
                  aria-label="Select state"
                >
                  <option value="">-- All States --</option>
                  {states.map((state) => (
                    <option key={state._id} value={state._id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaMapMarkerAlt className="text-blue-400" />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="city-select" className="block text-sm font-semibold text-gray-200 mb-2">
                Select City
              </label>
              <div className="relative">
                <select
                  id="city-select"
                  value={selectedCity}
                  onChange={handleCityChange}
                  disabled={!selectedState}
                  className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:bg-slate-600/50 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 appearance-none"
                  aria-label="Select city"
                >
                  <option value="">-- All Cities --</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaMapMarkerAlt className="text-blue-400" />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="search-hotel" className="block text-sm font-semibold text-gray-200 mb-2">
                Search Hotel
              </label>
              <div className="relative">
                <input
                  id="search-hotel"
                  type="text"
                  placeholder="Enter hotel name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                  aria-label="Search hotel by name"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaSearch className="text-blue-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200"
            >
              {showFilters ? "Hide Filters" : "Show Advanced Filters"}
              <FaArrowDown className={`ml-2 transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {showFilters && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-600/50">
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Minimum Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setFilterRating(star)}
                        className={`p-2 rounded-md transition-all duration-200 ${
                          filterRating >= star ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'
                        }`}
                        aria-label={`Filter hotels with minimum rating of ${star} stars`}
                      >
                        <FaStar />
                      </button>
                    ))}
                    <button
                      onClick={() => setFilterRating(0)}
                      className="ml-2 text-xs text-gray-300 hover:text-white px-3 py-1 rounded-full bg-slate-700/80 hover:bg-slate-600 transition-all duration-200"
                    >
                      Clear
                    </button>
                  </div>
                  {filterRating > 0 && (
                    <p className="mt-2 text-sm text-gray-400">
                      Showing hotels with {filterRating} {filterRating === 1 ? "star" : "stars"} or higher
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Sort by Rating
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSortOrder(sortOrder === "asc" ? "" : "asc")}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                        sortOrder === "asc"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700/80 text-gray-300 hover:bg-slate-600"
                      }`}
                      aria-label="Sort hotels by rating from low to high"
                    >
                      <FaSortAmountUp className="mr-2" /> Low to High
                    </button>
                    <button
                      onClick={() => setSortOrder(sortOrder === "desc" ? "" : "desc")}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                        sortOrder === "desc"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700/80 text-gray-300 hover:bg-slate-600"
                      }`}
                      aria-label="Sort hotels by rating from high to low"
                    >
                      <FaSortAmountDown className="mr-2" /> High to Low
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Hotel Listings Section */}
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
              {/* Default View (Featured Hotels) */}
              {!selectedState && !selectedCity ? (
                <div className="mb-12">
                  <h3 className="text-3xl font-bold text-blue-300 mb-6 text-center">Featured Hotels</h3>
                  {hotels.length === 0 ? (
                    <div className="bg-slate-800/70 rounded-xl p-12 text-center shadow-lg border border-slate-700/30">
                      <FaHotel className="text-5xl text-blue-400/50 mx-auto mb-4" />
                      <p className="text-gray-300 text-xl mb-2">
                        No hotels available.
                      </p>
                      <p className="text-blue-300/70">
                        Please check if the server is running or try again later.
                      </p>
                    </div>
                  ) : filteredHotels.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredHotels.map((hotel) => (
                        <div
                          key={hotel._id}
                          className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-blue-900/50 border border-slate-700/30"
                        >
                          <div className="relative h-64 w-full">
                            {hotel.rooms && hotel.rooms.length > 0 && hotel.rooms[0].images && hotel.rooms[0].images.length > 0 ? (
                              <img
                                src={rooms.images[currentImageIndex[rooms._id] || 0]}
                                alt={`${hotel.name || "Hotel"} featured image`}
                                className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">
                                No Image Available
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h4 className="text-xl font-semibold text-white">{hotel.name || "Unknown Hotel"}</h4>
                              <p className="text-sm text-gray-300 flex items-center">
                                <FaMapMarkerAlt className="mr-2 text-blue-400" />
                                {hotel.city.name || "Unknown City"}
                              </p>
                              <div className="flex items-center mt-2">
                                {renderStars(hotel.rating)}
                                <span className="ml-2 text-sm text-gray-300">
                                  ({hotel.rating ?? "N/A"})
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <button
                              onClick={() => {
                                scrollPositionRef.current = window.scrollY;
                                toggleHotelDetails(hotel._id);
                                if (!expandedHotels[hotel._id]) {
                                  fetchRooms(hotel._id);
                                }
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
                    <div className="bg-slate-800/70 rounded-xl p-12 text-center shadow-lg border border-slate-700/30">
                      <FaHotel className="text-5xl text-blue-400/50 mx-auto mb-4" />
                      <p className="text-gray-300 text-xl mb-2">
                        No hotels match your filters.
                      </p>
                      <p className="text-blue-300/70">
                        Please adjust your filters or check back later.
                      </p>
                    </div>
                  )}
                </div>
              ) : hotels.length === 0 ? (
                <div className="bg-slate-800/70 rounded-xl p-12 text-center shadow-lg border border-slate-700/30">
                  <FaHotel className="text-5xl text-blue-400/50 mx-auto mb-4" />
                  <p className="text-gray-300 text-xl mb-2">
                    No hotels available.
                  </p>
                  <p className="text-blue-300/70">
                    Please check if the server is running or try again later.
                  </p>
                </div>
              ) : filteredHotels.length > 0 ? (
                <div className="grid grid-cols-1 gap-8">
                  {filteredHotels.map((hotel) => (
                    <div
                      key={hotel._id}
                      className="bg-gradient-to-r from-slate-800/90 to-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-blue-900/30 hover:shadow-xl border border-slate-700/50"
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
                              if (!expandedHotels[hotel._id]) {
                                fetchRooms(hotel._id);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                e.stopPropagation();
                                scrollPositionRef.current = window.scrollY;
                                toggleHotelDetails(hotel._id);
                                if (!expandedHotels[hotel._id]) {
                                  fetchRooms(hotel._id);
                                }
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
                          className="bg-slate-900/80 p-6 border-t border-slate-700/50 transition-all duration-300 ease-in-out animate-fadeIn"
                        >
                          <h4 className="text-xl font-semibold text-blue-300 mb-6 flex items-center">
                            <FaBed className="mr-2" /> Available Rooms
                          </h4>
                          {loading ? (
                            <div className="flex justify-center py-8">
                              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                            </div>
                          ) : rooms.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {rooms.map((room) => (
                                <div
                                  key={room._id}
                                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-lg transition-all duration-200 hover:shadow-blue-900/20 hover:shadow-lg border border-slate-700/30"
                                >
                                  <div className="flex justify-between items-center mb-4">
                                    <h5 className="text-lg font-medium text-blue-200">
                                      Room {room.roomNumber || "N/A"}{" "}
                                      <span className="text-blue-400">
                                        ({room.type || "Standard"})
                                      </span>
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
                                    <div className="relative mb-4 rounded-lg overflow-hidden shadow-inner shadow-slate-900">
                                      <img
                                        src={room.images[currentImageIndex[room._id] || 0]}
                                        alt={`Room ${room.roomNumber || "N/A"} image ${
                                          (currentImageIndex[room._id] || 0) + 1
                                        }`}
                                        className="w-full h-52 object-cover transition-all duration-700 hover:scale-110"
                                      />
                                      {room.images.length > 1 && (
                                        <>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handlePrevImage(room._id, room.images.length);
                                            }}
                                            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-slate-900/70 text-white p-2 rounded-full hover:bg-slate-800 transition-colors duration-200"
                                            aria-label="Previous image"
                                          >
                                            <FaArrowLeft />
                                          </button>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleNextImage(room._id, room.images.length);
                                            }}
                                            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-slate-900/70 text-white p-2 rounded-full hover:bg-slate-800 transition-colors duration-200"
                                            aria-label="Next image"
                                          >
                                            <FaArrowRight />
                                          </button>
                                        </>
                                      )}
                                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-3">
                                        <p className="text-white font-medium flex items-center">
                                          <FaBed className="mr-2 text-blue-400" />
                                          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">
                                            ₹{room.price || "N/A"}
                                          </span>
                                          <span className="text-xs ml-2 text-gray-300">
                                            per night
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="w-full h-52 bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 shadow-inner shadow-slate-900 mb-4">
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
                                      <strong className="text-blue-200 block mb-2">
                                        Amenities:
                                      </strong>
                                      <div className="flex flex-wrap gap-2">
                                        {room.amenities?.length > 0 ? (
                                          room.amenities.map((amenity, index) => {
                                            const iconMap = {
                                              WiFi: <FaWifi className="text-blue-400" />,
                                              TV: <FaTv className="text-blue-400" />,
                                              "Air Conditioning": (
                                                <FaSnowflake className="text-blue-400" />
                                              ),
                                              "Mini Bar": <FaGlassMartini className="text-blue-400" />,
                                              "Room Service": (
                                                <FaConciergeBell className="text-blue-400" />
                                              ),
                                              Balcony: <FaDoorOpen className="text-blue-400" />,
                                            };
                                            return (
                                              <span
                                                key={index}
                                                className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full text-sm"
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
                                      onClick={() => {
                                        setSelectedRoom(room);
                                        setShowBookingModal(true);
                                      }}
                                      className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-900/50 font-medium flex items-center justify-center"
                                    >
                                      <FaCalendarAlt className="mr-2" /> Book Now
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700/30">
                              <FaBed className="text-4xl text-blue-400/50 mx-auto mb-4" />
                              <p className="text-gray-300 text-lg">
                                No active rooms available for this hotel.
                              </p>
                              <p className="text-blue-300/70 mt-2">
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
                <div className="bg-slate-800/70 rounded-xl p-12 text-center shadow-lg border border-slate-700/30">
                  <FaHotel className="text-5xl text-blue-400/50 mx-auto mb-4" />
                  <p className="text-gray-300 text-xl mb-2">
                    No hotels match your filters.
                  </p>
                  <p className="text-blue-300/70">
                    Please adjust your filters or check back later.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Booking Modal */}
      {showBookingModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl shadow-2xl w-11/12 max-w-4xl flex overflow-hidden">
            <div className="w-7/12 p-6 bg-gradient-to-br from-slate-900 to-blue-900">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                Room {selectedRoom.roomNumber || "N/A"} ({selectedRoom.type || "Standard"})
              </h3>
              {selectedRoom.images && selectedRoom.images.length > 0 ? (
                <div className="relative mb-4 rounded-lg overflow-hidden shadow-inner shadow-slate-900">
                  <img
                    src={selectedRoom.images[currentImageIndex[selectedRoom._id] || 0]}
                    alt={`Room ${selectedRoom.roomNumber || "N/A"}`}
                    className="w-full h-48 object-cover"
                  />
                  {selectedRoom.images.length > 1 && (
                    <>
                      <button
                        onClick={() => handlePrevImage(selectedRoom._id, selectedRoom.images.length)}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-slate-900/70 text-white p-2 rounded-full hover:bg-slate-800 transition-colors duration-200"
                      >
                        <FaArrowLeft />
                      </button>
                      <button
                        onClick={() => handleNextImage(selectedRoom._id, selectedRoom.images.length)}
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
                  <span className="text-green-400 font-bold">₹{selectedRoom.price || "N/A"} per night</span>
                </p>
                <p className="flex items-center mb-2">
                  <strong className="text-blue-200 min-w-24">Capacity:</strong>
                  <span className="flex items-center">
                    {Array(selectedRoom.capacity || 1)
                      .fill()
                      .map((_, i) => (
                        <FaUser key={i} className="text-gray-400 mr-1" />
                      ))}
                    {selectedRoom.capacity || "N/A"} guests
                  </span>
                </p>
                <div className="mb-2">
                  <strong className="text-blue-200 block">Amenities:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedRoom.amenities?.length > 0 ? (
                      selectedRoom.amenities.map((amenity, index) => {
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
                            className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full text-sm"
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
                <p>
                  <strong className="text-blue-200">Description:</strong>{" "}
                  <span className="text-gray-300 italic">
                    {selectedRoom.description || "No description available."}
                  </span>
                </p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="w-5/12 p-6 bg-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-300">Book This Room</h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={bookingForm.name}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    placeholder="Enter your full name"
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
                      onChange={handleFormChange}
                      min="1"
                      max={selectedRoom.capacity || 10}
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
                    onChange={handleFormChange}
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
                    onChange={handleFormChange}
                    required
                    min={bookingForm.checkIn || new Date().toISOString().split("T")[0]}
                    className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    id="hasChild"
                    name="hasChild"
                    type="checkbox"
                    checked={bookingForm.hasChild}
                    onChange={handleFormChange}
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
                      onChange={handleFormChange}
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
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-900/50 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Booking"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPanel;