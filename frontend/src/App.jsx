 
import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import SignUp from "./components/authentication/SignUp";
import Login from "./components/authentication/Login";
import ForgetPassword from "./components/authentication/ForgetPassword";
import ResetPassword from "./components/authentication/ResetPassword";
import User from "./components/ui/User";
import UserPage from "./components/admin/UserPage";
import AdminPage from "./components/admin/AdminPage";
import Otp from "./components/authentication/Otp";
import ProtectedRoute from "./components/routes/ProtectedRoute";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLogin") === "true"
  );

  useEffect(() => {
    // Update authentication state on mount and when localStorage changes
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isLogin") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("token"); // Remove token if used
    setIsAuthenticated(false);
    // Redirect to login (handled by RouterProvider)
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/verification",
      element: <Otp />,
    },
    {
      path: "/forget-pass",
      element: <ForgetPassword />,
    },
    {
      path: "/reset-pass",
      element: <ResetPassword />,
    },
    {
      path: "/user",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <User handleLogout={handleLogout} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/users",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <UserPage handleLogout={handleLogout} />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <AdminPage handleLogout={handleLogout} />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
// import React from 'react'
// import LocationManager from './components/admin/Location'

// const App = () => {
//   return (
//     <div>
//       <LocationManager/>
//     </div>
//   )
// }

// export default App
