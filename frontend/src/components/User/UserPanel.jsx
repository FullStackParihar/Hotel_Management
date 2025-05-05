 
// // export default UserPanel;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   FaMapMarkerAlt, FaHotel, FaStar, FaBed, FaWifi, FaTv, 
//   FaSnowflake, FaGlassMartini, FaConciergeBell, FaDoorOpen, 
//   FaArrowRight, FaArrowLeft, FaSignOutAlt, FaSearch, FaUser,
//   FaCalendarAlt, FaRegStar, FaCoffee, FaSwimmingPool, FaParking,
//   FaArrowDown
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const UserPanel = () => {
//   const navigate = useNavigate();
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [hotels, setHotels] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [expandedHotels, setExpandedHotels] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [currentImageIndex, setCurrentImageIndex] = useState({});
//   const [filterPrice, setFilterPrice] = useState({ min: 0, max: 100000 });
//   const [filterRating, setFilterRating] = useState(0);
//   const [showFilters, setShowFilters] = useState(false);

//   const baseURL = "http://localhost:6969";

//   // Fetch states on component mount
//   const fetchStates = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/api/states`);
//       const activeStates = response.data.filter((s) => s.isActive);
//       setStates(activeStates);
//     } catch (err) {
//       console.error("fetchStates - Error:", err);
//       setError(err.response?.data?.message || "Failed to fetch states.");
//     }
//   };

//   // Fetch cities when a state is selected
//   const fetchCities = async (stateId) => {
//     if (!stateId) {
//       setCities([]);
//       setHotels([]);
//       setRooms([]);
//       setExpandedHotels({});
//       return;
//     }
//     try {
//       const response = await axios.get(`${baseURL}/api/states/${stateId}/cities`);
//       const activeCities = response.data.filter((c) => c.isActive);
//       setCities(activeCities);
//     } catch (err) {
//       console.error("fetchCities - Error:", err);
//       setError(err.response?.data?.message || "Failed to fetch cities.");
//     }
//   };

//   // Fetch hotels when a city is selected
//   const fetchHotels = async (cityId) => {
//     if (!cityId) {
//       setHotels([]);
//       setRooms([]);
//       setExpandedHotels({});
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.get(`${baseURL}/api/cities/${cityId}/hotels`);
//       const activeHotels = response.data.filter((h) => h.isActive);
//       setHotels(activeHotels);
//       setExpandedHotels({});
//     } catch (err) {
//       console.error("fetchHotels - Error:", err);
//       setError(err.response?.data?.message || "Failed to fetch hotels.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch rooms when a hotel is expanded
//   const fetchRooms = async (hotelId) => {
//     if (!hotelId) {
//       setRooms([]);
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.get(`${baseURL}/api/${hotelId}/rooms`);
//       const activeRooms = response.data.filter((r) => r.isActive);
//       setRooms(activeRooms);
//       // Initialize image index for each room
//       const initialImageIndex = activeRooms.reduce((acc, room) => {
//         acc[room._id] = 0;
//         return acc;
//       }, {});
//       setCurrentImageIndex(initialImageIndex);
//     } catch (err) {
//       console.error("fetchRooms - Error:", err);
//       setError(err.response?.data?.message || "Failed to fetch rooms.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Toggle hotel expansion
//   const toggleHotelDetails = (hotelId) => {
//     setExpandedHotels((prev) => ({
//       ...prev,
//       [hotelId]: !prev[hotelId],
//     }));
//   };

//   // Handle state selection
//   const handleStateChange = async (e) => {
//     const stateId = e.target.value;
//     setSelectedState(stateId);
//     setSelectedCity("");
//     setHotels([]);
//     setRooms([]);
//     setExpandedHotels({});
//     await fetchCities(stateId);
//   };

//   // Handle city selection
//   const handleCityChange = async (e) => {
//     const cityId = e.target.value;
//     setSelectedCity(cityId);
//     setRooms([]);
//     await fetchHotels(cityId);
//   };

//   // Handle image carousel navigation
//   const handlePrevImage = (roomId, totalImages) => {
//     setCurrentImageIndex((prev) => ({
//       ...prev,
//       [roomId]: prev[roomId] === 0 ? totalImages - 1 : prev[roomId] - 1,
//     }));
//   };

//   const handleNextImage = (roomId, totalImages) => {
//     setCurrentImageIndex((prev) => ({
//       ...prev,
//       [roomId]: prev[roomId] === totalImages - 1 ? 0 : prev[roomId] + 1,
//     }));
//   };

//   // Filter hotels by price range and rating
//   const filteredHotels = hotels.filter(hotel => {
//     const meetsRatingFilter = hotel.rating >= filterRating;
//     const meetsPriceFilter = 
//       (hotel.priceRange?.min >= filterPrice.min || !hotel.priceRange?.min) && 
//       (hotel.priceRange?.max <= filterPrice.max || !hotel.priceRange?.max);
    
//     return meetsRatingFilter && meetsPriceFilter;
//   });

//   // Logout handler
//   const handleLogout = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       localStorage.removeItem("token");
//       navigate("/");
//     } catch (err) {
//       console.error("handleLogout - Error:", err);
//       setError(err.response?.data?.message || "Failed to log out.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span key={i}>
//           {i <= rating ? 
//             <FaStar className="text-yellow-400" /> : 
//             <FaRegStar className="text-gray-400" />}
//         </span>
//       );
//     }
//     return  ;
//   };

//   useEffect(() => {
//     fetchStates();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-gray-100 font-sans">
//       {/* Header */}
//       <header className="bg-slate-800/90 backdrop-blur-md shadow-xl sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
//             <FaHotel className="mr-2 text-blue-400" /> LuxStay
//           </h1>
//           <div className="flex items-center space-x-4">
//             <button className="flex items-center text-gray-300 hover:text-white bg-slate-700/70 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-200 shadow-md">
//               <FaUser className="mr-2" /> My Profile
//             </button>
//             <button
//               onClick={handleLogout}
//               className="flex items-center text-gray-300 hover:text-white bg-red-600/90 hover:bg-red-600 px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
//             >
//               <FaSignOutAlt className="mr-2" /> Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden mb-8">
//         <div className="bg-[url('https://images.unsplash.com/photo-1571896349842-33c89424de2d')] bg-cover bg-center h-80">
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
//           <div className="absolute inset-0 bg-blue-900/30"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center max-w-3xl px-4">
//               <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">Find Your Perfect Stay</h1>
//               <p className="text-xl text-blue-100 mb-8 drop-shadow">Discover the best hotels and accommodations for your next adventure</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-4 pb-16">
//         {/* Search Section */}
//         <section className="bg-gradient-to-r from-slate-800/90 to-blue-900/90 rounded-2xl p-8 shadow-xl mb-10 backdrop-blur-md transform -mt-24 mx-4 lg:mx-auto">
//           <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
//             <FaSearch className="mr-2" /> Search Hotels
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             <div>
//               <label htmlFor="state-select" className="block text-sm font-semibold text-gray-200 mb-2">
//                 Select State
//               </label>
//               <div className="relative">
//                 <select
//                   id="state-select"
//                   value={selectedState}
//                   onChange={handleStateChange}
//                   className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 appearance-none"
//                   aria-label="Select state"
//                 >
//                   <option value="">-- Select State --</option>
//                   {states.map((state) => (
//                     <option key={state._id} value={state._id}>
//                       {state.name}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <FaMapMarkerAlt className="text-blue-400" />
//                 </div>
//               </div>
//             </div>
//             <div>
//               <label htmlFor="city-select" className="block text-sm font-semibold text-gray-200 mb-2">
//                 Select City
//               </label>
//               <div className="relative">
//                 <select
//                   id="city-select"
//                   value={selectedCity}
//                   onChange={handleCityChange}
//                   disabled={!selectedState}
//                   className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:bg-slate-600/50 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 appearance-none"
//                   aria-label="Select city"
//                 >
//                   <option value="">-- Select City --</option>
//                   {cities.map((city) => (
//                     <option key={city._id} value={city._id}>
//                       {city.name}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <FaMapMarkerAlt className="text-blue-400" />
//                 </div>
//               </div>
//             </div>
//             <div>
//               <label htmlFor="check-in" className="block text-sm font-semibold text-gray-200 mb-2">
//                 Check-in Date
//               </label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   id="check-in"
//                   className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <FaCalendarAlt className="text-blue-400" />
//                 </div>
//               </div>
//             </div>
//             <div>
//               <label htmlFor="check-out" className="block text-sm font-semibold text-gray-200 mb-2">
//                 Check-out Date
//               </label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   id="check-out"
//                   className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <FaCalendarAlt className="text-blue-400" />
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Advanced Filters */}
//           <div className="mt-6">
//             <button 
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200"
//             >
//               {showFilters ? "Hide Filters" : "Show Advanced Filters"}
//               <FaArrowDown className={`ml-2 transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
//             </button>
            
//             {showFilters && (
//               <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-600/50">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-200 mb-2">
//                     Price Range (₹)
//                   </label>
//                   <div className="flex space-x-4 items-center">
//                     <input
//                       type="number"
//                       placeholder="Min"
//                       value={filterPrice.min}
//                       onChange={(e) => setFilterPrice({...filterPrice, min: parseInt(e.target.value) || 0})}
//                       className="flex-1 bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
//                     />
//                     <span className="text-gray-400">to</span>
//                     <input
//                       type="number"
//                       placeholder="Max"
//                       value={filterPrice.max}
//                       onChange={(e) => setFilterPrice({...filterPrice, max: parseInt(e.target.value) || 100000})}
//                       className="flex-1 bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-200 mb-2">
//                     Minimum Rating
//                   </label>
//                   <div className="flex items-center space-x-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         onClick={() => setFilterRating(star)}
//                         className={`p-2 rounded-md transition-all duration-200 ${
//                           filterRating >= star ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'
//                         }`}
//                       >
//                         <FaStar />
//                       </button>
//                     ))}
//                     {filterRating > 0 && (
//                       <button 
//                         onClick={() => setFilterRating(0)}
//                         className="ml-2 text-xs text-gray-300 hover:text-white"
//                       >
//                         Clear
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Hotel Listings */}
//         <section>
//           {error && (
//             <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-8">
//               <p className="text-red-400 text-center">{error}</p>
//             </div>
//           )}
          
//           {loading ? (
//             <div className="flex justify-center py-12">
//               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
//             </div>
//           ) : filteredHotels.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8">
//               {filteredHotels.map((hotel) => (
//                 <div
//                   key={hotel._id}
//                   className="bg-gradient-to-r from-slate-800/90 to-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-blue-900/30 hover:shadow-xl border border-slate-700/50"
//                 >
//                   <div
//                     className="p-6 cursor-pointer transition-colors duration-200 hover:bg-slate-700/20"
//                     onClick={() => {
//                       toggleHotelDetails(hotel._id);
//                       if (!expandedHotels[hotel._id]) {
//                         fetchRooms(hotel._id);
//                       }
//                     }}
//                     tabIndex={0}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" || e.key === " ") {
//                         e.preventDefault();
//                         toggleHotelDetails(hotel._id);
//                         if (!expandedHotels[hotel._id]) {
//                           fetchRooms(hotel._id);
//                         }
//                       }
//                     }}
//                     aria-expanded={!!expandedHotels[hotel._id]}
//                     aria-controls={`hotel-details-${hotel._id}`}
//                   >
//                     <div className="flex justify-between items-center mb-4">
//                       <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
//                         {hotel.name}
//                       </h3>
//                       <button className="text-white px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-md hover:shadow-blue-900/50 text-sm font-medium">
//                         {expandedHotels[hotel._id] ? "Hide Rooms" : "View Rooms"}
//                       </button>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                       <div className="col-span-2">
//                         <p className="text-gray-200 flex items-start mb-2">
//                           <FaMapMarkerAlt className="mt-1 mr-2 text-blue-400 flex-shrink-0" />
//                           <span>
//                             <strong className="text-blue-200">Address:</strong> {hotel.address || "N/A"}
//                           </span>
//                         </p>
//                         <p className="text-gray-200 mb-2">
//                           <span className="flex items-center mb-1">
//                             <strong className="text-blue-200 mr-2">Rating:</strong>
//                             {renderStars(hotel.rating)}
//                           </span>
//                         </p>
//                         <p className="text-gray-200 flex items-center">
//                           <strong className="text-blue-200 mr-2">Price Range:</strong>
//                           <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-semibold">
//                             ₹{hotel.priceRange?.min || "N/A"} - ₹{hotel.priceRange?.max || "N/A"}
//                           </span>
//                         </p>
//                         <div className="mt-3 flex flex-wrap gap-2">
//                           {hotel.amenities && hotel.amenities.map((amenity, index) => (
//                             <span 
//                               key={index}
//                               className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-900/40 text-blue-200"
//                             >
//                               {amenity === "Pool" && <FaSwimmingPool className="mr-1" />}
//                               {amenity === "Parking" && <FaParking className="mr-1" />}
//                               {amenity === "Restaurant" && <FaCoffee className="mr-1" />}
//                               {amenity}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-gray-200 mb-2">
//                           <FaHotel className="inline mr-2 text-blue-400" />
//                           <strong className="text-blue-200">Total Rooms:</strong> {hotel.totalRooms ?? "N/A"}
//                         </p>
//                         <p className="text-gray-200">
//                           <strong className="text-blue-200">Contact:</strong>{" "}
//                           {(hotel.contact?.phone || hotel.contact?.email) ? (
//                             <span className="text-blue-300">
//                               {[hotel.contact?.phone, hotel.contact?.email]
//                                 .filter(Boolean)
//                                 .join(" | ")}
//                             </span>
//                           ) : (
//                             "N/A"
//                           )}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   {expandedHotels[hotel._id] && (
//                     <div
//                       id={`hotel-details-${hotel._id}`}
//                       className="bg-slate-900/80 p-6 border-t border-slate-700/50 transition-all duration-300 ease-in-out animate-fadeIn"
//                     >
//                       <h4 className="text-xl font-semibold text-blue-300 mb-6 flex items-center">
//                         <FaBed className="mr-2" /> Available Rooms
//                       </h4>
//                       {loading ? (
//                         <div className="flex justify-center py-8">
//                           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
//                         </div>
//                       ) : rooms.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           {rooms.map((room) => (
//                             <div
//                               key={room._id}
//                               className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-lg transition-all duration-200 hover:shadow-blue-900/20 hover:shadow-lg border border-slate-700/30"
//                             >
//                               <div className="flex justify-between items-center mb-4">
//                                 <h5 className="text-lg font-medium text-blue-200">
//                                   Room {room.roomNumber} <span className="text-blue-400">({room.type || "Standard"})</span>
//                                 </h5>
//                                 <span
//                                   className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                                     room.isAvailable
//                                       ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
//                                       : "bg-gradient-to-r from-red-500 to-red-600 text-white"
//                                   }`}
//                                 >
//                                   {room.isAvailable ? "Available" : "Booked"}
//                                 </span>
//                               </div>
//                               {room.images && room.images.length > 0 ? (
//                                 <div className="relative mb-4 rounded-lg overflow-hidden shadow-inner shadow-slate-900">
//                                   <img
//                                     src={room.images[currentImageIndex[room._id] || 0]}
//                                     alt={`Room ${room.roomNumber} image ${
//                                       (currentImageIndex[room._id] || 0) + 1
//                                     }`}
//                                     className="w-full h-52 object-cover transition-all duration-700 hover:scale-110"
//                                   />
//                                   {room.images.length > 1 && (
//                                     <>
//                                       <button
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           handlePrevImage(room._id, room.images.length);
//                                         }}
//                                         className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-slate-900/70 text-white p-2 rounded-full hover:bg-slate-800 transition-colors duration-200"
//                                         aria-label="Previous image"
//                                       >
//                                         <FaArrowLeft />
//                                       </button>
//                                       <button
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           handleNextImage(room._id, room.images.length);
//                                         }}
//                                         className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-slate-900/70 text-white p-2 rounded-full hover:bg-slate-800 transition-colors duration-200"
//                                         aria-label="Next image"
//                                       >
//                                         <FaArrowRight />
//                                       </button>
//                                     </>
//                                   )}
//                                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-3">
//                                     <p className="text-white font-medium flex items-center">
//                                       <FaBed className="mr-2 text-blue-400" />
//                                       <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">
//                                         ₹{room.price || "N/A"}
//                                       </span>
//                                       <span className="text-xs ml-2 text-gray-300">per night</span>
//                                     </p>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <div className="w-full h-52 bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 shadow-inner shadow-slate-900 mb-4">
//                                   No Images Available
//                                 </div>
//                               )}
//                               <div className="grid grid-cols-1 gap-3 text-gray-200">
//                                 <p className="flex items-center">
//                                   <strong className="text-blue-200 min-w-24">Capacity:</strong> 
//                                   <span className="flex items-center">
//                                     {Array(room.capacity || 1).fill().map((_, i) => (
//                                       <FaUser key={i} className="text-gray-400 mr-1" />
//                                     ))}
//                                     {room.capacity || "N/A"} guests
//                                   </span>
//                                 </p>
//                                 <div>
//                                   <strong className="text-blue-200 block mb-2">Amenities:</strong>
//                                   <div className="flex flex-wrap gap-2">
//                                     {room.amenities?.length > 0 ? (
//                                       room.amenities.map((amenity, index) => {
//                                         const iconMap = {
//                                           WiFi: <FaWifi className="text-blue-400" />,
//                                           TV: <FaTv className="text-blue-400" />,
//                                           "Air Conditioning": <FaSnowflake className="text-blue-400" />,
//                                           "Mini Bar": <FaGlassMartini className="text-blue-400" />,
//                                           "Room Service": <FaConciergeBell className="text-blue-400" />,
//                                           Balcony: <FaDoorOpen className="text-blue-400" />,
//                                         };
//                                         return (
//                                           <span
//                                             key={index}
//                                             className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full text-sm"
//                                           >
//                                             {iconMap[amenity] || null} {amenity}
//                                           </span>
//                                         );
//                                       })
//                                     ) : (
//                                       "N/A"
//                                     )}
//                                   </div>
//                                 </div>
//                                 <p className="mt-1">
//                                   <strong className="text-blue-200">Description:</strong>{" "}
//                                   <span className="text-gray-300 italic">
//                                     {room.description || "No description available."}
//                                   </span>
//                                 </p>
//                               </div>
//                               {room.isAvailable && (
//                                 <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-900/50 font-medium flex items-center justify-center">
//                                   <FaCalendarAlt className="mr-2" /> Book Now
//                                 </button>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700/30">
//                           <FaBed className="text-4xl text-blue-400/50 mx-auto mb-4" />
//                           <p className="text-gray-300 text-lg">
//                             No active rooms available for this hotel.
//                           </p>
//                           <p className="text-blue-300/70 mt-2">Please check back later or try another hotel.</p>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : selectedCity ? (
//             <div className="bg-slate-800/70 rounded-xl p-12 text-center shadow-lg border border-slate-700/30">
//               <FaHotel className="text-5xl text-blue-400/50 mx-auto mb-4" />
//               <p className="text-gray-300 text-xl mb-2">
//                 No hotels found in this city.
//               </p>
//               <p className="text-blue-300/70">
//                 Try selecting a different city or adjusting your filters.
//               </p>
//             </div>
//           ) : (
//             <div className="bg-slate-800/70 rounded-xl p-12 text-center shadow-lg border border-slate-700/30">
//               <FaSearch className="text-5xl text-blue-400/50 mx-auto mb-4" />
//               <p className="text-gray-300 text-xl mb-2">
//                 Ready to discover your perfect stay?
//               </p>
//               <p className="text-blue-300/70">
//                 Please select a state and city to view available hotels.
//               </p>
//             </div>
//           )}
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-slate-900/90 backdrop-blur-md py-8 border-t border-slate-800/50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div>
//               <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
//                 LuxStay
//               </h3>
//               <p className="text-gray-400 mb-4">
//                 Your premier destination for finding the perfect accommodations for business trips, family vacations, or weekend getaways.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold text-blue-300 mb-4">Quick Links</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-blue-300 transition-colors duration-200">About Us</a></li>
//                 <li><a href="#" className="hover:text-blue-300 transition-colors duration-200">Contact Support</a></li>
//                 <li><a href="#" className="hover:text-blue-300 transition-colors duration-200">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-blue-300 transition-colors duration-200">Terms of Service</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold text-blue-300 mb-4">Contact Us</h4>
//               <p className="text-gray-400 mb-2">
//                 <FaMapMarkerAlt className="inline mr-2 text-blue-400" />
//                 123 Hotel Street, Mumbai, India
//               </p>
//               <p className="text-gray-400 mb-2">
//                 <span className="text-blue-400 mr-2">Email:</span> 
//                 support@luxstay.com
//               </p>
//               <p className="text-gray-400">
//                 <span className="text-blue-400 mr-2">Phone:</span> 
//                 +91 12345 67890
//               </p>
//             </div>
//           </div>
//           <div className="mt-8 pt-6 border-t border-slate-800/50 text-center text-gray-500">
//             <p>© {new Date().getFullYear()} LuxStay. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default UserPanel;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaMapMarkerAlt, FaHotel, FaStar, FaBed, FaWifi, FaTv, 
  FaSnowflake, FaGlassMartini, FaConciergeBell, FaDoorOpen, 
  FaArrowRight, FaArrowLeft, FaSignOutAlt, FaSearch, FaUser,
  FaRegStar, FaCoffee, FaSwimmingPool, FaParking, FaArrowDown,
  FaSortAmountUp, FaSortAmountDown,
  FaCalendarAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

  const baseURL = "http://localhost:6969";

  // ------------------------------Fetch states ---------------------------
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

  // ------------------------------Fetch cities ----------------------------------
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

  // ------------------------------Fetch hotels ----------------------------
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

  // ------------------------------Fetch rooms -------------------------------
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

  //------------------------------ Toggle hotel------------------------------
  const toggleHotelDetails = (hotelId) => {
    setExpandedHotels((prev) => ({
      ...prev,
      [hotelId]: !prev[hotelId],
    }));
  };

  //------------------------------ Handle state ---------------------- 
  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setSelectedCity("");
    setHotels([]);
    setRooms([]);
    setExpandedHotels({});
    await fetchCities(stateId);
  };

  // ------------------------------Handle city -------------------------------
  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setRooms([]);
    await fetchHotels(cityId);
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

 
//   const filteredHotels = hotels
//     .filter(hotel => {
//       const meetsRatingFilter = hotel.rating >= filterRating;
//       const meetsSearchFilter = hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
//       return meetsRatingFilter && meetsSearchFilter;
//     })
//     .sort((a, b) => {
//       if (sortOrder === "asc") {
//         return (a.rating || 0) - (b.rating || 0);
//       } else if (sortOrder === "desc") {
//         return (b.rating || 0) - (a.rating || 0);
//       }
//       return 0;
//     });
// Filter hotels rating and search  -------------------------------------
const filteredHotels = hotels
  .filter(hotel => {
 
    const hotelRating = hotel.rating ?? 0;
    const meetsRatingFilter = filterRating === 0 || hotelRating >= filterRating;
    const meetsSearchFilter = hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
    return meetsRatingFilter && meetsSearchFilter;
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
  // ------------------------------Logout handle-----------------------------------
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
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i}>
          {i <= rating ? 
            <FaStar className="text-yellow-400" /> : 
            <FaRegStar className="text-gray-400" />}
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  useEffect(() => {
    fetchStates();
  }, []);


  const scrollPositionRef = React.useRef(0);

 
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
            {/* <button className="flex items-center text-gray-300 hover:text-white bg-slate-700/70 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all duration-200 shadow-md">
              <FaUser className="mr-2" /> My Profile
            </button> */}
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
        {/* -------------------------- Search  -------------------------- */}
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
                  <option value="">-- Select State --</option>
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
                  <option value="">-- Select City --</option>
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
          
          {/* Advanced Filters */}
          {/* <div className="mt-6">
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
                      >
                        <FaStar />
                      </button>
                    ))}
                    {filterRating > 0 && (
                      <button 
                        onClick={() => setFilterRating(0)}
                        className="ml-2 text-xs text-gray-300 hover:text-white"
                      >
                        Clear
                      </button>
                    )}
                  </div>
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
                    >
                      <FaSortAmountDown className="mr-2" /> High to Low
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div> */}
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

        {/* Hotel Listings */}
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
        {hotel.name}
      </h3>
      <button
        onClick={(e) => {
          e.stopPropagation();
          // Save the current scroll position before toggling
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
            // Save the current scroll position before toggling
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
            ₹{hotel.priceRange?.min || "N/A"} - ₹{hotel.priceRange?.max || "N/A"}
          </span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {hotel.amenities &&
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
            ))}
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
                  Room {room.roomNumber}{" "}
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
                    alt={`Room ${room.roomNumber} image ${
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
                <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-900/50 font-medium flex items-center justify-center">
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
          ) : selectedCity ? (
            <div className="bg-slate-800/70 rounded-xl p-12 text-center shadow-lg border border-slate-700/30">
              <FaHotel className="text-5xl text-blue-400/50 mx-auto mb-4" />
              <p className="text-gray-300 text-xl mb-2">
                No hotels found in this city.
              </p>
              <p className="text-blue-300/70">
                Try selecting a different city or adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="bg-slate-800/70 rounded-xl p-12 text-center shadow-lg border border-slate-700/30">
              <FaSearch className="text-5xl text-blue-400/50 mx-auto mb-4" />
              <p className="text-gray-300 text-xl mb-2">
                Ready to discover your perfect stay?
              </p>
              <p className="text-blue-300/70">
                Please select a state and city to view available hotels.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer
      <footer className="bg-slate-900/90 backdrop-blur-md py-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                LuxStay
              </h3>
              <p className="text-gray-400 mb-4">
                Your premier destination for finding the perfect accommodations for business trips, family vacations, or weekend getaways.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-300 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-300 transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors duration-200">Contact Support</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-300 mb-4">Contact Us</h4>
              <p className="text-gray-400 mb-2">
                <FaMapMarkerAlt className="inline mr-2 text-blue-400" />
                123 Hotel Street, Mumbai, India
              </p>
              <p className="text-gray-400 mb-2">
                <span className="text-blue-400 mr-2">Email:</span> 
                support@luxstay.com
              </p>
              <p className="text-gray-400">
                <span className="text-blue-400 mr-2">Phone:</span> 
                +91 12345 67890
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800/50 text-center text-gray-500">
            <p>© {new Date().getFullYear()} LuxStay. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  ); 
};

export default UserPanel;