// import React, { useState } from "react";
// import axios from "axios";
// import FormInput from "./FormInput";

// const CouponManagement = ({ coupons, inactiveCoupons, fetchCoupons, loading, setLoading, setError, baseURL }) => {
//     const [couponForm, setCouponForm] = useState({
//         code: "",
//         discount: "",
//         startDate: "",
//         endDate: "",
//     });
//     const [editCouponId, setEditCouponId] = useState(null);
//     const [couponTab, setCouponTab] = useState("active");

//     const handleCouponSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");

       
//         const payload = {
//             code: couponForm.code?.trim().toUpperCase(),
//             discount: parseFloat(couponForm.discount) || 0,
//             startDate: couponForm.startDate ? new Date(couponForm.startDate).toISOString() : undefined,
//             endDate: couponForm.endDate ? new Date(couponForm.endDate).toISOString() : undefined,
//         };

//         if (!payload.code || !payload.discount || !payload.startDate || !payload.endDate) {
//             setError("Code, discount, start date, and end date are required.");
//             setLoading(false);
//             return;
//         }

//         if (payload.discount < 0 || payload.discount > 100) {
//             setError("Discount must be between 0 and 100.");
//             setLoading(false);
//             return;
//         }

//         if (new Date(payload.endDate) <= new Date(payload.startDate)) {
//             setError("End date must be after start date.");
//             setLoading(false);
//             return;
//         }

//         try {
//             if (editCouponId) {
//                 await axios.put(`${baseURL}/api/coupons/${editCouponId}`, payload, {
//                     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//                 });
//             } else {
//                 await axios.post(`${baseURL}/api/coupons`, payload, {
//                     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//                 });
//             }
//             setCouponForm({
//                 code: "",
//                 discount: "",
//                 startDate: "",
//                 endDate: "",
//             });
//             setEditCouponId(null);
//             setCouponTab("active");
//             await fetchCoupons();
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to save coupon.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCouponEdit = (coupon) => {
//         setCouponForm({
//             code: coupon.code || "",
//             discount: coupon.discount?.toString() || "",
//             startDate: coupon.startDate ? new Date(coupon.startDate).toISOString().slice(0, 16) : "",
//             endDate: coupon.endDate ? new Date(coupon.endDate).toISOString().slice(0, 16) : "",
//         });
//         setEditCouponId(coupon._id);
//         setCouponTab("active");
//     };

//     const handleCouponDelete = async (id) => {
//         setLoading(true);
//         setError("");
//         try {
//             await axios.delete(`${baseURL}/api/coupons/${id}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//             await fetchCoupons();
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to delete coupon.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCouponSoftDelete = async (id) => {
//         setLoading(true);
//         setError("");
//         try {
//             await axios.patch(`${baseURL}/api/coupons/${id}/deactivate`, {}, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//             await fetchCoupons();
//             setCouponTab("inactive");
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to deactivate coupon.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCouponActivate = async (id) => {
//         setLoading(true);
//         setError("");
//         try {
//             await axios.patch(`${baseURL}/api/coupons/${id}/activate`, {}, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//             await fetchCoupons();
//             setCouponTab("active");
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to activate coupon.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h2 className="text-xl font-semibold text-blue-300 mb-4">Manage Coupons</h2>
//             <form onSubmit={handleCouponSubmit} className="space-y-4 mb-6">
//                 <FormInput
//                     label="Coupon Code"
//                     id="coupon-code"
//                     value={couponForm.code}
//                     onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
//                     required
//                 />
//                 <FormInput
//                     label="Discount (%)"
//                     id="coupon-discount"
//                     type="number"
//                     min="0"
//                     max="100"
//                     step="0.01"
//                     value={couponForm.discount}
//                     onChange={(e) => setCouponForm({ ...couponForm, discount: e.target.value })}
//                     required
//                 />
//                 <FormInput
//                     label="Start Date"
//                     id="coupon-start-date"
//                     type="datetime-local"
//                     value={couponForm.startDate}
//                     onChange={(e) => setCouponForm({ ...couponForm, startDate: e.target.value })}
//                     required
//                 />
//                 <FormInput
//                     label="End Date"
//                     id="coupon-end-date"
//                     type="datetime-local"
//                     value={couponForm.endDate}
//                     onChange={(e) => setCouponForm({ ...couponForm, endDate: e.target.value })}
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
//                     disabled={loading}
//                 >
//                     {loading ? "Saving..." : editCouponId ? "Update Coupon" : "Add Coupon"}
//                 </button>
//             </form>
//             <div className="flex gap-2 mb-4">
//                 <button
//                     onClick={() => setCouponTab("active")}
//                     className={`flex-1 py-2 rounded-md ${couponTab === "active" ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300"}`}
//                 >
//                     Active Coupons
//                 </button>
//                 <button
//                     onClick={() => setCouponTab("inactive")}
//                     className={`flex-1 py-2 rounded-md ${couponTab === "inactive" ? "bg-red-600 text-white" : "bg-slate-700 text-gray-300"}`}
//                 >
//                     Inactive Coupons
//                 </button>
//             </div>
//             <ul className="space-y-2">
//                 {(couponTab === "active" ? coupons : inactiveCoupons).map((coupon) => (
//                     <li
//                         key={coupon._id}
//                         className="flex justify-between items-center p-3 bg-slate-800 rounded-md border border-slate-700"
//                     >
//                         <span className="text-gray-200">
//                             {coupon.code} ({coupon.discount}% off, {new Date(coupon.startDate).toLocaleDateString()} - {new Date(coupon.endDate).toLocaleDateString()})
//                         </span>
//                         <div className="flex gap-2">
//                             {couponTab === "active" ? (
//                                 <>
//                                     <button onClick={() => handleCouponEdit(coupon)} className="text-yellow-400 hover:text-yellow-500">
//                                         Edit
//                                     </button>
//                                     <button onClick={() => handleCouponDelete(coupon._id)} className="text-red-400 hover:text-red-500">
//                                         Delete
//                                     </button>
//                                     <button onClick={() => handleCouponSoftDelete(coupon._id)} className="text-gray-400 hover:text-gray-500">
//                                         Deactivate
//                                     </button>
//                                 </>
//                             ) : (
//                                 <button onClick={() => handleCouponActivate(coupon._id)} className="text-green-400 hover:text-green-500">
//                                     Activate
//                                 </button>
//                             )}
//                         </div>
//                     </li>
//                 ))}
//                 {(couponTab === "active" ? coupons : inactiveCoupons).length === 0 && (
//                     <li className="text-center text-gray-400 py-4">No {couponTab} coupons found.</li>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default CouponManagement;

import React, { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import { FaEdit, FaTrash, FaBan, FaCheckCircle } from "react-icons/fa";
import api from "../../../Utils/api";

const CouponManagement = ({ coupons, inactiveCoupons, fetchCoupons, loading, setLoading, setError, baseURL }) => {
    const [couponForm, setCouponForm] = useState({
        code: "",
        discount: "",
        startDate: "",
        endDate: "",
    });
    const [editCouponId, setEditCouponId] = useState(null);
    const [couponTab, setCouponTab] = useState("active");

    const handleCouponSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const payload = {
            code: couponForm.code?.trim().toUpperCase(),
            discount: parseFloat(couponForm.discount) || 0,
            startDate: couponForm.startDate ? new Date(couponForm.startDate).toISOString() : undefined,
            endDate: couponForm.endDate ? new Date(couponForm.endDate).toISOString() : undefined,
        };

        if (!payload.code || !payload.discount || !payload.startDate || !payload.endDate) {
            setError("Code, discount, start date, and end date are required.");
            setLoading(false);
            return;
        }

        if (payload.discount < 0 || payload.discount > 100) {
            setError("Discount must be between 0 and 100.");
            setLoading(false);
            return;
        }

        if (new Date(payload.endDate) <= new Date(payload.startDate)) {
            setError("End date must be after start date.");
            setLoading(false);
            return;
        }

        try {
            if (editCouponId) {
                await api.put(`/api/coupons/${editCouponId}`, payload, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
            } else {
                await api.post(`/api/coupons`, payload, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
            }
            setCouponForm({
                code: "",
                discount: "",
                startDate: "",
                endDate: "",
            });
            setEditCouponId(null);
            setCouponTab("active");
            await fetchCoupons();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save coupon.");
        } finally {
            setLoading(false);
        }
    };

    const handleCouponEdit = (coupon) => {
        setCouponForm({
            code: coupon.code || "",
            discount: coupon.discount?.toString() || "",
            startDate: coupon.startDate ? new Date(coupon.startDate).toISOString().slice(0, 16) : "",
            endDate: coupon.endDate ? new Date(coupon.endDate).toISOString().slice(0, 16) : "",
        });
        setEditCouponId(coupon._id);
        setCouponTab("active");
    };

    const handleCouponDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            await api.delete(`/api/coupons/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            await fetchCoupons();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete coupon.");
        } finally {
            setLoading(false);
        }
    };

    const handleCouponSoftDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            await api.patch(`/api/coupons/${id}/deactivate`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            await fetchCoupons();
            setCouponTab("inactive");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to deactivate coupon.");
        } finally {
            setLoading(false);
        }
    };

    const handleCouponActivate = async (id) => {
        setLoading(true);
        setError("");
        try {
            await api.patch(`/api/coupons/${id}/activate`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            await fetchCoupons();
            setCouponTab("active");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to activate coupon.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">Manage Coupons</h2>
            <form onSubmit={handleCouponSubmit} className="space-y-4 mb-6">
                <FormInput
                    label="Coupon Code"
                    id="coupon-code"
                    value={couponForm.code}
                    onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                    required
                />
                <FormInput
                    label="Discount (%)"
                    id="coupon-discount"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={couponForm.discount}
                    onChange={(e) => setCouponForm({ ...couponForm, discount: e.target.value })}
                    required
                />
                <FormInput
                    label="Start Date"
                    id="coupon-start-date"
                    type="datetime-local"
                    value={couponForm.startDate}
                    onChange={(e) => setCouponForm({ ...couponForm, startDate: e.target.value })}
                    required
                />
                <FormInput
                    label="End Date"
                    id="coupon-end-date"
                    type="datetime-local"
                    value={couponForm.endDate}
                    onChange={(e) => setCouponForm({ ...couponForm, endDate: e.target.value })}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={loading}
                >
                    {loading ? "Saving..." : editCouponId ? "Update Coupon" : "Add Coupon"}
                </button>
            </form>
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setCouponTab("active")}
                    className={`flex-1 py-2 rounded-md ${couponTab === "active" ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300"}`}
                >
                    Active Coupons
                </button>
                <button
                    onClick={() => setCouponTab("inactive")}
                    className={`flex-1 py-2 rounded-md ${couponTab === "inactive" ? "bg-red-600 text-white" : "bg-slate-700 text-gray-300"}`}
                >
                    Inactive Coupons
                </button>
            </div>
            <ul className="space-y-2">
                {(couponTab === "active" ? coupons : inactiveCoupons).map((coupon) => (
                    <li
                        key={coupon._id}
                        className="flex justify-between items-center p-3 bg-slate-800 rounded-md border border-slate-700"
                    >
                        <span className="text-gray-200">
                            {coupon.code} ({coupon.discount}% off, {new Date(coupon.startDate).toLocaleDateString()} - {new Date(coupon.endDate).toLocaleDateString()})
                        </span>
                        <div className="flex gap-3">
                            {couponTab === "active" ? (
                                <>
                                    <button
                                        onClick={() => handleCouponEdit(coupon)}
                                        className="text-yellow-400 hover:text-yellow-500"
                                        title="Edit Coupon"
                                    >
                                        <FaEdit size={28} />
                                    </button>
                                    <button
                                        onClick={() => handleCouponDelete(coupon._id)}
                                        className="text-red-400 hover:text-red-500"
                                        title="Delete Coupon"
                                    >
                                        <FaTrash size={28} />
                                    </button>
                                    <button
                                        onClick={() => handleCouponSoftDelete(coupon._id)}
                                        className="text-gray-400 hover:text-gray-500"
                                        title="Deactivate Coupon"
                                    >
                                        <FaBan size={28} />
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => handleCouponActivate(coupon._id)}
                                    className="text-green-400 hover:text-green-500"
                                    title="Activate Coupon"
                                >
                                    <FaCheckCircle size={28} />
                                </button>
                            )}
                        </div>
                    </li>
                ))}
                {(couponTab === "active" ? coupons : inactiveCoupons).length === 0 && (
                    <li className="text-center text-gray-400 py-4">No {couponTab} coupons found.</li>
                )}
            </ul>
        </div>
    );
};

export default CouponManagement;