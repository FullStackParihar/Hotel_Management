import React, { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import { FaBan, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../Utils/api";

const StateManagement = ({ states, inactiveStates, fetchStates, loading, setLoading, setError, baseURL }) => {
    const [stateForm, setStateForm] = useState({ name: "", code: "" });
    const [editStateId, setEditStateId] = useState(null);
    const [stateTab, setStateTab] = useState("active");

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
                await api.put(`/api/states/${editStateId}`, payload);
            } else {
                await api.post(`/api/states/add`, payload);
            }
            setStateForm({ name: "", code: "" });
            setEditStateId(null);
            alert("State saved successfully");
            console.log("State saved successfully");

            await fetchStates();
        } catch (err) {
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
            await api.delete(`/api/states/${id}`);
            await fetchStates();
            console.log("State deleted successfully");
            alert("State deleted successfully");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete state.");
        } finally {
            setLoading(false);
        }
    };

    const handleStateSoftDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            await api.patch(`/api/states/${id}/softdelete`);
            await fetchStates();
            setStateTab("inactive");
            console.log("State deactivated successfully");
            alert("State deactivated successfully");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to soft-delete state.");
        } finally {
            setLoading(false);
        }
    };

    const handleStateActivate = async (id) => {
        setLoading(true);
        setError("");
        try {
            await api.patch(`/api/states/${id}/activate`);
            await fetchStates();
            setStateTab("active");
            console.log("State activated successfully");
            alert("State activated successfully");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to activate state.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">Manage States</h2>
            <form onSubmit={handleStateSubmit} className="space-y-4 mb-6">
                <FormInput
                    label="State Name"
                    id="state-name"
                    value={stateForm.name}
                    onChange={(e) => setStateForm({ ...stateForm, name: e.target.value })}
                    required
                />
                <FormInput
                    label="State Code"
                    id="state-code"
                    value={stateForm.code}
                    onChange={(e) => setStateForm({ ...stateForm, code: e.target.value })}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={loading}
                >
                    {loading ? "Saving..." : editStateId ? "Update" : "Add"}
                </button>
            </form>
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setStateTab("active")}
                    className={`flex-1 py-2 rounded-md ${stateTab === "active" ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300"}`}
                >
                    Active
                </button>
                <button
                    onClick={() => setStateTab("inactive")}
                    className={`flex-1 py-2 rounded-md ${stateTab === "inactive" ? "bg-red-600 text-white" : "bg-slate-700 text-gray-300"}`}
                >
                    Inactive
                </button>
            </div>
            <ul className="space-y-2">
                {(stateTab === "active" ? states : inactiveStates).map((state) => (
                    <li
                        key={state._id}
                        className="flex justify-between items-center p-3 bg-slate-800 rounded-md border border-slate-700"
                    >
                        <span className="text-gray-200">{state.name} ({state.code})</span>
                        <div className="flex gap-2">
                            {stateTab === "active" ? (
                                <>
                                    <button onClick={() => handleStateEdit(state)} className="text-yellow-400 hover:text-yellow-500">
                                        <FaEdit size={28} />
                                    </button>
                                    <button onClick={() => handleStateDelete(state._id)} className="text-red-400 hover:text-red-500">
                                        <FaTrash size={28} />
                                    </button>
                                    <button onClick={() => handleStateSoftDelete(state._id)} className="text-gray-400 hover:text-gray-500">
                                        <FaBan size={28} />
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => handleStateActivate(state._id)} className="text-green-400 hover:text-green-500">
                                    <FaCheckCircle size={28} />
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
    );
};

export default StateManagement;