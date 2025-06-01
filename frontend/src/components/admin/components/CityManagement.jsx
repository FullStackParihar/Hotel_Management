 
import React, { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import { FaBan, FaCheckCircle, FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import api from "../../../Utils/api";

const CityManagement = ({
  cities = [],
  inactiveCities = [],
  states = [],
  fetchCities,
  selectedState,
  loading,
  setLoading,
  setError,
  baseURL,
}) => {
  const [cityForm, setCityForm] = useState({ name: "", stateId: selectedState || "" });
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
      setError("City name and state are required.");
      setLoading(false);
      return;
    }
    try {
      if (editCityId) {
        await api.put(`/api/cities/${editCityId}`, payload);
      } else {
        await api.post(`/api/cities/add`, payload);
      }
      setCityForm({ name: "", stateId: selectedState || "" });
      setEditCityId(null);
      setCityTab("active");
      await fetchCities(cityForm.stateId, selectedState);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to save city.";
      setError(errorMessage);
      console.error("handleCitySubmit - Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCityEdit = (city) => {
    setCityForm({
      name: city.name || "",
      stateId: Array.isArray(city.state) && city.state.length > 0 ? city.state[0]._id : "",
    });
    setEditCityId(city._id);
    setCityTab("active");
  };

  const handleCityDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      await api.delete(`/api/cities/${id}`);
      await fetchCities(selectedState, selectedState);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to delete city.";
      setError(errorMessage);
      console.error("handleCityDelete - Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySoftDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      const city = cities.find((c) => c._id === id) || inactiveCities.find((c) => c._id === id);
      const stateId =
        (Array.isArray(city.state) && city.state.length > 0 ? city.state[0]._id : null) ||
        selectedState;
      if (!stateId) {
        throw new Error("No state selected or available for this city.");
      }
      await api.patch(`/api/cities/${id}/softdelete`);
      await fetchCities(stateId, selectedState);
      setCityTab("inactive");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to deactivate city.";
      setError(errorMessage);
      console.error("handleCitySoftDelete - Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCityActivate = async (id) => {
    setLoading(true);
    setError("");
    try {
      const city = inactiveCities.find((c) => c._id === id);
      const stateId =
        (Array.isArray(city.state) && city.state.length > 0 ? city.state[0]._id : null) ||
        selectedState;
      if (!stateId) {
        throw new Error("No state selected or available for this city.");
      }
      await api.patch(`/api/cities/${id}/activate`);
      await fetchCities(stateId, selectedState);
      setCityTab("active");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to activate city.";
      setError(errorMessage);
      console.error("handleCityActivate - Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-slate-900 rounded-lg">
      <h2 className="text-xl font-semibold text-blue-300 mb-4">Manage Cities</h2>
      {loading && (
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <form onSubmit={handleCitySubmit} className="space-y-4 mb-6">
        <FormInput
          label="City Name"
          id="city-name"
          value={cityForm.name}
          onChange={(e) => setCityForm({ ...cityForm, name: e.target.value })}
          required
          disabled={loading}
          aria-label="Enter city name"
        />
        <div>
          <label htmlFor="city-state" className="block text-sm font-medium text-gray-300 mb-1">
            State
          </label>
          <select
            id="city-state"
            value={cityForm.stateId}
            onChange={(e) => {
              const stateId = e.target.value;
              setCityForm({ ...cityForm, stateId });
              if (stateId) fetchCities(stateId, stateId);
            }}
            required
            disabled={loading || states.length === 0}
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-600 disabled:text-gray-400"
            aria-label="Select state for city"
          >
            <option value="">-- Select State --</option>
            {Array.isArray(states) ? (
              states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))
            ) : (
              <option disabled>No states available</option>
            )}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-all duration-200"
          disabled={loading}
          aria-label={editCityId ? "Update city" : "Add city"}
        >
          {loading ? "Processing..." : editCityId ? "Update City" : "Add City"}
        </button>
      </form>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setCityTab("active")}
          className={`flex-1 py-2 rounded-md transition-all duration-200 ${
            cityTab === "active" ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300 hover:bg-slate-600"
          }`}
          aria-label="View active cities"
        >
          Active Cities
        </button>
        <button
          onClick={() => setCityTab("inactive")}
          className={`flex-1 py-2 rounded-md transition-all duration-200 ${
            cityTab === "inactive" ? "bg-red-600 text-white" : "bg-slate-700 text-gray-300 hover:bg-slate-600"
          }`}
          aria-label="View inactive cities"
        >
          Inactive Cities
        </button>
      </div>
      <ul className="space-y-2">
        {Array.isArray(cityTab === "active" ? cities : inactiveCities) ? (
          (cityTab === "active" ? cities : inactiveCities).map((city) => (
            <li
              key={city._id}
              className="flex justify-between items-center p-3 bg-slate-800 rounded-md border border-slate-700"
            >
              <span className="text-gray-200 flex items-center">
                {city.name} (
                {Array.isArray(city.state) && city.state.length > 0 ? (
                  city.state[0].name
                ) : (
                  <span className="text-red-400 flex items-center">
                    State Missing
                    <span className="ml-1 group relative">
                      <FaInfoCircle size={14} />
                      <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded p-2 -top-10 left-1/2 transform -translate-x-1/2 w-48">
                        The state for this city is not found in the database. Please update the city with a valid state.
                      </span>
                    </span>
                  </span>
                )}
                )
              </span>
              <div className="flex gap-2">
                {cityTab === "active" ? (
                  <>
                    <button
                      onClick={() => handleCityEdit(city)}
                      className="text-yellow-400 hover:text-yellow-500 p-1"
                      aria-label={`Edit city ${city.name}`}
                      disabled={loading}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleCityDelete(city._id)}
                      className="text-red-400 hover:text-red-500 p-1"
                      aria-label={`Delete city ${city.name}`}
                      disabled={loading}
                    >
                      <FaTrash size={20} />
                    </button>
                    <button
                      onClick={() => handleCitySoftDelete(city._id)}
                      className="text-gray-400 hover:text-gray-500 p-1"
                      aria-label={`Deactivate city ${city.name}`}
                      disabled={loading}
                    >
                      <FaBan size={20} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleCityActivate(city._id)}
                    className="text-green-400 hover:text-green-500 p-1"
                    aria-label={`Activate city ${city.name}`}
                    disabled={loading}
                  >
                    <FaCheckCircle size={20} />
                  </button>
                )}
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-400 py-4">
            Error: City data is not available.
          </li>
        )}
        {(cityTab === "active" ? cities : inactiveCities).length === 0 && (
          <li className="text-center text-gray-400 py-4">
            No {cityTab} cities found. {cityTab === "active" ? "Add a city to get started." : "No inactive cities available."}
          </li>
        )}
      </ul>
    </div>
  );
};

export default CityManagement;