// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const LocationManager = () => {
//   const [locations, setLocations] = useState([]);
//   const [inactiveLocations, setInactiveLocations] = useState([]);
//   const [form, setForm] = useState({ state: "", city: "" });
//   const [editId, setEditId] = useState(null);
//   const [tab, setTab] = useState("active");

//   const baseURL = "http://localhost:6969/locations";

//   const fetchLocations = async () => {
//     const all = await axios.get(`${baseURL}/`);
//     const active = all.data.filter((l) => l.isActive);
//     const inactive = all.data.filter((l) => !l.isActive);
//     setLocations(active);
//     setInactiveLocations(inactive);
//   };

//   useEffect(() => {
//     fetchLocations();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editId) {
//       await axios.put(`${baseURL}/${editId}`, form);
//     } else {
//       await axios.post(`${baseURL}/add`, form);
//     }
//     setForm({ state: "", city: "" });
//     setEditId(null);
//     fetchLocations();
//   };

//   const handleEdit = (loc) => {
//     setForm({ state: loc.state, city: loc.city });
//     setEditId(loc._id);
//     setTab("active");
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`${baseURL}/${id}`);
//     fetchLocations();
//   };

//   const handleSoftDelete = async (id) => {
//     await axios.patch(`${baseURL}/${id}/softdelete`);
//     fetchLocations();
//     setTab("inactive");
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4 text-center">Location Manager</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col sm:flex-row items-center gap-2 mb-6"
//       >
//         <input
//           type="text"
//           placeholder="State"
//           value={form.state}
//           onChange={(e) => setForm({ ...form, state: e.target.value })}
//           required
//           className="border border-gray-300 px-3 py-2 rounded w-full sm:w-1/2"
//         />
//         <input
//           type="text"
//           placeholder="City"
//           value={form.city}
//           onChange={(e) => setForm({ ...form, city: e.target.value })}
//           required
//           className="border border-gray-300 px-3 py-2 rounded w-full sm:w-1/2"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {editId ? "Update" : "Add"}
//         </button>
//       </form>

//       <div className="flex gap-4 justify-center mb-4">
//         <button
//           onClick={() => setTab("active")}
//           className={`px-4 py-2 rounded ${
//             tab === "active"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Active
//         </button>
//         <button
//           onClick={() => setTab("inactive")}
//           className={`px-4 py-2 rounded ${
//             tab === "inactive"
//               ? "bg-red-600 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Inactive
//         </button>
//       </div>

//       <ul className="space-y-2">
//         {(tab === "active" ? locations : inactiveLocations).map((loc) => (
//           <li
//             key={loc._id}
//             className="flex justify-between items-center p-3 border rounded shadow-sm"
//           >
//             <div>
//               <p className="font-semibold">{loc.state}</p>
//               <p className="text-sm text-gray-600">{loc.city}</p>
//             </div>
//             {tab === "active" && (
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleEdit(loc)}
//                   className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(loc._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => handleSoftDelete(loc._id)}
//                   className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
//                 >
//                   Soft Delete
//                 </button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // export default LocationManager;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const LocationManager = () => {
//   const [locations, setLocations] = useState([]);
//   const [inactiveLocations, setInactiveLocations] = useState([]);
//   const [form, setForm] = useState({ state: "", city: "" });
//   const [editId, setEditId] = useState(null);
//   const [tab, setTab] = useState("active");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Use port 5000 to align with userController.js and other components
//   const baseURL = "http://localhost:6969/locations";

//   const fetchLocations = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       console.log('fetchLocations - Fetching locations');
//       const response = await axios.get(`${baseURL}/`);
//       const active = response.data.filter((l) => l.isActive);
//       const inactive = response.data.filter((l) => !l.isActive);
//       setLocations(active);
//       setInactiveLocations(inactive);
//       console.log('fetchLocations - Active:', active, 'Inactive:', inactive);
//     } catch (err) {
//       console.error('fetchLocations - Error:', err);
//       setError("Failed to fetch locations. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLocations();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       if (editId) {
//         console.log('handleSubmit - Updating location:', editId, form);
//         await axios.put(`${baseURL}/${editId}`, form);
//       } else {
//         console.log('handleSubmit - Adding location:', form);
//         await axios.post(`${baseURL}/add`, form);
//       }
//       setForm({ state: "", city: "" });
//       setEditId(null);
//       await fetchLocations();
//     } catch (err) {
//       console.error('handleSubmit - Error:', err);
//       setError(err.response?.data?.message || "Failed to save location.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (loc) => {
//     setForm({ state: loc.state, city: loc.city });
//     setEditId(loc._id);
//     setTab("active");
//   };

//   const handleDelete = async (id) => {
//     setLoading(true);
//     setError("");
//     try {
//       console.log('handleDelete - Deleting location:', id);
//       await axios.delete(`${baseURL}/${id}`);
//       await fetchLocations();
//     } catch (err) {
//       console.error('handleDelete - Error:', err);
//       setError("Failed to delete location.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSoftDelete = async (id) => {
//     setLoading(true);
//     setError("");
//     try {
//       console.log('handleSoftDelete - Soft-deleting location:', id);
//       await axios.patch(`${baseURL}/${id}/softdelete`);
//       await fetchLocations();
//       setTab("inactive"); // Ensure tab switches after fetch
//     } catch (err) {
//       console.error('handleSoftDelete - Error:', err);
//       setError("Failed to soft-delete location.");
//       setTab("active"); // Revert to active if failed
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4 text-center">Location Manager</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col sm:flex-row items-center gap-2 mb-6"
//         aria-label="Location form"
//       >
//         <input
//           type="text"
//           placeholder="State"
//           value={form.state}
//           onChange={(e) => setForm({ ...form, state: e.target.value })}
//           required
//           className="border border-gray-300 px-3 py-2 rounded w-full sm:w-1/2"
//           aria-label="State"
//         />
//         <input
//           type="text"
//           placeholder="City"
//           value={form.city}
//           onChange={(e) => setForm({ ...form, city: e.target.value })}
//           required
//           className="border border-gray-300 px-3 py-2 rounded w-full sm:w-1/2"
//           aria-label="City"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
//           disabled={loading}
//           aria-label={editId ? "Update location" : "Add location"}
//         >
//           {loading ? "Saving..." : editId ? "Update" : "Add"}
//         </button>
//       </form>

//       {error && (
//         <div className="mb-4 text-center text-red-600 font-semibold border border-red-300 rounded-md p-2 bg-red-50">
//           {error}
//         </div>
//       )}

//       <div className="flex gap-4 justify-center mb-4" role="tablist">
//         <button
//           onClick={() => setTab("active")}
//           className={`px-4 py-2 rounded ${
//             tab === "active"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//           role="tab"
//           aria-selected={tab === "active"}
//           aria-controls="active-locations"
//         >
//           Active
//         </button>
//         <button
//           onClick={() => setTab("inactive")}
//           className={`px-4 py-2 rounded ${
//             tab === "inactive"
//               ? "bg-red-600 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//           role="tab"
//           aria-selected={tab === "inactive"}
//           aria-controls="inactive-locations"
//         >
//           Inactive
//         </button>
//       </div>

//       {loading ? (
//         <div className="text-center text-gray-600">Loading locations...</div>
//       ) : (
//         <ul
//           className="space-y-2"
//           id={tab === "active" ? "active-locations" : "inactive-locations"}
//           role="tabpanel"
//         >
//           {(tab === "active" ? locations : inactiveLocations).map((loc) => (
//             <li
//               key={loc._id}
//               className="flex justify-between items-center p-3 border rounded shadow-sm"
//             >
//               <div>
//                 <p className="font-semibold">{loc.state}</p>
//                 <p className="text-sm text-gray-600">{loc.city}</p>
//               </div>
//               {tab === "active" && (
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleEdit(loc)}
//                     className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 disabled:bg-yellow-300"
//                     disabled={loading}
//                     aria-label={`Edit ${loc.state}, ${loc.city}`}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(loc._id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-red-300"
//                     disabled={loading}
//                     aria-label={`Delete ${loc.state}, ${loc.city}`}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => handleSoftDelete(loc._id)}
//                     className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 disabled:bg-gray-300"
//                     disabled={loading}
//                     aria-label={`Soft delete ${loc.state}, ${loc.city}`}
//                   >
//                     Soft Delete
//                   </button>
//                 </div>
//               )}
//             </li>
//           ))}
//           {(tab === "active" ? locations : inactiveLocations).length === 0 && (
//             <li className="text-center text-gray-600">
//               No {tab} locations found.
//             </li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LocationManager;
import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationManager = () => {
    const [locations, setLocations] = useState([]);
    const [inactiveLocations, setInactiveLocations] = useState([]);
    const [form, setForm] = useState({ state: "", city: "" });
    const [editId, setEditId] = useState(null);
    const [tab, setTab] = useState("active");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [debugInfo, setDebugInfo] = useState("");

    const baseURL = "http://localhost:6969/locations";

    const fetchLocations = async () => {
        setLoading(true);
        setError("");
        setDebugInfo("");
        try {
            console.log('fetchLocations - Fetching locations from', `${baseURL}/all`);
            const response = await axios.get(`${baseURL}/all`); // Use /all for all locations
            console.log('fetchLocations - Status:', response.status, 'Headers:', response.headers);
            console.log('fetchLocations - Raw response:', response.data);
            setDebugInfo(`Status: ${response.status}\nResponse: ${JSON.stringify(response.data, null, 2)}`);
            const active = response.data.filter((l) => l.isActive);
            const inactive = response.data.filter((l) => !l.isActive);
            setLocations(active);
            setInactiveLocations(inactive);
            console.log('fetchLocations - Active:', active, 'Inactive:', inactive);
            if (response.data.length === 0) {
                setError("No locations found in the database. Try adding a new location.");
            }
        } catch (err) {
            console.error('fetchLocations - Error:', err);
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
                console.log('handleSubmit - Updating location:', editId, form);
                await axios.put(`${baseURL}/${editId}`, form);
            } else {
                console.log('handleSubmit - Adding location:', form);
                await axios.post(`${baseURL}/add`, form);
            }
            setForm({ state: "", city: "" });
            setEditId(null);
            await fetchLocations();
        } catch (err) {
            console.error('handleSubmit - Error:', err);
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
            console.log('handleDelete - Deleting location:', id);
            await axios.delete(`${baseURL}/${id}`);
            await fetchLocations();
        } catch (err) {
            console.error('handleDelete - Error:', err);
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
            console.log('handleSoftDelete - Soft-deleting location:', id);
            await axios.patch(`${baseURL}/${id}/softdelete`, { isActive: false });
            await fetchLocations();
            setTab("inactive");
        } catch (err) {
            console.error('handleSoftDelete - Error:', err);
            setError(err.response?.data?.message || "Failed to soft-delete location.");
            setTab("active");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Location  </h2>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 mb-6" aria-label="Location form">
                <input type="text" placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required className="border border-gray-300 px-3 py-2 rounded w-full sm:w-1/2" aria-label="State" />
                <input type="text" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required className="border border-gray-300 px-3 py-2 rounded w-full sm:w-1/2" aria-label="City" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300" disabled={loading} aria-label={editId ? "Update location" : "Add location"}>{loading ? "Saving..." : editId ? "Update" : "Add"}</button>
            </form>
 <div className="flex gap-4 justify-center mb-4" role="tablist">
                <button onClick={() => setTab("active")} className={`px-4 py-2 rounded ${tab === "active" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`} role="tab" aria-selected={tab === "active"} aria-controls="active-locations">Active</button>
                <button onClick={() => setTab("inactive")} className={`px-4 py-2 rounded ${tab === "inactive" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`} role="tab" aria-selected={tab === "inactive"} aria-controls="inactive-locations">Inactive</button>
            </div>
            {loading ? <div className="text-center text-gray-600">Loading locations...</div> : <ul className="space-y-2" id={tab === "active" ? "active-locations" : "inactive-locations"} role="tabpanel">
  {(tab === "active" ? locations : inactiveLocations).map((loc) => (
    <li key={loc._id} className="flex justify-between items-center p-3 border rounded shadow-sm">
      <div>
        <p className="font-semibold">{loc.state}</p>
        <p className="text-sm text-gray-600">{loc.city}</p>
      </div>
      {tab === "active" ? (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(loc)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 disabled:bg-yellow-300" disabled={loading}>
            Edit
          </button>
          <button onClick={() => handleDelete(loc._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-red-300" disabled={loading}>
            Delete
          </button>
          <button onClick={() => handleSoftDelete(loc._id)} className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 disabled:bg-gray-300" disabled={loading}>
          Inactive
          </button>
        </div>
      ) : (
        <button onClick={() => handleActivate(loc._id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:bg-green-300" disabled={loading}>
          Activate
        </button>
      )}
    </li>
  ))}
  {(tab === "active" ? locations : inactiveLocations).length === 0 && (
    <li className="text-center text-gray-600">No {tab} locations found.</li>
  )}
</ul>
}
        </div>
    );
};

export default LocationManager;