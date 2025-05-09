import React, { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import { FaBan, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";

const CityManagement = ({ cities, inactiveCities, states, fetchCities, selectedState, loading, setLoading, setError, baseURL }) => {
    const [cityForm, setCityForm] = useState({ name: "", stateId: "" });
    const [editCityId, setEditCityId] = useState(null);
    const [cityTab, setCityTab] = useState("active");

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
            console.log("City saved successfully");
            alert("City saved successfully");
        } catch (err) {
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
             
            console.log("City deleted successfully");  
            alert("City deleted successfully"); 
        } catch (err) {
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
            } else {
                setCities([]);
                setInactiveCities([]);
                setError("No state selected. Please select a state to view cities.");
            }
            setCityTab("inactive");
            console.log("City deactivated successfully");
            alert("City deactivated successfully");
        } catch (err) {
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
            console.log("City activated successfully");
            alert("City activated successfully");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to activate city.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">Manage Cities</h2>
            <form onSubmit={handleCitySubmit} className="space-y-4 mb-6">
                <FormInput
                    label="City Name"
                    id="city-name"
                    value={cityForm.name}
                    onChange={(e) => setCityForm({ ...cityForm, name: e.target.value })}
                    required
                />
                <div>
                    <label htmlFor="city-state" className="block text-sm font-medium text-gray-300">
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
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={loading}
                >
                    {loading ? "Saving..." : editCityId ? "Update" : "Add"}
                </button>
            </form>
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setCityTab("active")}
                    className={`flex-1 py-2 rounded-md ${cityTab === "active" ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300"}`}
                >
                    Active
                </button>
                <button
                    onClick={() => setCityTab("inactive")}
                    className={`flex-1 py-2 rounded-md ${cityTab === "inactive" ? "bg-red-600 text-white" : "bg-slate-700 text-gray-300"}`}
                >
                    Inactive
                </button>
            </div>
            <ul className="space-y-2">
                {(cityTab === "active" ? cities : inactiveCities).map((city) => (
                    <li
                        key={city._id}
                        className="flex justify-between items-center p-3 bg-slate-800 rounded-md border border-slate-700"
                    >
                        <span className="text-gray-200">{city.name}</span>
                        <div className="flex gap-2">
                            {cityTab === "active" ? (
                                <>
                                    <button onClick={() => handleCityEdit(city)} className="text-yellow-400 hover:text-yellow-500">
                                         <FaEdit size={28} />
                                    </button>
                                    <button onClick={() => handleCityDelete(city._id)} className="text-red-400 hover:text-red-500">
                                        <FaTrash size={28} />
                                    </button>
                                    <button onClick={() => handleCitySoftDelete(city._id)} className="text-gray-400 hover:text-gray-500">
                                      <FaBan size={28} />
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => handleCityActivate(city._id)} className="text-green-400 hover:text-green-500">
                                    <FaCheckCircle size={28} />
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
    );
};

export default CityManagement;