import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  useEffect(() => {
 
    const storedEmail = localStorage.getItem("otpEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
  
      alert("Please sign up first");
    }
  }, []);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    try {
      const res = await axios.post("http://localhost:6969/user/verifyOtp", {
        email,
        otp,
      });
      alert("OTP Verified Successfully!");
      navigate("/login");
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      <div className="max-w-sm w-full p-8 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Please enter the OTP sent to your email/phone.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="otp"
            maxLength="6"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-center tracking-widest"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Verify OTP
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Didn’t receive the code?</p>
          <button className="text-sm text-blue-600 hover:underline mt-1">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Verification = () => {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const email = localStorage.getItem("otpEmail");

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (!otp) {
//       setMessage("Please enter the OTP");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:6969/user/verify-otp",
//         {
//           email,
//           otp,
//         }
//       );

//       if (response.data.success) {
//         setMessage("Verification successful!");
//         localStorage.removeItem("otpEmail");
//         setTimeout(() => navigate("/dashboard"), 1500);
//       } else {
//         setMessage(response.data.message || "Verification failed");
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:6969/user/resend-otp",
//         {
//           email,
//         }
//       );
//       setMessage(response.data.message || "OTP resent successfully");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to resend OTP");
//     }
//   };

//   return (
//     <div className="bg-blue-200 h-screen pt-8 w-full">
//       <div className="max-w-md mx-auto mt-12 p-8 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl shadow-2xl">
//         <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
//           Verify Your Email
//         </h2>
//         <p className="text-center mb-6">We've sent a 6-digit code to {email}</p>

//         <form className="space-y-5" onSubmit={handleVerify}>
//           <div>
//             <label
//               htmlFor="otp"
//               className="block text-sm font-medium text-blue-800"
//             >
//               OTP Code
//             </label>
//             <input
//               id="otp"
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter 6-digit code"
//               maxLength={6}
//             />
//           </div>

//           {message && (
//             <div
//               className={`text-center ${
//                 message.includes("success") ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {message}
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
//             disabled={isLoading}
//           >
//             {isLoading ? "Verifying..." : "Verify"}
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <button
//             onClick={handleResend}
//             className="text-sm text-blue-700 hover:underline"
//           >
//             Didn't receive code? Resend
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Verification;
