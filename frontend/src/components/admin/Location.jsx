import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [inactiveLocations, setInactiveLocations] = useState([]);
  const [form, setForm] = useState({ state: "", city: "" });
  const [editId, setEditId] = useState(null);
  const [tab, setTab] = useState("active");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const baseURL = "http://localhost:6969/locations";

  const fetchLocations = async () => {
    setLoading(true);
    setError("");
    setDebugInfo("");
    try {
      console.log("fetchLocations - Fetching locations from", `${baseURL}/all`);
      const response = await axios.get(`${baseURL}/all`);
      console.log("fetchLocations - Status:", response.status, "Headers:", response.headers);
      console.log("fetchLocations - Raw response:", response.data);
      setDebugInfo(`Status: ${response.status}\nResponse: ${JSON.stringify(response.data, null, 2)}`);
      const active = response.data.filter((l) => l.isActive);
      const inactive = response.data.filter((l) => !l.isActive);
      setLocations(active);
      setInactiveLocations(inactive);
      console.log("fetchLocations - Active:", active, "Inactive:", inactive);
      if (response.data.length === 0) {
        setError("No locations found in the database. Try adding a new location.");
      }
    } catch (err) {
      console.error("fetchLocations - Error:", err);
      setError(
        err.response
          ? `Failed to fetch locations: ${err.response.status} ${err.response.data?.message || err.message}`
          : "Failed to connect to the server. Check if the backend is running on port 6969."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (editId) {
        console.log("handleSubmit - Updating location:", editId, form);
        await axios.put(`${baseURL}/${editId}`, form);
      } else {
        console.log("handleSubmit - Adding location:", form);
        await axios.post(`${baseURL}/add`, form);
      }
      setForm({ state: "", city: "" });
      setEditId(null);
      await fetchLocations();
    } catch (err) {
      console.error("handleSubmit - Error:", err);
      setError(err.response?.data?.message || "Failed to save location.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (loc) => {
    setForm({ state: loc.state, city: loc.city });
    setEditId(loc._id);
    setTab("active");
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      console.log("handleDelete - Deleting location:", id);
      await axios.delete(`${baseURL}/${id}`);
      await fetchLocations();
    } catch (err) {
      console.error("handleDelete - Error:", err);
      setError(err.response?.data?.message || "Failed to delete location.");
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (id) => {
    setLoading(true);
    setError("");
    try {
      console.log("handleActivate - Activating location:", id);
      await axios.patch(`${baseURL}/${id}/activate`, { isActive: true });
      await fetchLocations();
      setTab("active");
    } catch (err) {
      console.error("handleActivate - Error:", err);
      setError(err.response?.data?.message || "Failed to activate location.");
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      console.log("handleSoftDelete - Soft-deleting location:", id);
      await axios.patch(`${baseURL}/${id}/softdelete`, { isActive: false });
      await fetchLocations();
      setTab("inactive");
    } catch (err) {
      console.error("handleSoftDelete - Error:", err);
      setError(err.response?.data?.message || "Failed to soft-delete location.");
      setTab("active");
    } finally {
      setLoading(false);
    }
  };

  // search
  const filteredActiveLocations = locations.filter(
    (loc) =>
      loc.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredInactiveLocations = inactiveLocations.filter(
    (loc) =>
      loc.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort  
  const sortLocations = (locs) => {
    return [...locs].sort((a, b) => {
      const timeA = new Date(parseInt(a._id.toString().substring(0, 8), 16) * 1000);
      const timeB = new Date(parseInt(b._id.toString().substring(0, 8), 16) * 1000);
      return sortOption === "latest" ? timeB - timeA : timeA - timeB;
    });
  };

  const sortedActiveLocations = sortLocations(filteredActiveLocations);
  const sortedInactiveLocations = sortLocations(filteredInactiveLocations);

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      // Optionally: Call a backend logout endpoint to invalidate the token
      // await axios.post("http://localhost:6969/user/logout", {}, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      // });

      // Clear the token from localStorage
      localStorage.removeItem("token");
      console.log("handleLogout - Token cleared from localStorage");

      // Redirect to login page
      navigate("/");
    } catch (err) {
      console.error("handleLogout - Error:", err);
      setError(err.response?.data?.message || "Failed to log out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-2xl mx-auto p-6 pt-10">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location  
            </h2>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-red-800 transition duration-150 flex items-center"
              disabled={loading}
              aria-label="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-2 mb-6"
            aria-label="Location form"
          >
            <div className="relative w-full sm:w-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
                className="bg-gray-700 border border-gray-600 pl-10 pr-3 py-2 rounded w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="State"
              />
            </div>
            <div className="relative w-full sm:w-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
                className="bg-gray-700 border border-gray-600 pl-10 pr-3 py-2 rounded w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="City"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-800 transition duration-150 w-full sm:w-auto mt-2 sm:mt-0"
              disabled={loading}
              aria-label={editId ? "Update location" : "Add location"}
            >
              {loading ? "Saving..." : editId ? "Update" : "Add"}
            </button>
          </form>

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full sm:w-3/4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder="Search by state or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 border border-gray-600 pl-10 pr-3 py-2 rounded w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Search locations"
              />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-gray-700 border border-gray-600 px-3 py-2 rounded w-full sm:w-1/4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Sort locations"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <div className="flex gap-4 justify-center mb-4" role="tablist">
            <button
              onClick={() => setTab("active")}
              className={`px-4 py-2 rounded transition duration-150 ${tab === "active" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              role="tab"
              aria-selected={tab === "active"}
              aria-controls="active-locations"
            >
              Active
            </button>
            <button
              onClick={() => setTab("inactive")}
              className={`px-4 py-2 rounded transition duration-150 ${tab === "inactive" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              role="tab"
              aria-selected={tab === "inactive"}
              aria-controls="inactive-locations"
            >
              Inactive
            </button>
          </div>

          {loading ? (
            <div className="text-center text-gray-400 py-8">
              <svg className="animate-spin h-8 w-8 mx-auto mb-2 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading locations...
            </div>
          ) : (
            <ul
              className="space-y-3"
              id={tab === "active" ? "active-locations" : "inactive-locations"}
              role="tabpanel"
            >
              {(tab === "active" ? sortedActiveLocations : sortedInactiveLocations).map((loc) => (
                <li
                  key={loc._id}
                  className="flex justify-between items-center p-4 border border-gray-700 rounded-lg bg-gray-750 shadow-md hover:border-gray-600 transition duration-150"
                >
                  <div>
                    <p className="font-semibold text-indigo-300">{loc.state}</p>
                    <p className="text-sm text-gray-400">{loc.city}</p>
                  </div>
                  {tab === "active" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(loc)}
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 disabled:bg-yellow-800 transition duration-150"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(loc._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:bg-red-800 transition duration-150"
                        disabled={loading}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleSoftDelete(loc._id)}
                        className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 disabled:bg-gray-500 transition duration-150"
                        disabled={loading}
                      >
                        Inactive
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleActivate(loc._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:bg-green-800 transition duration-150"
                      disabled={loading}
                    >
                      Activate
                    </button>
                  )}
                </li>
              ))}
              {(tab === "active" ? sortedActiveLocations : sortedInactiveLocations).length === 0 && (
                <li className="text-center text-gray-400 py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No {tab} locations found.
                </li>
              )}
            </ul>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationManager;