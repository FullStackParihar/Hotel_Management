import React, { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import { FaBan, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../Utils/api";

const HotelManagement = ({
    hotels,
    inactiveHotels,
    states,
    cities,
    fetchHotels,
    fetchCities,
    selectedState,
    selectedCity,
    loading,
    setLoading,
    setError,
    baseURL,
}) => {
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
    const [editHotelId, setEditHotelId] = useState(null);
    const [hotelTab, setHotelTab] = useState("active");

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
                await api.put(`/api/hotels/${editHotelId}`, payload);
            } else {
                await api.post(`/api/hotels/add`, payload);
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
            console.log("Hotel saved successfully");
            alert("Hotel saved successfully");
        } catch (err) {
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
            await api.delete(`/api/hotels/${id}`);
            await fetchHotels(hotelForm.cityId || selectedCity);
            setHotelTab("active");
            console.log("Hotel deleted successfully");
            alert("Hotel deleted successfully");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete hotel.");
        } finally {
            setLoading(false);
        }
    };

    const handleHotelSoftDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            await api.patch(`/api/hotels/${id}/softdelete`);
            await fetchHotels(hotelForm.cityId || selectedCity);
            setHotelTab("inactive");
            console.log("Hotel deactivated successfully");
            alert("Hotel deactivated successfully");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to soft-delete hotel.");
        } finally {
            setLoading(false);
        }
    };

    const handleHotelActivate = async (id) => {
        setLoading(true);
        setError("");
        try {
            await api.patch(`/api/hotels/${id}/activate`);
            await fetchHotels(hotelForm.cityId || selectedCity);
            setHotelTab("active");
            console.log("Hotel activated successfully");
            alert("Hotel activated successfully");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to activate hotel.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">Manage Hotels</h2>
            <form onSubmit={handleHotelSubmit} className="space-y-4 mb-6">
                <div>
                    <label htmlFor="hotel-state" className="block text-sm font-medium text-gray-300">
                        State
                    </label>
                    <select
                        id="hotel-state"
                        value={hotelForm.stateId}
                        onChange={(e) => {
                            const stateId = e.target.value;
                            setHotelForm({ ...hotelForm, stateId, cityId: "" });
                            fetchCities(stateId);
                        }}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <label htmlFor="hotel-city" className="block text-sm font-medium text-gray-300">
                        City
                    </label>
                    <select
                        id="hotel-city"
                        value={hotelForm.cityId}
                        onChange={(e) => {
                            const cityId = e.target.value;
                            setHotelForm({ ...hotelForm, cityId });
                            if (cityId) {
                                fetchHotels(cityId);
                            } else {
                                setHotels([]);
                                setInactiveHotels([]);
                            }
                        }}
                        disabled={!hotelForm.stateId}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-600"
                    >
                        <option value="">-- Select City --</option>
                        {cities.map((city) => (
                            <option key={city._id} value={city._id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <FormInput
                    label="Hotel Name"
                    id="hotel-name"
                    value={hotelForm.name}
                    onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                    required
                />
                <FormInput
                    label="Address"
                    id="hotel-address"
                    value={hotelForm.address}
                    onChange={(e) => setHotelForm({ ...hotelForm, address: e.target.value })}
                />
                <FormInput
                    label="Rating (1-5)"
                    id="hotel-rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={hotelForm.rating}
                    onChange={(e) => setHotelForm({ ...hotelForm, rating: e.target.value })}
                />
                <FormInput
                    label="Amenities (comma-separated)"
                    id="hotel-amenities"
                    value={hotelForm.amenities}
                    onChange={(e) => setHotelForm({ ...hotelForm, amenities: e.target.value })}
                />
                <div className="flex gap-4">
                    <FormInput
                        label="Price Min"
                        id="hotel-price-min"
                        type="number"
                        min="0"
                        value={hotelForm.priceMin}
                        onChange={(e) => setHotelForm({ ...hotelForm, priceMin: e.target.value })}
                        className="flex-1"
                    />
                    <FormInput
                        label="Price Max"
                        id="hotel-price-max"
                        type="number"
                        min="0"
                        value={hotelForm.priceMax}
                        onChange={(e) => setHotelForm({ ...hotelForm, priceMax: e.target.value })}
                        className="flex-1"
                    />
                </div>
                <FormInput
                    label="Contact Phone"
                    id="hotel-contact-phone"
                    value={hotelForm.contactPhone}
                    onChange={(e) => setHotelForm({ ...hotelForm, contactPhone: e.target.value })}
                />
                <FormInput
                    label="Contact Email"
                    id="hotel-contact-email"
                    type="email"
                    value={hotelForm.contactEmail}
                    onChange={(e) => setHotelForm({ ...hotelForm, contactEmail: e.target.value })}
                />
                <FormInput
                    label="Total Rooms"
                    id="hotel-total-rooms"
                    type="number"
                    min="0"
                    value={hotelForm.totalRooms}
                    onChange={(e) => setHotelForm({ ...hotelForm, totalRooms: e.target.value })}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={loading || !hotelForm.cityId}
                >
                    {loading ? "Saving..." : editHotelId ? "Update" : "Add"}
                </button>
            </form>
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setHotelTab("active")}
                    className={`flex-1 py-2 rounded-md ${hotelTab === "active" ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300"}`}
                >
                    Active
                </button>
                <button
                    onClick={() => setHotelTab("inactive")}
                    className={`flex-1 py-2 rounded-md ${hotelTab === "inactive" ? "bg-red-600 text-white" : "bg-slate-700 text-gray-300"}`}
                >
                    Inactive
                </button>
            </div>
            <ul className="space-y-2">
                {(hotelTab === "active" ? hotels : inactiveHotels).map((hotel) => (
                    <li
                        key={hotel._id}
                        className="flex justify-between items-center p-3 bg-slate-800 rounded-md border border-slate-700"
                    >
                        <span className="text-gray-200">{hotel.name}</span>
                        <div className="flex gap-2">
                            {hotelTab === "active" ? (
                                <>
                                    <button onClick={() => handleHotelEdit(hotel)} className="text-yellow-400 hover:text-yellow-500">
                                      <FaEdit size={28} />
                                    </button>
                                    <button onClick={() => handleHotelDelete(hotel._id)} className="text-red-400 hover:text-red-500">
                                        <FaTrash size={28} />
                                    </button>
                                    <button onClick={() => handleHotelSoftDelete(hotel._id)} className="text-gray-400 hover:text-gray-500">
                                          <FaBan size={28} />
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => handleHotelActivate(hotel._id)} className="text-green-400 hover:text-green-500">
                                    <FaCheckCircle size={28} />
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
    );
};

export default HotelManagement;