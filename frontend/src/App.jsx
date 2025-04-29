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
import AdminDashboard from "./components/dashboard/AdminDashboard";

const isLogin = localStorage.getItem("isLogin") === "true";

const router = createBrowserRouter([
  {
    path: "/",
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
    element: isLogin ? <User /> : <Login />,
  },
  
  {
    path: "/users",
    element: isLogin ? <UserPage /> : <Login />,
  },
  {
    path: "/admin",
    element: isLogin ? <AdminPage /> : <Login />,
  },
   
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
