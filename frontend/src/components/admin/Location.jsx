
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCity, FaHotel, FaSignOutAlt, FaSearch, FaSort, FaUserAltSlash, FaUserAlt } from "react-icons/fa";

const LocationManager = () => {
      const navigate = useNavigate();
    const [states, setStates] = useState([]);
    const [inactiveStates, setInactiveStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [inactiveCities, setInactiveCities] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [inactiveHotels, setInactiveHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [inactiveRooms, setInactiveRooms] = useState([]);
    const [stateForm, setStateForm] = useState({ name: "", code: "" });
    const [cityForm, setCityForm] = useState({ name: "", stateId: "" });
    const [hotelForm, setHotelForm] = useState({
        stateId: "",
        cityId: "",
        name: "",
        address: "",
        rating: "",
        amenities: "",
        priceMin: "",
        priceMax: "",
        contactPhone: "",
        contactEmail: "",
        totalRooms: "",
    });
    const [roomForm, setRoomForm] = useState({
        stateId: "",
        cityId: "",
        hotelId: "",
        roomNumber: "",
        type: "",
        price: "",
        isAvailable: true,
        images: [],
        amenities: [],
        description: "",
        capacity: "",
    });
    const [editStateId, setEditStateId] = useState(null);
    const [editCityId, setEditCityId] = useState(null);
    const [editHotelId, setEditHotelId] = useState(null);
    const [editRoomId, setEditRoomId] = useState(null);
    const [sidebarTab, setSidebarTab] = useState("states");
    const [stateTab, setStateTab] = useState("active");
    const [cityTab, setCityTab] = useState("active");
    const [hotelTab, setHotelTab] = useState("active");
    const [roomTab, setRoomTab] = useState("active");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isHotelExpanded, setIsHotelExpanded] = useState(false);
    const [expandedHotels, setExpandedHotels] = useState({});

    const baseURL = "http://localhost:6969";

    // Fetch data
    const fetchStates = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/states`);
            const active = response.data.filter((s) => s.isActive);
            const inactive = response.data.filter((s) => !s.isActive);
            setStates(active);
            setInactiveStates(inactive);
        } catch (err) {
            console.error("fetchStates - Error:", err);
            setError(err.response?.data?.message || "Failed to fetch states.");
        }
    };

    const fetchCities = async (stateId) => {
        if (!stateId) {
            setCities([]);
            setInactiveCities([]);
            setHotels([]);
            setInactiveHotels([]);
            setRooms([]);
            setInactiveRooms([]);
            return;
        }
        try {
            const response = await axios.get(`${baseURL}/api/states/${stateId}/cities`);
            const active = response.data.filter((c) => c.isActive);
            const inactive = response.data.filter((c) => !c.isActive);
            setCities(active);
            setInactiveCities(inactive);
        } catch (err) {
            console.error("fetchCities - Error:", err);
            setError(err.response?.data?.message || "Failed to fetch cities.");
        }
    };

    const fetchHotels = async (cityId) => {
        if (!cityId) {
            setHotels([]);
            setInactiveHotels([]);
            setRooms([]);
            setInactiveRooms([]);
            setExpandedHotels({});
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/api/cities/${cityId}/hotels`);
            const active = response.data.filter((h) => h.isActive);
            const inactive = response.data.filter((h) => !h.isActive);
            setHotels(active);
            setInactiveHotels(inactive);
            setExpandedHotels({});
        } catch (err) {
            console.error("fetchHotels - Error:", err);
            setError(err.response?.data?.message || "Failed to fetch hotels.");
        } finally {
            setLoading(false);
        }
    };

    const fetchRooms = async (hotelId) => {
        if (!hotelId) {
            setRooms([]);
            setInactiveRooms([]);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/api/${hotelId}/rooms`);
            const active = response.data.filter((r) => r.isActive);
            const inactive = response.data.filter((r) => !r.isActive);
            setRooms(active);
            setInactiveRooms(inactive);
        } catch (err) {
            console.error("fetchRooms - Error:", err);
            setError(err.response?.data?.message || "Failed to fetch rooms.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStates();
    }, []);

    // Toggle expand/collapse
    const toggleHotelDetails = (hotelId) => {
        setExpandedHotels((prev) => ({
            ...prev,
            [hotelId]: !prev[hotelId],
        }));
    };

    // State handlers
    const handleStateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const payload = {
            name: stateForm.name?.trim(),
            code: stateForm.code?.trim(),
        };
        if (!payload.name || !payload.code) {
            setError("Name and code are required.");
            setLoading(false);
            return;
        }
        try {
            if (editStateId) {
                await axios.put(`${baseURL}/api/states/${editStateId}`, payload);
            } else {
                await axios.post(`${baseURL}/api/states/add`, payload);
            }
            setStateForm({ name: "", code: "" });
            setEditStateId(null);
            await fetchStates();
        } catch (err) {
            console.error("handleStateSubmit - Error:", err);
            setError(err.response?.data?.message || "Failed to save state.");
        } finally {
            setLoading(false);
        }
    };

    const handleStateEdit = (state) => {
        setStateForm({ name: state.name, code: state.code });
        setEditStateId(state._id);
        setStateTab("active");
    };

    const handleStateDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            await axios.delete(`${baseURL}/api/states/${id}`);
            await fetchStates();
            alert("State deleted successfully with cities and hotels");
        } catch (err) {
            console.error("handleStateDelete - Error:", err);
            setError(err.response?.data?.message || "Failed to delete state.");
        } finally {
            setLoading(false);
        }
    };

    const handleStateSoftDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            await axios.patch(`${baseURL}/api/states/${id}/softdelete`);
            await fetchStates();
            setStateTab("inactive");
        } catch (err) {
            console.error("handleStateSoftDelete - Error:", err);
            setError(err.response?.data?.message || "Failed to soft-delete state.");
        } finally {
            setLoading(false);
        }
    };

    const handleStateActivate = async (id) => {
        setLoading(true);
        setError("");
        try {
            await axios.patch(`${baseURL}/api/states/${id}/activate`);
            await fetchStates();
            setStateTab("active");
        } catch (err) {
            console.error("handleStateActivate - Error:", err);
            setError(err.response?.data?.message || "Failed to activate state.");
        } finally {
            setLoading(false);
        }
    };

    // City handlers
    const handleCitySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const payload = {
            name: cityForm.name?.trim(),
            state: cityForm.stateId,
        };
        if (!payload.name || !payload.state) {
            setError("Name and state are required.");
            setLoading(false);
            return;
        }
        try {
            if (editCityId) {
                await axios.put(`${baseURL}/api/cities/${editCityId}`, payload);
            } else {
                await axios.post(`${baseURL}/api/cities/add`, payload);
            }
            const stateId = cityForm.stateId;
            setCityForm({ name: "", stateId: "" });
            setEditCityId(null);
            setCityTab("active");
            await fetchCities(stateId);
        } catch (err) {
            console.error("handleCitySubmit - Error:", err);
            setError(err.response?.data?.message || "Failed to save city.");
        } finally {
            setLoading(false);
        }
    };

    const handleCityEdit = (city) => {
        setCityForm({
            name: city.name || "",
            stateId: city.state?._id || "",
        });
        setEditCityId(city._id);
        setCityTab("active");
    };

    const handleCityDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            await axios.delete(`${baseURL}/api/cities/${id}`);
            await fetchCities(selectedState);
        } catch (err) {
            console.error("handleCityDelete - Error:", err);
            setError(err.response?.data?.message || "Failed to delete city.");
        } finally {
            setLoading(false);
        }
    };

    const handleCitySoftDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            const city = cities.find((c) => c._id === id) || inactiveCities.find((c) => c._id === id);
            const stateId = city?.state?._id || selectedState || "";
            await axios.patch(`${baseURL}/api/cities/${id}/softdelete`);
            if (stateId) {
                await fetchCities(stateId);
                setSelectedState(stateId);
            } else {
                setCities([]);
                setInactiveCities([]);
                setError("No state selected. Please select a state to view cities.");
            }
            setCityTab("inactive");
        } catch (err) {
            console.error("handleCitySoftDelete - Error:", err);
            setError(err.response?.data?.message || "Failed to soft-delete city.");
        } finally {
            setLoading(false);
        }
    };

    const handleCityActivate = async (id) => {
        setLoading(true);
        setError("");
        try {
            await axios.patch(`${baseURL}/api/cities/${id}/activate`);
            await fetchCities(selectedState);
            setCityTab("active");
        } catch (err) {
            console.error("handleCityActivate - Error:", err);
            setError(err.response?.data?.message || "Failed to activate city.");
        } finally {
            setLoading(false);
        }
    };

    // Hotel handle submit ------------------------------------
    const handleHotelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const payload = {
            name: hotelForm.name?.trim() || "",
            city: hotelForm.cityId || "",
            address: hotelForm.address?.trim() || "",
            rating: parseFloat(hotelForm.rating) || undefined,
            amenities: hotelForm.amenities
                ? hotelForm.amenities
                    .split(",")
                    .map((a) => a.trim())
                    .filter((a) => a)
                : [],
            priceRange: {
                min: parseFloat(hotelForm.priceMin) || undefined,
                max: parseFloat(hotelForm.priceMax) || undefined,
            },
            contact: {
                phone: hotelForm.contactPhone?.trim() || "",
                email: hotelForm.contactEmail?.trim() || "",
            },
            totalRooms: parseInt(hotelForm.totalRooms, 10) || undefined,
        };
        if (!payload.name || !payload.city || payload.totalRooms === undefined) {
            setError("Name, city, and total rooms are required.");
            setLoading(false);
            return;
        }
        try {
            if (editHotelId) {
                await axios.put(`${baseURL}/api/hotels/${editHotelId}`, payload);
            } else {
                await axios.post(`${baseURL}/api/hotels/add`, payload);
            }
            const cityId = hotelForm.cityId;
            setHotelForm({
                stateId: hotelForm.stateId,
                cityId: cityId,
                name: "",
                address: "",
                rating: "",
                amenities: "",
                priceMin: "",
                priceMax: "",
                contactPhone: "",
                contactEmail: "",
                totalRooms: "",
            });
            setEditHotelId(null);
            setHotelTab("active");
            await fetchHotels(cityId);
        } catch (err) {
            console.error("handleHotelSubmit - Error:", err);
            setError(err.response?.data?.message || "Failed to save hotel.");
        } finally {
            setLoading(false);
        }
    };

    const handleHotelEdit = (hotel) => {
        const cityId = hotel.city?._id || "";
        const stateId = hotel.city?.state?._id || selectedState || "";
        setHotelForm({
            stateId,
            cityId,
            name: hotel.name || "",
            address: hotel.address || "",
            rating: hotel.rating?.toString() || "",
            amenities: hotel.amenities?.join(", ") || "",
            priceMin: hotel.priceRange?.min?.toString() || "",
            priceMax: hotel.priceRange?.max?.toString() || "",
            contactPhone: hotel.contact?.phone || "",
            contactEmail: hotel.contact?.email || "",
            totalRooms: hotel.totalRooms?.toString() || "",
        });
        setEditHotelId(hotel._id);
        setHotelTab("active");
        if (stateId) {
            fetchCities(stateId);
        }
        if (cityId) {
            fetchHotels(cityId);
        }
    };

    const handleHotelDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            await axios.delete(`${baseURL}/api/hotels/${id}`);
            await fetchHotels(hotelForm.cityId || selectedCity);
        } catch (err) {
            console.error("handleHotelDelete - Error:", err);
            setError(err.response?.data?.message || "Failed to delete hotel.");
        } finally {
            setLoading(false);
        }
    };

    const handleHotelSoftDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            await axios.patch(`${baseURL}/api/hotels/${id}/softdelete`);
            await fetchHotels(hotelForm.cityId || selectedCity);
            setHotelTab("inactive");
        } catch (err) {
            console.error("handleHotelSoftDelete - Error:", err);
            setError(err.response?.data?.message || "Failed to soft-delete hotel.");
        } finally {
            setLoading(false);
        }
    };

    const handleHotelActivate = async (id) => {
        setLoading(true);
        setError("");
        try {
            await axios.patch(`${baseURL}/api/hotels/${id}/activate`);
            await fetchHotels(hotelForm.cityId || selectedCity);
            setHotelTab("active");
        } catch (err) {
            console.error("handleHotelActivate - Error:", err);
            setError(err.response?.data?.message || "Failed to activate hotel.");
        } finally {
            setLoading(false);
        }
    };

    // Room image upload-----------------------------
    const handleImageUpload = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setLoading(true);
        setError("");
        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append("images", files[i]);
            }

            const response = await axios.post(`${baseURL}/api/rooms/upload-images`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setRoomForm((prev) => ({
                ...prev,
                images: [...prev.images, ...response.data.imageUrls],
            }));
        } catch (err) {
            console.error("handleImageUpload - Error:", err);
            setError(err.response?.data?.message || "Failed to upload images.");
        } finally {
            setLoading(false);
        }
    };

    const removeImage = (index) => {
        setRoomForm((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleAmenitiesChange = (e) => {
        const { value, checked } = e.target;
        setRoomForm((prev) => {
            const amenities = checked
                ? [...prev.amenities, value]
                : prev.amenities.filter((amenity) => amenity !== value);
            return { ...prev, amenities };
        });
    };

    const handleRoomSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const payload = new FormData();
        payload.append("roomNumber", roomForm.roomNumber?.trim() || "");
        payload.append("hotel", roomForm.hotelId || "");
        payload.append("type", roomForm.type?.trim() || "Standard");
        payload.append("price", parseFloat(roomForm.price) || "");
        payload.append("isAvailable", roomForm.isAvailable);
        payload.append("images", JSON.stringify(roomForm.images));
        payload.append("amenities", JSON.stringify(roomForm.amenities));
        payload.append("description", roomForm.description?.trim() || "");
        payload.append("capacity", parseInt(roomForm.capacity, 10) || "");

        if (!roomForm.roomNumber || !roomForm.hotelId) {
            setError("Room number and hotel are required.");
            setLoading(false);
            return;
        }
        try {
            if (editRoomId) {
                await axios.put(`${baseURL}/api/rooms/${editRoomId}`, payload, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post(`${baseURL}/api/rooms/add`, payload, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            const hotelId = roomForm.hotelId;
            setRoomForm({
                stateId: roomForm.stateId,
                cityId: roomForm.cityId,
                hotelId: hotelId,
                roomNumber: "",
                stateId: "",
                cityId: "",
                hotelId: "",
                type: "",
                price: "",
                isAvailable: true,
                images: [],
                amenities: [],
                description: "",
                capacity: "",
            });
            setEditRoomId(null);
            setRoomTab("active");
            await fetchRooms(hotelId);
        } catch (err) {
            console.error("handleRoomSubmit - Error:", err);
            setError(err.response?.data?.message || "Failed to save room.");
        } finally {
            setLoading(false);
        }
    };

    const handleRoomEdit = (room) => {
        const hotelId = room.hotel?._id || "";
        const cityId = room.hotel?.city?._id || "";
        const stateId = room.hotel?.city?.state?._id || selectedState || "";
        setRoomForm({
            stateId,
            cityId,
            hotelId,
            roomNumber: room.roomNumber || "",
            type: room.type || "",
            price: room.price?.toString() || "",
            isAvailable: room.isAvailable ?? true,
            images: room.images || [],
            amenities: room.amenities || [],
            description: room.description || "",
            capacity: room.capacity?.toString() || "",
        });
        setEditRoomId(room._id);
        setRoomTab("active");
        if (stateId && !cities.length) {
            fetchCities(stateId);
        }
        if (cityId) {
            setSelectedCity(cityId);
            fetchHotels(cityId);
        }
        if (hotelId) {
            setSelectedHotel(hotelId);
            fetchRooms(hotelId);
        }
    };

    const handleRoomDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            await axios.delete(`${baseURL}/api/rooms/${id}`);
            await fetchRooms(roomForm.hotelId || selectedHotel);
        } catch (err) {
            console.error("handleRoomDelete - Error:", err);
            setError(err.response?.data?.message || "Failed to delete room.");
        } finally {
            setLoading(false);
        }
    };

    const handleRoomSoftDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            await axios.patch(`${baseURL}/api/rooms/${id}/softdelete`);
            await fetchRooms(roomForm.hotelId || selectedHotel);
            setRoomTab("inactive");
        } catch (err) {
            console.error("handleRoomSoftDelete - Error:", err);
            setError(err.response?.data?.message || "Failed to soft-delete room.");
        } finally {
            setLoading(false);
        }
    };

    const handleRoomActivate = async (id) => {
        setLoading(true);
        setError("");
        try {
            await axios.patch(`${baseURL}/api/rooms/${id}/activate`);
            await fetchRooms(roomForm.hotelId || selectedHotel);
            setRoomTab("active");
        } catch (err) {
            console.error("handleRoomActivate - Error:", err);
            setError(err.response?.data?.message || "Failed to activate room.");
        } finally {
            setLoading(false);
        }
    };

    // Dropdown--------------------------
    const handleStateChange = async (e) => {
        const stateId = e.target.value;
        setSelectedState(stateId);
        setSelectedCity("");
        setHotels([]);
        setInactiveHotels([]);
        setRooms([]);
        setInactiveRooms([]);
        setExpandedHotels({});
        await fetchCities(stateId);
    };

    //   const handleCityChange = async (e) => {
    //     const cityId = e.target.value;
    //     setSelectedCity(cityId);
    //     setHotelForm((prev) => ({ ...prev, cityId }));
    //     setRooms([]);
    //     setInactiveRooms([]);
    //     await fetchHotels => async (e) => {
    //     const cityId = e.target.value;
    //     setSelectedCity(cityId);
    //     setHotelForm((prev) => ({ ...prev, cityId }));
    //     await fetchHotels(cityId);
    //   };

    const handleCityChange = async (e) => {
        const cityId = e.target.value;
        setSelectedCity(cityId);
        setHotelForm((prev) => ({ ...prev, cityId }));
        setRooms([]);
        setInactiveRooms([]);
        await fetchHotels(cityId); 
    };


   
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

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex">
            {/* --------------------------------Sidebar -----------------------------*/}
            <div className="w-80 bg-gray-800 p-6 flex-shrink-0">
                <h1 className="text-3xl font-bold text-indigo-400 mb-6 flex items-center">
                    <button onClick={handleLogout} className="text-gray-300 mb-2 hover:text-white flex items-center">
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                </h1>
                <h1 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center">
                    <FaUserAlt className="mr-2" />Hello, Admin
                </h1>
                <h2 className="text-xl font-bold text-indigo-400 mb-6 flex items-center">
                    <FaMapMarkerAlt className="mr-2" /> Manage Locations
                </h2>
                <div className="flex flex-col gap-2 mb-4" role="tablist">
                    <button
                        onClick={() => setSidebarTab("states")}
                        className={`py-2 rounded ${sidebarTab === "states" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        role="tab"
                        aria-selected={sidebarTab === "states"}
                    >
                        States
                    </button>
                    <button
                        onClick={() => setSidebarTab("cities")}
                        className={`py-2 rounded ${sidebarTab === "cities" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        role="tab"
                        aria-selected={sidebarTab === "cities"}
                    >
                        Cities
                    </button>
                    <button
                        onClick={() => setSidebarTab("hotels")}
                        className={`py-2 rounded ${sidebarTab === "hotels" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        role="tab"
                        aria-selected={sidebarTab === "hotels"}
                    >
                        Hotels
                    </button>
                    <button
                        onClick={() => setSidebarTab("rooms")}
                        className={`py-2 rounded ${sidebarTab === "rooms" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        role="tab"
                        aria-selected={sidebarTab === "rooms"}
                    >
                        Rooms
                    </button>
                </div>

                {/*-------------------------------------- States Tab--------------------------------- */}
                {sidebarTab === "states" && (
                    <div>
                        <form onSubmit={handleStateSubmit} className="space-y-4" aria-label="State form">
                            <div>
                                <label htmlFor="state-name" className="block text-sm font-medium">
                                    State Name
                                </label>
                                <input
                                    id="state-name"
                                    type="text"
                                    value={stateForm.name}
                                    onChange={(e) => setStateForm({ ...stateForm, name: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    aria-label="State name"
                                />
                            </div>
                            <div>
                                <label htmlFor="state-code" className="block text-sm font-medium">
                                    State Code
                                </label>
                                <input
                                    id="state-code"
                                    type="text"
                                    value={stateForm.code}
                                    onChange={(e) => setStateForm({ ...stateForm, code: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    aria-label="State code"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-800"
                                disabled={loading}
                                aria-label={editStateId ? "Update state" : "Add state"}
                            >
                                {loading ? "Saving..." : editStateId ? "Update" : "Add"}
                            </button>
                        </form>
                        <div className="flex gap-4 justify-center my-4" role="tablist">
                            <button
                                onClick={() => setStateTab("active")}
                                className={`px-4 py-2 rounded ${stateTab === "active" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                role="tab"
                                aria-selected={stateTab === "active"}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setStateTab("inactive")}
                                className={`px-4 py-2 rounded ${stateTab === "inactive" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                role="tab"
                                aria-selected={stateTab === "inactive"}
                            >
                                Inactive
                            </button>
                        </div>
                        <ul className="mt-4 space-y-2">
                            {(stateTab === "active" ? states : inactiveStates).map((state) => (
                                <li
                                    key={state._id}
                                    className="flex justify-between items-center p-2 bg-gray-750 rounded border border-gray-700"
                                >
                                    <span>
                                        {state.name} ({state.code})
                                    </span>
                                    <div className="flex gap-2">
                                        {stateTab === "active" ? (
                                            <>
                                                <button
                                                    onClick={() => handleStateEdit(state)}
                                                    className="text-yellow-400 hover:text-yellow-500"
                                                    aria-label={`Edit ${state.name}`}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleStateDelete(state._id)}
                                                    className="text-red-400 hover:text-red-500"
                                                    aria-label={`Delete ${state.name}`}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => handleStateSoftDelete(state._id)}
                                                    className="text-gray-400 hover:text-gray-500"
                                                    aria-label={`Deactivate ${state.name}`}
                                                >
                                                    Deactivate
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleStateActivate(state._id)}
                                                className="text-green-400 hover:text-green-500"
                                                aria-label={`Activate ${state.name}`}
                                            >
                                                Activate
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                            {(stateTab === "active" ? states : inactiveStates).length === 0 && (
                                <li className="text-center text-gray-400 py-4">No {stateTab} states found.</li>
                            )}
                        </ul>
                    </div>
                )}

                {/* -------------------------------Cities Tab--------------------------------------- */}
                {sidebarTab === "cities" && (
                    <div>
                        <form onSubmit={handleCitySubmit} className="space-y-4" aria-label="City form">
                            <div>
                                <label htmlFor="city-name" className="block text-sm font-medium">
                                    City Name
                                </label>
                                <input
                                    id="city-name"
                                    type="text"
                                    value={cityForm.name}
                                    onChange={(e) => setCityForm({ ...cityForm, name: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    aria-label="City name"
                                />
                            </div>
                            <div>
                                <label htmlFor="city-state" className="block text-sm font-medium">
                                    State
                                </label>
                                <select
                                    id="city-state"
                                    value={cityForm.stateId}
                                    onChange={(e) => {
                                        const stateId = e.target.value;
                                        setCityForm({ ...cityForm, stateId });
                                        fetchCities(stateId);
                                    }}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    aria-label="Select state for city"
                                >
                                    <option value="">-- Select State --</option>
                                    {states.map((state) => (
                                        <option key={state._id} value={state._id}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-800"
                                disabled={loading}
                                aria-label={editCityId ? "Update city" : "Add city"}
                            >
                                {loading ? "Saving..." : editCityId ? "Update" : "Add"}
                            </button>
                        </form>
                        <div className="flex gap-4 justify-center my-4" role="tablist">
                            <button
                                onClick={() => setCityTab("active")}
                                className={`px-4 py-2 rounded ${cityTab === "active" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                role="tab"
                                aria-selected={cityTab === "active"}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setCityTab("inactive")}
                                className={`px-4 py-2 rounded ${cityTab === "inactive" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                role="tab"
                                aria-selected={cityTab === "inactive"}
                            >
                                Inactive
                            </button>
                        </div>
                        <ul className="mt-4 space-y-2">
                            {(cityTab === "active" ? cities : inactiveCities).map((city) => (
                                <li
                                    key={city._id}
                                    className="flex justify-between items-center p-2 bg-gray-750 rounded border border-gray-700"
                                >
                                    <span>{city.name}</span>
                                    <div className="flex gap-2">
                                        {cityTab === "active" ? (
                                            <>
                                                <button
                                                    onClick={() => handleCityEdit(city)}
                                                    className="text-yellow-400 hover:text-yellow-500"
                                                    aria-label={`Edit ${city.name}`}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleCityDelete(city._id)}
                                                    className="text-red-400 hover:text-red-500"
                                                    aria-label={`Delete ${city.name}`}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => handleCitySoftDelete(city._id)}
                                                    className="text-gray-400 hover:text-gray-500"
                                                    aria-label={`Deactivate ${city.name}`}
                                                >
                                                    Deactivate
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleCityActivate(city._id)}
                                                className="text-green-400 hover:text-green-500"
                                                aria-label={`Activate ${city.name}`}
                                            >
                                                Activate
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                            {(cityTab === "active" ? cities : inactiveCities).length === 0 && (
                                <li className="text-center text-gray-400 py-4">No {cityTab} cities found.</li>
                            )}
                        </ul>
                    </div>
                )}

                {/*------------------------------- Hotels Tab ------------------------------- */}
                {sidebarTab === "hotels" && (
                    <div>
                        <form onSubmit={handleHotelSubmit} className="space-y-4" aria-label="Hotel form">
                            <div>
                                <label htmlFor="hotel-state" className="block text-sm font-medium">
                                    State
                                </label>
                                <select
                                    id="hotel-state"
                                    value={hotelForm.stateId}
                                    onChange={(e) => {
                                        const stateId = e.target.value;
                                        setHotelForm({ ...hotelForm, stateId, cityId: "" });
                                        setSelectedState(stateId);
                                        fetchCities(stateId);
                                    }}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Select state for hotel"
                                >
                                    <option value="">-- Select State --</option>
                                    {states.map((state) => (
                                        <option key={state._id} value={state._id}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="hotel-city" className="block text-sm font-medium">
                                    City
                                </label>
                                <select
                                    id="hotel-city"
                                    value={hotelForm.cityId}
                                    onChange={(e) => {
                                        const cityId = e.target.value;
                                        setHotelForm({ ...hotelForm, cityId });
                                        setSelectedCity(cityId);
                                        if (cityId) {
                                            fetchHotels(cityId);
                                        } else {
                                            setHotels([]);
                                            setInactiveHotels([]);
                                            setExpandedHotels({});
                                        }
                                    }}
                                    disabled={!hotelForm.stateId}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 disabled:bg-gray-600"
                                    aria-label="Select city for hotel"
                                >
                                    <option value="">-- Select City --</option>
                                    {cities.map((city) => (
                                        <option key={city._id} value={city._id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="hotel-name" className="block text-sm font-medium">
                                    Hotel Name
                                </label>
                                <input
                                    id="hotel-name"
                                    type="text"
                                    value={hotelForm.name}
                                    onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Hotel name"
                                />
                            </div>
                            <div>
                                <label htmlFor="hotel-address" className="block text-sm font-medium">
                                    Address
                                </label>
                                <input
                                    id="hotel-address"
                                    type="text"
                                    value={hotelForm.address}
                                    onChange={(e) => setHotelForm({ ...hotelForm, address: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Hotel address"
                                />
                            </div>
                            <div>
                                <label htmlFor="hotel-rating" className="block text-sm font-medium">
                                    Rating (1-5)
                                </label>
                                <input
                                    id="hotel-rating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    value={hotelForm.rating}
                                    onChange={(e) => setHotelForm({ ...hotelForm, rating: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Hotel rating"
                                />
                            </div>
                            <div>
                                <label htmlFor="hotel-amenities" className="block text-sm font-medium">
                                    Amenities (comma-separated)
                                </label>
                                <input
                                    id="hotel-amenities"
                                    type="text"
                                    value={hotelForm.amenities}
                                    onChange={(e) => setHotelForm({ ...hotelForm, amenities: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Hotel amenities"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label htmlFor="hotel-price-min" className="block text-sm font-medium">
                                        Price Min
                                    </label>
                                    <input
                                        id="hotel-price-min"
                                        type="number"
                                        min="0"
                                        value={hotelForm.priceMin}
                                        onChange={(e) => setHotelForm({ ...hotelForm, priceMin: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                        aria-label="Hotel price minimum"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="hotel-price-max" className="block text-sm font-medium">
                                        Price Max
                                    </label>
                                    <input
                                        id="hotel-price-max"
                                        type="number"
                                        min="0"
                                        value={hotelForm.priceMax}
                                        onChange={(e) => setHotelForm({ ...hotelForm, priceMax: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                        aria-label="Hotel price maximum"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="hotel-contact-phone" className="block text-sm font-medium">
                                    Contact Phone
                                </label>
                                <input
                                    id="hotel-contact-phone"
                                    type="text"
                                    value={hotelForm.contactPhone}
                                    onChange={(e) => setHotelForm({ ...hotelForm, contactPhone: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Hotel contact phone"
                                />
                            </div>
                            <div>
                                <label htmlFor="hotel-contact-email" className="block text-sm font-medium">
                                    Contact Email
                                </label>
                                <input
                                    id="hotel-contact-email"
                                    type="email"
                                    value={hotelForm.contactEmail}
                                    onChange={(e) => setHotelForm({ ...hotelForm, contactEmail: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Hotel contact email"
                                />
                            </div>
                            <div>
                                <label htmlFor="hotel-total-rooms" className="block text-sm font-medium">
                                    Total Rooms
                                </label>
                                <input
                                    id="hotel-total-rooms"
                                    type="number"
                                    min="0"
                                    value={hotelForm.totalRooms}
                                    onChange={(e) => setHotelForm({ ...hotelForm, totalRooms: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Hotel total rooms"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-800"
                                disabled={loading || !hotelForm.cityId}
                                aria-label={editHotelId ? "Update hotel" : "Add hotel"}
                            >
                                {loading ? "Saving..." : editHotelId ? "Update" : "Add"}
                            </button>
                        </form>
                        <div className="flex gap-4 justify-center my-4">
                            <button
                                onClick={() => setHotelTab("active")}
                                className={`px-4 py-2 rounded ${hotelTab === "active" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"
                                    }`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setHotelTab("inactive")}
                                className={`px-4 py-2 rounded ${hotelTab === "inactive" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"
                                    }`}
                            >
                                Inactive
                            </button>
                        </div>
                        <ul className="mt-4 space-y-2">
                            {(hotelTab === "active" ? hotels : inactiveHotels).map((hotel) => (
                                <li
                                    key={hotel._id}
                                    className="flex justify-between items-center p-2 bg-gray-750 rounded border border-gray-700"
                                >
                                    <span>{hotel.name}</span>
                                    <div className="flex gap-2">
                                        {hotelTab === "active" ? (
                                            <>
                                                <button
                                                    onClick={() => handleHotelEdit(hotel)}
                                                    className="text-yellow-400 hover:text-yellow-500"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleHotelDelete(hotel._id)}
                                                    className="text-red-400 hover:text-red-500"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => handleHotelSoftDelete(hotel._id)}
                                                    className="text-gray-400 hover:text-gray-500"
                                                >
                                                    Deactivate
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleHotelActivate(hotel._id)}
                                                className="text-green-400 hover:text-green-500"
                                            >
                                                Activate
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                            {(hotelTab === "active" ? hotels : inactiveHotels).length === 0 && (
                                <li className="text-center text-gray-400 py-4">No {hotelTab} hotels found.</li>
                            )}
                        </ul>
                    </div>
                )}

                {/* ------------------------------- Rooms Tab -------------------------------*/}
                {sidebarTab === "rooms" && (
                    <div>
                        <form onSubmit={handleRoomSubmit} className="space-y-4" aria-label="Room form">
                            <div>
                                <label htmlFor="room-state" className="block text-sm font-medium">
                                    State
                                </label>
                                <select
                                    id="room-state"
                                    value={roomForm.stateId}
                                    onChange={(e) => {
                                        const stateId = e.target.value;
                                        setRoomForm({ ...roomForm, stateId, cityId: "", hotelId: "" });
                                        setSelectedState(stateId);
                                        fetchCities(stateId);
                                    }}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Select state for room"
                                >
                                    <option value="">-- Select State --</option>
                                    {states.map((state) => (
                                        <option key={state._id} value={state._id}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="room-city" className="block text-sm font-medium">
                                    City
                                </label>
                                <select
                                    id="room-city"
                                    value={roomForm.cityId}
                                    onChange={(e) => {
                                        const cityId = e.target.value;
                                        setRoomForm({ ...roomForm, cityId, hotelId: "" });
                                        setSelectedCity(cityId);
                                        if (cityId) {
                                            fetchHotels(cityId);
                                        } else {
                                            setHotels([]);
                                            setInactiveHotels([]);
                                            setRooms([]);
                                            setInactiveRooms([]);
                                        }
                                    }}
                                    disabled={!roomForm.stateId}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 disabled:bg-gray-600"
                                    aria-label="Select city for room"
                                >
                                    <option value="">-- Select City --</option>
                                    {cities.map((city) => (
                                        <option key={city._id} value={city._id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="room-hotel" className="block text-sm font-medium">
                                    Hotel
                                </label>
                                <select
                                    id="room-hotel"
                                    value={roomForm.hotelId}
                                    onChange={(e) => {
                                        const hotelId = e.target.value;
                                        setRoomForm({ ...roomForm, hotelId });
                                        setSelectedHotel(hotelId);
                                        if (hotelId) {
                                            fetchRooms(hotelId);
                                        } else {
                                            setRooms([]);
                                            setInactiveRooms([]);
                                        }
                                    }}
                                    disabled={!roomForm.cityId}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100 disabled:bg-gray-600"
                                    aria-label="Select hotel for room"
                                >
                                    <option value="">-- Select Hotel --</option>
                                    {hotels.map((hotel) => (
                                        <option key={hotel._id} value={hotel._id}>
                                            {hotel.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="room-number" className="block text-sm font-medium">
                                    Room Number
                                </label>
                                <input
                                    id="room-number"
                                    type="text"
                                    value={roomForm.roomNumber}
                                    onChange={(e) => setRoomForm({ ...roomForm, roomNumber: e.target.value })}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Room number"
                                />
                            </div>
                            <div>
                                <label htmlFor="room-type" className="block text-sm font-medium">
                                    Room Type
                                </label>
                                <input
                                    id="room-type"
                                    type="text"
                                    value={roomForm.type}
                                    onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Room type"
                                />
                            </div>
                            <div>
                                <label htmlFor="room-price" className="block text-sm font-medium">
                                    Price
                                </label>
                                <input
                                    id="room-price"
                                    type="number"
                                    min="0"
                                    value={roomForm.price}
                                    onChange={(e) => setRoomForm({ ...roomForm, price: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Room price"
                                />
                            </div>
                            <div>
                                <label htmlFor="room-capacity" className="block text-sm font-medium">
                                    Capacity (Guests)
                                </label>
                                <input
                                    id="room-capacity"
                                    type="number"
                                    min="1"
                                    value={roomForm.capacity}
                                    onChange={(e) => setRoomForm({ ...roomForm, capacity: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Room capacity"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Amenities</label>
                                <div className="mt-2 space-y-2">
                                    {["WiFi", "TV", "Air Conditioning", "Mini Bar", "Room Service", "Balcony"].map((amenity) => (
                                        <div key={amenity} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`room-amenity-${amenity}`}
                                                value={amenity}
                                                checked={roomForm.amenities.includes(amenity)}
                                                onChange={handleAmenitiesChange}
                                                className="bg-gray-700 border border-gray-600 rounded text-indigo-600"
                                            />
                                            <label htmlFor={`room-amenity-${amenity}`} className="ml-2 text-sm text-gray-100">
                                                {amenity}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="room-description" className="block text-sm font-medium">
                                    Description
                                </label>
                                <textarea
                                    id="room-description"
                                    value={roomForm.description}
                                    onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    rows="4"
                                    aria-label="Room description"
                                />
                            </div>
                            <div>
                                <label htmlFor="room-images" className="block text-sm font-medium">
                                    Room Images
                                </label>
                                <input
                                    id="room-images"
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/jpg"
                                    onChange={handleImageUpload}
                                    className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded text-gray-100"
                                    aria-label="Upload room images"
                                />
                                {roomForm.images.length > 0 && (
                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        {roomForm.images.map((url, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={url}
                                                    alt={`Room image ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                    aria-label="Remove image"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="room-available" className="block text-sm font-medium">
                                    Available
                                </label>
                                <input
                                    id="room-available"
                                    type="checkbox"
                                    checked={roomForm.isAvailable}
                                    onChange={(e) => setRoomForm({ ...roomForm, isAvailable: e.target.checked })}
                                    className="bg-gray-700 border border-gray-600 rounded text-indigo-600"
                                    aria-label="Room availability"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-800"
                                disabled={loading || !roomForm.hotelId}
                                aria-label={editRoomId ? "Update room" : "Add room"}
                            >
                                {loading ? "Saving..." : editRoomId ? "Update" : "Add"}
                            </button>
                        </form>
                        <div className="flex gap-4 justify-center my-4">
                            <button
                                onClick={() => setRoomTab("active")}
                                className={`px-4 py-2 rounded ${roomTab === "active" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"
                                    }`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setRoomTab("inactive")}
                                className={`px-4 py-2 rounded ${roomTab === "inactive" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"
                                    }`}
                            >
                                Inactive
                            </button>
                        </div>
                        <ul className="mt-4 space-y-2">
                            {(roomTab === "active" ? rooms : inactiveRooms).map((room) => (
                                <li
                                    key={room._id}
                                    className="flex justify-between items-center p-2 bg-gray-750 rounded border border-gray-700"
                                >
                                    <span>
                                        Room {room.roomNumber} ({room.type})
                                    </span>
                                    <div className="flex gap-2">
                                        {roomTab === "active" ? (
                                            <>
                                                <button
                                                    onClick={() => handleRoomEdit(room)}
                                                    className="text-yellow-400 hover:text-yellow-500"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleRoomDelete(room._id)}
                                                    className="text-red-400 hover:text-red-500"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => handleRoomSoftDelete(room._id)}
                                                    className="text-gray-400 hover:text-gray-500"
                                                >
                                                    Deactivate
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleRoomActivate(room._id)}
                                                className="text-green-400 hover:text-green-500"
                                            >
                                                Activate
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                            {(roomTab === "active" ? rooms : inactiveRooms).length === 0 && (
                                <li className="text-center text-gray-400 py-4">No {roomTab} rooms found.</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {/* -------------------------------view------------------------------- */}
            <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                        
         
                        {/* Hotel Browser */}
                        <div className="mt-8">
  <h3 className="text-2xl font-bold text-indigo-300 mb-6">Hotel Browser</h3>
  <div className="space-y-5">
    <div>
      <label htmlFor="state-select" className="block text-sm font-semibold text-gray-200 mb-2">
        Select State
      </label>
      <select
        id="state-select"
        value={selectedState}
        onChange={handleStateChange}
        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
        aria-label="Select state"
      >
        <option value="">-- Select State --</option>
        {states.map((state) => (
          <option key={state._id} value={state._id}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label htmlFor="city-select" className="block text-sm font-semibold text-gray-200 mb-2">
        Select City
      </label>
      <select
        id="city-select"
        value={selectedCity}
        onChange={handleCityChange}
        disabled={!selectedState}
        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 disabled:bg-gray-700 disabled:text-gray-400 transition-all duration-200"
        aria-label="Select city"
      >
        <option value="">-- Select City --</option>
        {cities.map((city) => (
          <option key={city._id} value={city._id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  </div>
  {/* -----------------------hotel listing----------------------------- */}
  <div className="mt-8">
    {loading && <p className="text-gray-300 text-center py-4 animate-pulse">Loading hotels...</p>}
    {error && <p className="text-red-400 text-center py-4 bg-red-900/20 rounded-lg">{error}</p>}
    {hotels.length > 0 ? (
      <ul className="space-y-6">
        {hotels.map((hotel) => (
          <li
            key={hotel._id}
            className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl hover:bg-gray-750 transition-all duration-300 cursor-pointer"
            role="region"
            aria-live="polite"
            onClick={() => {
              toggleHotelDetails(hotel._id);
              if (!expandedHotels[hotel._id]) {
                fetchRooms(hotel._id);
              }
            }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleHotelDetails(hotel._id);
                if (!expandedHotels[hotel._id]) {
                  fetchRooms(hotel._id);
                }
              }
            }}
            aria-expanded={!!expandedHotels[hotel._id]}
            aria-controls={`hotel-details-${hotel._id}`}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-semibold text-indigo-200">{hotel.name}</h4>
              <span className="text-gray-300 text-sm px-3 py-1 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200">
                {expandedHotels[hotel._id] ? "Collapse" : "Expand"}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-200">
              <p>
                <strong className="text-gray-300">Address:</strong> {hotel.address || "N/A"}
              </p>
              <p>
                <strong className="text-gray-300">Rating:</strong>{" "}
                <span className="text-yellow-400">{hotel.rating || "N/A"}/5</span>
              </p>
            </div>
            {expandedHotels[hotel._id] && (
              <div
                id={`hotel-details-${hotel._id}`}
                className="mt-5 overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: expandedHotels[hotel._id] ? "600px" : "0" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-200">
                  <p>
                    <strong className="text-gray-300">Amenities:</strong>{" "}
                    <span className="text-gray-100">{hotel.amenities?.join(", ") || "N/A"}</span>
                  </p>
                  <p>
                    <strong className="text-gray-300">Price Range:</strong>{" "}
                    <span className="text-green-400">
                      ₹{hotel.priceRange?.min || "N/A"} - ₹{hotel.priceRange?.max || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong className="text-gray-300">Contact:</strong>{" "}
                    {(hotel.contact?.phone || hotel.contact?.email) ? (
                      <span className="text-blue-300">
                        {[hotel.contact?.phone, hotel.contact?.email].filter(Boolean).join(" | ")}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </p>
                  <p>
                    <strong className="text-gray-300">Total Rooms:</strong> {hotel.totalRooms ?? "N/A"}
                  </p>
                </div>

                {/*------------------------------ Rooms Listing--------------------------- */}
                <div className="mt-6 border-t border-gray-700 pt-4">
                  <h5 className="text-lg font-semibold text-indigo-300 mb-3">Rooms</h5>
                  {loading && <p className="text-gray-300 text-center py-2 animate-pulse">Loading rooms...</p>}
                  {rooms.length > 0 ? (
                    <ul className="space-y-3">
                      {rooms.map((room) => (
                        <li
                          key={room._id}
                          className="p-4 bg-gray-900 rounded-lg border border-gray-600 shadow-sm hover:shadow-md hover:bg-gray-850 transition-all duration-200 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedHotels((prev) => ({
                              ...prev,
                              [`room-${room._id}`]: !prev[`room-${room._id}`],
                            }));
                          }}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              e.stopPropagation();
                              setExpandedHotels((prev) => ({
                                ...prev,
                                [`room-${room._id}`]: !prev[`room-${room._id}`],
                              }));
                            }
                          }}
                          aria-expanded={!!expandedHotels[`room-${room._id}`]}
                          aria-controls={`room-details-${room._id}`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-gray-100 font-medium">
                              Room {room.roomNumber} ({room.type || "Standard"})
                            </span>
                            <span className="text-gray-300 text-sm px-2 py-1 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200">
                              {expandedHotels[`room-${room._id}`] ? "Collapse" : "Expand"}
                            </span>
                          </div>
                          {expandedHotels[`room-${room._id}`] && (
                            <div
                              id={`room-details-${room._id}`}
                              className="mt-3 overflow-hidden transition-all duration-300 ease-in-out"
                              style={{ maxHeight: expandedHotels[`room-${room._id}`] ? "350px" : "0" }}
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-200">
                                <p>
                                  <strong className="text-gray-300">Price:</strong>{" "}
                                  <span className="text-green-400">₹{room.price || "N/A"}</span>
                                </p>
                                <p>
                                  <strong className="text-gray-300">Capacity:</strong> {room.capacity || "N/A"} guests
                                </p>
                                <p>
                                  <strong className="text-gray-300">Amenities:</strong>{" "}
                                  <span className="text-gray-100">{room.amenities?.join(", ") || "N/A"}</span>
                                </p>
                                <p>
                                  <strong className="text-gray-300">Description:</strong>{" "}
                                  <span className="text-gray-100">{room.description || "N/A"}</span>
                                </p>
                                <p>
                                  <strong className="text-gray-300">Available:</strong>{" "}
                                  <span className={room.isAvailable ? "text-green-400" : "text-red-400"}>
                                    {room.isAvailable ? "Yes" : "No"}
                                  </span>
                                </p>
                              </div>
                              {room.images && room.images.length > 0 && (
                                <div className="mt-4">
                                  <strong className="text-gray-300 block mb-2">Images:</strong>
                                  <div className="grid grid-cols-3 gap-3">
                                    {room.images.map((url, index) => (
                                      <img
                                        key={index}
                                        src={url}
                                        alt={`Room ${room.roomNumber} image ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-200"
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-300 text-center py-3 bg-gray-900 rounded-lg">
                      No active rooms found for this hotel.
                    </p>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    ) : selectedCity ? (
      <p className="text-gray-300 text-center py-4 bg-gray-900 rounded-lg">
        No active hotels found for this city.
      </p>
    ) : (
      <p className="text-gray-300 text-center py-4 bg-gray-900 rounded-lg">
        Please select a state and city to view hotels.
      </p>
    )}
  </div>
</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationManager;