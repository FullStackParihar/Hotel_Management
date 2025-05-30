 

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchHotels from "./components/SearchHotel";
import HotelList from "./components/HotelList";
import BookingsModal from "./components/BookingModal";
import BookingFormModal from "./components/BookingshistoryModal";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useDarkMode from "./hooks/useDarkMode"; 
import api from "../../Utils/api";

const UserPanel = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDarkMode] = useDarkMode();
  const baseURL = "http://localhost:6969";

  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded._id;
    }
    return null;
  };

  const fetchUserDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");
      const response = await api.get(`/user/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails(response.data);
    } catch (err) {
      console.error("fetchUserDetails - Error:", err);
      setError(err.response?.data?.message || "Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await api.get(`/api/states`);
      const activeStates = Array.isArray(response.data) ? response.data.filter((s) => s.isActive) : [];
      setStates(activeStates);
    } catch (err) {
      console.error("fetchStates - Error:", err);
      setError(err.response?.data?.message || "Failed to fetch states.");
      setStates([]);
    }
  };

  const fetchCities = async (stateId) => {
    if (!stateId) {
      setCities([]);
      setHotels([]);
      return;
    }
    try {
      const response = await api.get(`/api/states/${stateId}/cities`);
      const activeCities = Array.isArray(response.data) ? response.data.filter((c) => c.isActive) : [];
      setCities(activeCities);
    } catch (err) {
      console.error("fetchCities - Error:", err);
      setError(err.response?.data?.message || "Failed to fetch cities.");
      setCities([]);
    }
  };

  const fetchHotels = async (cityId) => {
    if (!cityId) {
      setHotels([]);
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/api/cities/${cityId}/hotels`);
      const activeHotels = Array.isArray(response.data) ? response.data.filter((h) => h.isActive) : [];
      setHotels(activeHotels);
    } catch (err) {
      console.error("fetchHotels - Error:", err);
      setError(err.response?.data?.message || "Failed to fetch hotels.");
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllHotels = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/hotels`);
      const activeHotels = Array.isArray(response.data) ? response.data.filter((h) => h.isActive) : [];
      setHotels(activeHotels);
    } catch (err) {
      console.error("fetchAllHotels - Error:", err);
      setError(err.response?.data?.message || "Failed to fetch hotels.");
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = async (stateId) => {
    setSelectedState(stateId);
    setSelectedCity("");
    setHotels([]);
    if (stateId) {
      await fetchCities(stateId);
    } else {
      await fetchAllHotels();
      setFilterRating(0);
      setSearchTerm("");
      setSortOrder("");
    }
  };

  const handleCityChange = async (cityId) => {
    setSelectedCity(cityId);
    if (cityId) {
      await fetchHotels(cityId);
    } else {
      await fetchAllHotels();
      setFilterRating(0);
      setSearchTerm("");
      setSortOrder("");
    }
  };

  const handleOpenBookingModal = (room) => {
    setSelectedRoom(room);
    setShowBookingModal(true);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setSelectedRoom(null);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchStates();
    fetchAllHotels();
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gradient-to-br from-gray-100 to-blue-200'} ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} font-sans`}>
      <Header
        userDetails={userDetails}
        setShowBookingsModal={setShowBookingsModal}
        loading={loading}
        setLoading={setLoading}
        setError={setError}
      />
      <section className="relative overflow-hidden mb-8">
        <div
          className="bg-cover bg-center h-80"
          style={{
            backgroundImage: userDetails?.backgroundImage
              ? `url(${userDetails.backgroundImage})`
              : `url('https://images.unsplash.com/photo-1571896349842-33c89424de2d')`,
          }}
        >
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-gray-900 to-transparent' : 'bg-gradient-to-t from-gray-0 to-transparent'}`}></div>
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-200/30'}`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-3xl px-4">
              <h1 className={`text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'} drop-shadow-lg`}>Find Your Perfect Stay</h1>
              <p className={`text-xl ${isDarkMode ? 'text-blue-100' : 'text-blue-600 bg-white p-1 rounded-4xl'} mb-8 drop-shadow`}>Discover the best hotels and accommodations for your next adventure</p>
            </div>
          </div>
        </div>
      </section>
      <main className="max-w-7xl mx-auto px-4 py-4 pb-16">
        <SearchHotels
          states={states}
          cities={cities}
          selectedState={selectedState}
          selectedCity={selectedCity}
          filterRating={filterRating}
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          handleStateChange={handleStateChange}
          handleCityChange={handleCityChange}
          setFilterRating={setFilterRating}
          setSearchTerm={setSearchTerm}
          setSortOrder={setSortOrder}
        />
        <HotelList
          hotels={hotels}
          filterRating={filterRating}
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          onBookNow={handleOpenBookingModal}
          selectedState={selectedState}
          selectedCity={selectedCity}
          loading={loading}
          error={error}
          setError={setError}
        />
        <BookingFormModal
          showBookingModal={showBookingModal}
          selectedRoom={selectedRoom}
          onClose={handleCloseBookingModal}
        />
        <BookingsModal
          showBookingsModal={showBookingsModal}
          setShowBookingsModal={setShowBookingsModal}
          setError={setError}
        />
      </main>
    </div>
  );
};

export default UserPanel;