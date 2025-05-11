import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/authentication/SignUp";
import Login from "./components/authentication/Login";
import ForgetPassword from "./components/authentication/ForgetPassword";
import ResetPassword from "./components/authentication/ResetPassword";
import User from "./components/ui/User";
import UserPage from "./components/admin/UserPage";
import AdminPage from "./components/admin/AdminPage";
import Otp from "./components/authentication/Otp";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Profile from "./components/User/components/Profile";
import ResetPasswordd from "./components/User/components/ResetPasswordd";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
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
        <ProtectedRoute requiredRole="user">
          <User />
        </ProtectedRoute>
      ),
    },
    {
      path: "/users",
      element: (
        <ProtectedRoute requiredRole="admin">
          <UserPage />
        </ProtectedRoute>
      ),
    },

    {
      path: "/admin",
      element: (
        <ProtectedRoute requiredRole="admin">
          <AdminPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute requiredRole="user">
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/reset-password",
      element: (
        <ProtectedRoute requiredRole="user">
          <ResetPasswordd />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;