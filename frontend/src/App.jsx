//  import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SignUp from "./components/authentication/SignUp";
// import Login from "./components/authentication/Login";
// import ForgetPassword from "./components/authentication/ForgetPassword";
// import ResetPassword from "./components/authentication/ResetPassword";
// import User from "./components/ui/User";
// // import UserPage from "./components/admin/UserPage";
// import AdminPage from "./components/admin/AdminPage";
// import Otp from "./components/authentication/Otp";
// import ProtectedRoute from "./components/routes/ProtectedRoute";
// import Profile from "./components/User/components/Profile";
// import ResetPasswordd from "./components/User/components/ResetPasswordd";
// import { AdminDashboard, dashboardRoutes } from './components/dashboard/AdminDashboard';

// const App = () => {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Login />,
//     },
//     {
//       path: "/sign-up",
//       element: <SignUp />,
//     },
//     {
//       path: "/verification",
//       element: <Otp />,
//     },
//     {
//       path: "/forget-pass",
//       element: <ForgetPassword />,
//     },
//     {
//       path: "/reset-pass",
//       element: <ResetPassword />,
//     },
//     {
//       path: "/user",
//       element: (
//         <ProtectedRoute requiredRole="user">
//           <User />
//         </ProtectedRoute>
//       ),
//     },
//     // {
//     //   path: "/users",
//     //   element: (
//     //     <ProtectedRoute requiredRole="admin">
//     //       <UserPage />
//     //     </ProtectedRoute>
//     //   ),
//     // },

//     {
//       path: "/admin",
//       element: (
//         <ProtectedRoute requiredRole="admin">
//           <AdminPage />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/profile",
//       element: (
//         <ProtectedRoute requiredRole="user">
//           <Profile />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/reset-password",
//       element: (
//         <ProtectedRoute requiredRole="user">
//           <ResetPasswordd />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/dashboard',
//       element: <AdminDashboard />,
//       children: dashboardRoutes,
//     },
    
//   ]);

//   return <RouterProvider router={router} />;
// };

// export default App;



// // import React from "react";
// // import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // import SignUp from "./components/authentication/SignUp";
// // import Login from "./components/authentication/Login";
// // import ForgetPassword from "./components/authentication/ForgetPassword";
// // import ResetPassword from "./components/authentication/ResetPassword";
// // import User from "./components/ui/User";
// // // import UserPage from "./components/admin/UserPage";
// // import AdminPage from "./components/admin/AdminPage";
// // import Otp from "./components/authentication/Otp";
// // import ProtectedRoute from "./components/routes/ProtectedRoute";
// // import Profile from "./components/User/components/Profile";
// // import ResetPasswordd from "./components/User/components/ResetPasswordd";
// // // import { AdminDashboard, dashboardRoutes } from './components/dashboard/AdminDashboard';
// // import UserDashboard from './components/dashboard/NewDashboard';
// // import { dashboardRoutes } from './components/dashboard/NewDashboard';

// // const App = () => {
// //   const router = createBrowserRouter([
// //     {
// //       path: "/",
// //       element: <Login />,
// //     },
// //     {
// //       path: "/sign-up",
// //       element: <SignUp />,
// //     },
// //     {
// //       path: "/verification",
// //       element: <Otp />,
// //     },
// //     {
// //       path: "/forget-pass",
// //       element: <ForgetPassword />,
// //     },
// //     {
// //       path: "/reset-pass",
// //       element: <ResetPassword />,
// //     },
// //     {
// //       path: "/user",
// //       element: (
// //         <ProtectedRoute requiredRole="user">
// //           <User />
// //         </ProtectedRoute>
// //       ),
// //     },
// //     // {
// //     //   path: "/users",
// //     //   element: (
// //     //     <ProtectedRoute requiredRole="admin">
// //     //       <UserPage />
// //     //     </ProtectedRoute>
// //     //   ),
// //     // },
// //     {
// //       path: "/admin",
// //       element: (
// //         <ProtectedRoute requiredRole="admin">
// //           <AdminPage />
// //         </ProtectedRoute>
// //       ),
// //     },
// //     {
// //       path: "/profile",
// //       element: (
// //         <ProtectedRoute requiredRole="user">
// //           <Profile />
// //         </ProtectedRoute>
// //       ),
// //     },
// //     {
// //       path: "/reset-password",
// //       element: (
// //         <ProtectedRoute requiredRole="user">
// //           <ResetPasswordd />
// //         </ProtectedRoute>
// //       ),
// //     },
// //     // {
// //     //   path: '/dashboard',
// //     //   element: (
// //     //     <ProtectedRoute requiredRole="admin">
// //     //       <AdminDashboard />
// //     //     </ProtectedRoute>
// //     //   ),
// //     //   children: dashboardRoutes,
// //     // },
// //     {
// //       path: '/user-dashboard',
// //       element: (
// //         <ProtectedRoute requiredRole={["admin", "user"]}>
// //           <UserDashboard />
// //         </ProtectedRoute>
// //       ),
// //       children: dashboardRoutes,
// //     },
// //   ]);

// //   return <RouterProvider router={router} />;
// // };

// // export default App;



import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/authentication/SignUp";
import Login from "./components/authentication/Login";
import ForgetPassword from "./components/authentication/ForgetPassword";
import ResetPassword from "./components/authentication/ResetPassword";
import User from "./components/ui/User";
// import UserPage from "./components/admin/UserPage";
import AdminPage from "./components/admin/AdminPage";
import Otp from "./components/authentication/Otp";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Profile from "./components/User/components/Profile";
import ResetPasswordd from "./components/User/components/ResetPasswordd";
import UserDashboard from './components/dashboard/NewDashboard';

const App = () => {
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
      element: (
        <ProtectedRoute requiredRole="user">
          <User />
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
    // {
    //   path: '/user-dashboard',
    //   element: (
    //     <ProtectedRoute >
    //       <UserDashboard />
    //     </ProtectedRoute>
    //   ),
    //   children: dashboardRoutes,
    // },
    {
    path: '/user-dashboard',
    element: (
        <ProtectedRoute requiredRole={["admin", "user"]}>
            <UserDashboard />
        </ProtectedRoute>
    ),
    // children: dashboardRoutes,
},
  ]);

  return <RouterProvider router={router} />;
};

export default App;


// import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserDashboard from './components/dashboard/NewDashboard'
// import { dashboardRoutes } from './components/dashboard/NewDashboard'

// const App = () => {
//   return (
//   <Router>
//       <Routes>
//         <Route path="/admin" element={<UserDashboard />}>
//           {dashboardRoutes.map(route => (
//             <Route key={route.path} path={route.path} element={route.element} />
//           ))}
//         </Route>
//       </Routes>
//     </Router>
//   )
// }

// export default App
