import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    // Call the getMe route to validate the token and fetch user details
    axios
      .get("http://localhost:6969/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const role = res.data.user.role;
        setUserRole(role);
        setIsAuthenticated(true);
        // Update localStorage with the correct role
        localStorage.setItem("userType", role);
        console.log(`ProtectedRoute - Validated role: ${role}, Required: ${requiredRole}`);
      })
      .catch((error) => {
        console.error("ProtectedRoute - getMe error:", error);
        // Clear localStorage if token is invalid
        localStorage.removeItem("token");
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userType");
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading state while validating
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />; // Redirect to login if role doesn't match
  }

  return children;
};

export default ProtectedRoute;
 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaMapMarkerAlt, FaCity, FaHotel, FaSignOutAlt, FaSearch, FaSort } from "react-icons/fa";

// const LocationManager = () => {
//     const [locations, setLocations] = useState([]);
//     const [inactiveLocations, setInactiveLocations] = useState([]);
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [hotels, setHotels] = useState([]);
//     const [form, setForm] = useState({ state: "", city: "" });
//     const [stateForm, setStateForm] = useState({ name: "" });
//     const [cityForm, setCityForm] = useState({ name: "", stateId: "" });
//     const [hotelForm, setHotelForm] = useState({
//         name: "",
//         cityId: "",
//         address: "",
//         rating: "",
//         amenities: "",
//         priceMin: "",
//         priceMax: "",
//         contactPhone: "",
//         contactEmail: "",
//     });
//     const [editId, setEditId] = useState(null);
//     const [editStateId, setEditStateId] = useState(null);
//     const [editCityId, setEditCityId] = useState(null);
//     const [editHotelId, setEditHotelId] = useState(null);
//     const [tab, setTab] = useState("active");
//     const [sidebarTab, setSidebarTab] = useState("states");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [sortOption, setSortOption] = useState("latest");
//     const [selectedState, setSelectedState] = useState("");
//     const [selectedCity, setSelectedCity] = useState("");
//     const [selectedHotel, setSelectedHotel] = useState(null);
//     //   const navigate = useNavigate();

//     const baseURL = "http://localhost:3000";

//     // Fetch all data
//     const fetchLocations = async () => {
//         setLoading(true);
//         setError("");
//         try {
//             const response = await axios.get(`${baseURL}/locations/all`);
//             const active = response.data.filter((l) => l.isActive);
//             const inactive = response.data.filter((l) => !l.isActive);
//             setLocations(active);
//             setInactiveLocations(inactive);
//             if (response.data.length === 0) {
//                 setError("No locations found. Try adding a new location.");
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to fetch locations.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchStates = async () => {
//         try {
//             const response = await axios.get(`${baseURL}/api/states`);
//             setStates(response.data);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to fetch states.");
//         }
//     };

//     const fetchCities = async (stateId) => {
//         if (!stateId) {
//             setCities([]);
//             return;
//         }
//         try {
//             const response = await axios.get(`${baseURL}/api/states/${stateId}/cities`);
//             setCities(response.data);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to fetch cities.");
//         }
//     };

//     const fetchHotels = async (cityId) => {
//         if (!cityId) {
//             setHotels([]);
//             return;
//         }
//         try {
//             const response = await axios.get(`${baseURL}/api/cities/${cityId}/hotels`);
//             setHotels(response.data);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to fetch hotels.");
//         }
//     };

//     useEffect(() => {
//         fetchLocations();
//         fetchStates();
//     }, []);

//     // Location CRUD
//     const handleLocationSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");
//         try {
//             if (editId) {
//                 await axios.put(`${baseURL}/locations/${editId}`, form);
//             } else {
//                 await axios.post(`${baseURL}/locations/add`, form);
//             }
//             setStateForm({ name: "", code: "" });

//             setEditId(null);
//             await fetchLocations();
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to save location.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleLocationEdit = (loc) => {
//         setForm({ state: loc.state, city: loc.city });
//         setEditId(loc._id);
//         setTab("active");
//     };

//     const handleLocationDelete = async (id) => {
//         setLoading(true);
//         setError("");
//         try {
//             await axios.delete(`${baseURL}/locations/${id}`);
//             await fetchLocations();
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to delete location.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleLocationSoftDelete = async (id) => {
//         setLoading(true);
//         setError("");
//         try {
//             await axios.patch(`${baseURL}/locations/${id}/softdelete`, { isActive: false });
//             await fetchLocations();
//             setTab("inactive");
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to soft-delete location.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleLocationActivate = async (id) => {
//         setLoading(true);
//         setError("");
//         try {
//             await axios.patch(`${baseURL}/locations/${id}/activate`, { isActive: true });
//             await fetchLocations();
//             setTab("active");
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to activate location.");
//         } finally {
//             setLoading(false);
//         }
//     };
//     console.log(stateForm);

//     // State CRUD
//     const handleStateSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");
//         try {
//             if (editStateId) {
//                 await axios.put(`${baseURL}/api/states/${editStateId}`, stateForm);
//             } else {
//                 await axios.post(`${baseURL}/api/states/add`, stateForm);
//             }
//             setStateForm({ name: "" });
//             setEditStateId(null);
//             await fetchStates();
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to save state.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleStateEdit = (state) => {
//         setStateForm({ name: state.name });
//         setEditStateId(state._id);
//     };

//     const handleStateDelete = async (id) => {
//         setLoading(true);
//         setError("");
//         try {
//             await axios.delete(`${baseURL}/api/states/${id}`);
//             await fetchStates();
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to delete state.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // City CRUD
//     const handleCitySubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");
//         try {
//             if (editCityId) {
//                 await axios.put(`${baseURL}/api/cities/${editCityId}`, cityForm);
//             } else {
//                 await axios.post(`${baseURL}/api/cities/add`, cityForm);
//             }
//             setCityForm({ name: "", stateId: "" });
//             setEditCityId(null);
//             await fetchCities(cityForm.stateId || selectedState);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to save city.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCityEdit = (city) => {
//         setCityForm({ name: city.name, stateId: city.stateId });
//         setEditCityId(city._id);
//     };

//     const handleCityDelete = async (id) => {
//         setLoading(true);
//         setError("");
//         try {
//             await axios.delete(`${baseURL}/api/cities/${id}`);
//             await fetchCities(selectedState);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to delete city.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Hotel CRUD
//     const handleHotelSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");
//         try {
//             const payload = {
//                 name: hotelForm.name,
//                 cityId: hotelForm.cityId,
//                 address: hotelForm.address,
//                 rating: parseFloat(hotelForm.rating),
//                 amenities: hotelForm.amenities.split(",").map((a) => a.trim()),
//                 priceRange: { min: parseFloat(hotelForm.priceMin), max: parseFloat(hotelForm.priceMax) },
//                 contact: { phone: hotelForm.contactPhone, email: hotelForm.contactEmail },
//             };
//             if (editHotelId) {
//                 await axios.put(`${baseURL}/api/hotels/${editHotelId}`, payload);
//             } else {
//                 await axios.post(`${baseURL}/api/hotels/add`, payload);
//             }
//             setHotelForm({
//                 name: "",
//                 cityId: "",
//                 address: "",
//                 rating: "",
//                 amenities: "",
//                 priceMin: "",
//                 priceMax: "",
//                 contactPhone: "",
//                 contactEmail: "",
//             });
//             setEditHotelId(null);
//             await fetchHotels(hotelForm.cityId || selectedCity);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to save hotel.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleHotelEdit = (hotel) => {
//         setHotelForm({
//             name: hotel.name,
//             cityId: hotel.cityId,
//             address: hotel.address || "",
//             rating: hotel.rating?.toString() || "",
//             amenities: hotel.amenities?.join(", ") || "",
//             priceMin: hotel.priceRange?.min?.toString() || "",
//             priceMax: hotel.priceRange?.max?.toString() || "",
//             contactPhone: hotel.contact?.phone || "",
//             contactEmail: hotel.contact?.email || "",
//         });
//         setEditHotelId(hotel._id);
//     };

//     const handleHotelDelete = async (id) => {
//         setLoading(true);
//         setError("");
//         try {
//             await axios.delete(`${baseURL}/api/hotels/${id}`);
//             await fetchHotels(selectedCity);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to delete hotel.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Hotel Browser
//     const handleStateChange = async (e) => {
//         const stateId = e.target.value;
//         setSelectedState(stateId);
//         setSelectedCity("");
//         setSelectedHotel(null);
//         setHotels([]);
//         await fetchCities(stateId);
//     };

//     const handleCityChange = async (e) => {
//         const cityId = e.target.value;
//         setSelectedCity(cityId);
//         setSelectedHotel(null);
//         await fetchHotels(cityId);
//     };

//     const handleHotelChange = (e) => {
//         const hotelId = e.target.value;
//         if (hotelId) {
//             const hotel = hotels.find((h) => h._id === hotelId);
//             setSelectedHotel(hotel);
//         } else {
//             setSelectedHotel(null);
//         }
//     };

//     // Search and Sort
//     const filteredActiveLocations = locations.filter(
//         (loc) =>
//             loc.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             loc.city.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     const filteredInactiveLocations = inactiveLocations.filter(
//         (loc) =>
//             loc.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             loc.city.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const sortLocations = (locs) => {
//         return [...locs].sort((a, b) => {
//             const timeA = new Date(parseInt(a._id.toString().substring(0, 8), 16) * 1000);
//             const timeB = new Date(parseInt(b._id.toString().substring(0, 8), 16) * 1000);
//             return timeB - timeA; // Newest first
//         });
//     };
    

//     const sortedActiveLocations = sortLocations(filteredActiveLocations);
//     const sortedInactiveLocations = sortLocations(filteredInactiveLocations);

//     // Logout
//     const handleLogout = async () => {
//         setLoading(true);
//         setError("");
//         try {
//             localStorage.removeItem("token");
//             navigate("/");
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to log out.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-900 text-gray-100 flex">
//             {/* Sidebar */}
//             <div className="w-80 bg-gray-800 p-6 flex-shrink-0">
//                 <h2 className="text-xl font-bold text-indigo-400 mb-6 flex items-center">
//                     <FaMapMarkerAlt className="mr-2" /> Manage Locations
//                 </h2>
//                 <div className="flex gap-2 mb-4" role="tablist">
//                     <button
//                         onClick={() => setSidebarTab("states")}
//                         className={`flex-1 py-2 rounded ${sidebarTab === "states" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
//                         role="tab"
//                         aria-selected={sidebarTab === "states"}
//                     >
//                         States
//                     </button>
//                     <button
//                         onClick={() => setSidebarTab("cities")}
//                         className={`flex-1 py-2 rounded ${sidebarTab === "cities" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
//                         role="tab"
//                         aria-selected={sidebarTab === "cities"}
//                     >
//                         Cities
//                     </button>
//                     <button
//                         onClick={() => setSidebarTab("hotels")}
//                         className={`flex-1 py-2 rounded ${sidebarTab === "hotels" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
//                         role="tab"
//                         aria-selected={sidebarTab === "hotels"}
//                     >
//                         Hotels
//                     </button>
//                 </div>

//                 {/* State Form */}
//                 {sidebarTab === "states" && (
//                     <div>
//                         <form onSubmit={handleStateSubmit} className="space-y-4" aria-label="State form">
//                             <div>
//                                 <label htmlFor="state-name" className="block text-sm font-medium">
//                                     State Name
//                                 </label>
//                                 <input
//                                     id="state-name"
//                                     type="text"
//                                     value={stateForm.name || ""}
//                                     onChange={(e) => setStateForm({ ...stateForm, name: e.target.value })}
//                                     required
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="State name"
//                                 />

//                                 <input
//                                     id="state-code"
//                                     type="text"
//                                     value={stateForm.code || ""}
//                                     onChange={(e) => setStateForm({ ...stateForm, code: e.target.value })}
//                                     required
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="State code"
//                                 />

//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-800"
//                                 disabled={loading}
//                                 aria-label={editStateId ? "Update state" : "Add state"}
//                             >
//                                 {loading ? "Saving..." : editStateId ? "Update" : "Add"}
//                             </button>
//                         </form>
//                         <ul className="mt-4 space-y-2">
//                             {states.map((state) => (
//                                 <li
//                                     key={state._id}
//                                     className="flex justify-between items-center p-2 bg-gray-750 rounded border border-gray-700"
//                                 >
//                                     <span>{state.name}</span>
//                                     <div className="flex gap-2">
//                                         <button
//                                             onClick={() => handleStateEdit(state)}
//                                             className="text-yellow-400 hover:text-yellow-500"
//                                             aria-label={`Edit ${state.name}`}
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleStateDelete(state._id)}
//                                             className="text-red-400 hover:text-red-500"
//                                             aria-label={`Delete ${state.name}`}
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}

//                 {/* City Form */}
//                 {sidebarTab === "cities" && (
//                     <div>
//                         <form onSubmit={handleCitySubmit} className="space-y-4" aria-label="City form">
//                             <div>
//                                 <label htmlFor="city-name" className="block text-sm font-medium">
//                                     City Name
//                                 </label>
//                                 <input
//                                     id="city-name"
//                                     type="text"
//                                     value={cityForm.name}
//                                     onChange={(e) => setCityForm({ ...cityForm, name: e.target.value })}
//                                     required
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="City name"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="city-state" className="block text-sm font-medium">
//                                     State
//                                 </label>
//                                 <select
//                                     id="city-state"
//                                     value={cityForm.stateId}
//                                     onChange={(e) => setCityForm({ ...cityForm, stateId: e.target.value })}
//                                     required
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="Select state for city"
//                                 >
//                                     <option value="">-- Select State --</option>
//                                     {states.map((state) => (
//                                         <option key={state._id} value={state._id}>
//                                             {state.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-800"
//                                 disabled={loading}
//                                 aria-label={editCityId ? "Update city" : "Add city"}
//                             >
//                                 {loading ? "Saving..." : editCityId ? "Update" : "Add"}
//                             </button>
//                         </form>
//                         <ul className="mt-4 space-y-2">
//                             {cities.map((city) => (
//                                 <li
//                                     key={city._id}
//                                     className="flex justify-between items-center p-2 bg-gray-750 rounded border border-gray-700"
//                                 >
//                                     <span>{city.name}</span>
//                                     <div className="flex gap-2">
//                                         <button
//                                             onClick={() => handleCityEdit(city)}
//                                             className="text-yellow-400 hover:text-yellow-500"
//                                             aria-label={`Edit ${city.name}`}
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleCityDelete(city._id)}
//                                             className="text-red-400 hover:text-red-500"
//                                             aria-label={`Delete ${city.name}`}
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}

//                 {/* Hotel Form */}
//                 {sidebarTab === "hotels" && (
//                     <div>
//                         <form onSubmit={handleHotelSubmit} className="space-y-4" aria-label="Hotel form">
//                             <div>
//                                 <label htmlFor="hotel-name" className="block text-sm font-medium">
//                                     Hotel Name
//                                 </label>
//                                 <input
//                                     id="hotel-name"
//                                     type="text"
//                                     value={hotelForm.name}
//                                     onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
//                                     required
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="Hotel name"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="hotel-city" className="block text-sm font-medium">
//                                     City
//                                 </label>
//                                 <select
//                                     id="hotel-city"
//                                     value={hotelForm.cityId}
//                                     onChange={(e) => setHotelForm({ ...hotelForm, cityId: e.target.value })}
//                                     required
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="Select city for hotel"
//                                 >
//                                     <option value="">-- Select City --</option>
//                                     {cities.map((city) => (
//                                         <option key={city._id} value={city._id}>
//                                             {city.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div>
//                                 <label htmlFor="hotel-address" className="block text-sm font-medium">
//                                     Address
//                                 </label>
//                                 <input
//                                     id="hotel-address"
//                                     type="text"
//                                     value={hotelForm.address}
//                                     onChange={(e) => setHotelForm({ ...hotelForm, address: e.target.value })}
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="Hotel address"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="hotel-rating" className="block text-sm font-medium">
//                                     Rating (1-5)
//                                 </label>
//                                 <input
//                                     id="hotel-rating"
//                                     type="number"
//                                     min="1"
//                                     max="5"
//                                     step="0.1"
//                                     value={hotelForm.rating}
//                                     onChange={(e) => setHotelForm({ ...hotelForm, rating: e.target.value })}
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="Hotel rating"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="hotel-amenities" className="block text-sm font-medium">
//                                     Amenities (comma-separated)
//                                 </label>
//                                 <input
//                                     id="hotel-amenities"
//                                     type="text"
//                                     value={hotelForm.amenities}
//                                     onChange={(e) => setHotelForm({ ...hotelForm, amenities: e.target.value })}
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="Hotel amenities"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="hotel-price-min" className="block text-sm font-medium">
//                                     Price Range (Min)
//                                 </label>
//                                 <input
//                                     id="hotel-price-min"
//                                     type="number"
//                                     min="0"
//                                     value={hotelForm.priceMin}
//                                     onChange={(e) => setHotelForm({ ...hotelForm, priceMin: e.target.value })}
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="Minimum price"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="hotel-price-max" className="block text-sm font-medium">
//                                     Price Range (Max)
//                                 </label>
//                                 <input
//                                     id="hotel-price-max"
//                                     type="number"
//                                     min="0"
//                                     value={hotelForm.priceMax}
//                                     onChange={(e) => setHotelForm({ ...hotelForm, priceMax: e.target.value })}
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="Maximum price"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="hotel-contact-phone" className="block text-sm font-medium">
//                                     Contact Phone
//                                 </label>
//                                 <input
//                                     id="hotel-contact-phone"
//                                     type="tel"
//                                     value={hotelForm.contactPhone}
//                                     onChange={(e) => setHotelForm({ ...hotelForm, contactPhone: e.target.value })}
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="Contact phone"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="hotel-contact-email" className="block text-sm font-medium">
//                                     Contact Email
//                                 </label>
//                                 <input
//                                     id="hotel-contact-email"
//                                     type="email"
//                                     value={hotelForm.contactEmail}
//                                     onChange={(e) => setHotelForm({ ...hotelForm, contactEmail: e.target.value })}
//                                     className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="Contact email"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-800"
//                                 disabled={loading}
//                                 aria-label={editHotelId ? "Update hotel" : "Add hotel"}
//                             >
//                                 {loading ? "Saving..." : editHotelId ? "Update" : "Add"}
//                             </button>
//                         </form>
//                         <ul className="mt-4 space-y-2">
//                             {hotels.map((hotel) => (
//                                 <li
//                                     key={hotel._id}
//                                     className="flex justify-between items-center p-2 bg-gray-750 rounded border border-gray-700"
//                                 >
//                                     <span>{hotel.name}</span>
//                                     <div className="flex gap-2">
//                                         <button
//                                             onClick={() => handleHotelEdit(hotel)}
//                                             className="text-yellow-400 hover:text-yellow-500"
//                                             aria-label={`Edit ${hotel.name}`}
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleHotelDelete(hotel._id)}
//                                             className="text-red-400 hover:text-red-500"
//                                             aria-label={`Delete ${hotel.name}`}
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 p-6">
//                 <div className="max-w-4xl mx-auto">
//                     <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-2xl font-bold text-indigo-400 flex items-center">
//                                 <FaMapMarkerAlt className="mr-2" /> Location Manager
//                             </h2>
//                             <button
//                                 onClick={handleLogout}
//                                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-red-800 flex items-center"
//                                 disabled={loading}
//                                 aria-label="Logout"
//                             >
//                                 <FaSignOutAlt className="mr-1" /> {loading ? "Logging out..." : "Logout"}
//                             </button>
//                         </div>

//                         {/* Location Form */}
//                         <form onSubmit={handleLocationSubmit} className="flex flex-col sm:flex-row gap-4 mb-6" aria-label="Location form">
//                             <div className="relative flex-1">
//                                 <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                 <input
//                                     type="text"
//                                     placeholder="State"
//                                     value={form.state}
//                                     onChange={(e) => setForm({ ...form, state: e.target.value })}
//                                     required
//                                     className="w-full bg-gray-700 border border-gray-600 pl-10 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="State"
//                                 />
//                             </div>
//                             <div className="relative flex-1">
//                                 <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                 <input
//                                     type="text"
//                                     placeholder="City"
//                                     value={form.city}
//                                     onChange={(e) => setForm({ ...form, city: e.target.value })}
//                                     required
//                                     className="w-full bg-gray-700 border border-gray-600 pl-10 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="City"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-800"
//                                 disabled={loading}
//                                 aria-label={editId ? "Update location" : "Add location"}
//                             >
//                                 {loading ? "Saving..." : editId ? "Update" : "Add"}
//                             </button>
//                         </form>

//                         {/* Search and Sort */}
//                         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                             <div className="relative flex-1">
//                                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search by state or city..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="w-full bg-gray-700 border border-gray-600 pl-10 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="Search locations"
//                                 />
//                             </div>
//                             <div className="relative flex-none">
//                                 <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                 <select
//                                     value={sortOption}
//                                     onChange={(e) => setSortOption(e.target.value)}
//                                     className="bg-gray-700 border border-gray-600 pl-10 pr-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     aria-label="Sort locations"
//                                 >
//                                     <option value="latest">Latest</option>
//                                     <option value="oldest">Oldest</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Tabs */}
//                         <div className="flex gap-4 justify-center mb-4" role="tablist">
//                             <button
//                                 onClick={() => setTab("active")}
//                                 className={`px-4 py-2 rounded ${tab === "active" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
//                                 role="tab"
//                                 aria-selected={tab === "active"}
//                                 aria-controls="active-locations"
//                             >
//                                 Active
//                             </button>
//                             <button
//                                 onClick={() => setTab("inactive")}
//                                 className={`px-4 py-2 rounded ${tab === "inactive" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
//                                 role="tab"
//                                 aria-selected={tab === "inactive"}
//                                 aria-controls="inactive-locations"
//                             >
//                                 Inactive
//                             </button>
//                         </div>

//                         {/* Location List */}
//                         {loading ? (
//                             <div className="text-center text-gray-400 py-8">
//                                 <svg
//                                     className="animate-spin h-8 w-8 mx-auto mb-2 text-indigo-500"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                     <path
//                                         className="opacity-75"
//                                         fill="currentColor"
//                                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                     />
//                                 </svg>
//                                 Loading...
//                             </div>
//                         ) : (
//                             <ul className="space-y-3" id={tab === "active" ? "active-locations" : "inactive-locations"} role="tabpanel">
//                                 {(tab === "active" ? sortedActiveLocations : sortedInactiveLocations).map((loc) => (
//                                     <li
//                                         key={loc._id}
//                                         className="flex justify-between items-center p-4 border border-gray-700 rounded-lg bg-gray-750 hover:border-gray-600"
//                                     >
//                                         <div>
//                                             <p className="font-semibold text-indigo-300">{loc.state}</p>
//                                             <p className="text-sm text-gray-400">{loc.city}</p>
//                                         </div>
//                                         {tab === "active" ? (
//                                             <div className="flex gap-2">
//                                                 <button
//                                                     onClick={() => handleLocationEdit(loc)}
//                                                     className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 disabled:bg-yellow-800"
//                                                     disabled={loading}
//                                                     aria-label={`Edit ${loc.state}, ${loc.city}`}
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleLocationDelete(loc._id)}
//                                                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:bg-red-800"
//                                                     disabled={loading}
//                                                     aria-label={`Delete ${loc.state}, ${loc.city}`}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleLocationSoftDelete(loc._id)}
//                                                     className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 disabled:bg-gray-500"
//                                                     disabled={loading}
//                                                     aria-label={`Deactivate ${loc.state}, ${loc.city}`}
//                                                 >
//                                                     Deactivate
//                                                 </button>
//                                             </div>
//                                         ) : (
//                                             <button
//                                                 onClick={() => handleLocationActivate(loc._id)}
//                                                 className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:bg-green-800"
//                                                 disabled={loading}
//                                                 aria-label={`Activate ${loc.state}, ${loc.city}`}
//                                             >
//                                                 Activate
//                                             </button>
//                                         )}
//                                     </li>
//                                 ))}
//                                 {(tab === "active" ? sortedActiveLocations : sortedInactiveLocations).length === 0 && (
//                                     <li className="text-center text-gray-400 py-8">
//                                         <svg
//                                             className="h-12 w-12 mx-auto mb-4 text-gray-600"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                             />
//                                         </svg>
//                                         No {tab} locations found.
//                                     </li>
//                                 )}
//                             </ul>
//                         )}

//                         {/* Hotel Browser */}
//                         <div className="mt-8">
//                             <h3 className="text-xl font boldness text-indigo-400 mb-4 flex items-center">
//                                 <FaHotel className="mr-2" /> Browse Hotels
//                             </h3>
//                             <div className="space-y-4">
//                                 <div>
//                                     <label htmlFor="state-select" className="block text-sm font-medium">
//                                         Select State
//                                     </label>
//                                     <select
//                                         id="state-select"
//                                         value={selectedState}
//                                         onChange={handleStateChange}
//                                         className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                         aria-label="Select state"
//                                     >
//                                         <option value="">-- Select State --</option>
//                                         {states.map((state) => (
//                                             <option key={state._id} value={state._id}>
//                                                 {state.name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="city-select" className="block text-sm font-medium">
//                                         Select City
//                                     </label>
//                                     <select
//                                         id="city-select"
//                                         value={selectedCity}
//                                         onChange={handleCityChange}
//                                         disabled={!selectedState}
//                                         className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-600"
//                                         aria-label="Select city"
//                                     >
//                                         <option value="">-- Select City --</option>
//                                         {cities.map((city) => (
//                                             <option key={city._id} value={city._id}>
//                                                 {city.name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="hotel-select" className="block text-sm font-medium">
//                                         Select Hotel
//                                     </label>
//                                     <select
//                                         id="hotel-select"
//                                         value={selectedHotel?._id || ""}
//                                         onChange={handleHotelChange}
//                                         disabled={!selectedCity}
//                                         className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-600"
//                                         aria-label="Select hotel"
//                                     >
//                                         <option value="">-- Select Hotel --</option>
//                                         {hotels.map((hotel) => (
//                                             <option key={hotel._id} value={hotel._id}>
//                                                 {hotel.name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 {selectedHotel && (
//                                     <div
//                                         className="mt-4 p-4 bg-gray-750 rounded-lg border border-gray-700"
//                                         role="region"
//                                         aria-live="polite"
//                                     >
//                                         <h4 className="text-lg font-semibold text-indigo-300">{selectedHotel.name}</h4>
//                                         <p>
//                                             <strong>Address:</strong> {selectedHotel.address || "N/A"}
//                                         </p>
//                                         <p>
//                                             <strong>Rating:</strong> {selectedHotel.rating || "N/A"}/5
//                                         </p>
//                                         <p>
//                                             <strong>Amenities:</strong> {selectedHotel.amenities?.join(", ") || "N/A"}
//                                         </p>
//                                         <p>
//                                             <strong>Price Range:</strong> ₹{selectedHotel.priceRange?.min || "N/A"} - ₹
//                                             {selectedHotel.priceRange?.max || "N/A"}
//                                         </p>
//                                         <p>
//                                             <strong>Contact:</strong>{" "}
//                                             {(selectedHotel.contact?.phone || selectedHotel.contact?.email) ?
//                                                 [selectedHotel.contact?.phone, selectedHotel.contact?.email].filter(Boolean).join(" | ") : "N/A"}
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Error Message */}
//                         {error && (
//                             <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200">
//                                 {error}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LocationManager;