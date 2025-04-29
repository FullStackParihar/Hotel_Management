import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  // Simulated logged-in admin data
  const admin = {
    name: "Admin Kumar",
    email: "admin@example.com",
  };

  const [activePage, setActivePage] = useState("dashboard");
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when "allTasks" is selected
  useEffect(() => {
    if (activePage === "allTasks") {
      axios
        .get("/api/tasks")
        .then((res) => setTasks(res.data.tasks))
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, [activePage]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <p>
            <strong>Name:</strong> {admin.name}
          </p>
          <p>
            <strong>Email:</strong> {admin.email}
          </p>
        </div>
        <div className="space-y-2 pt-6">
          <button
            className="block w-full text-left hover:bg-blue-700 p-2 rounded"
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>
          <button
            className="block w-full text-left hover:bg-blue-700 p-2 rounded"
            onClick={() => setActivePage("assignTask")}
          >
            Assign Task
          </button>
          <button
            className="block w-full text-left hover:bg-blue-700 p-2 rounded"
            onClick={() => setActivePage("allTasks")}
          >
            All Tasks
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        {activePage === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Welcome, {admin.name}</h1>
            <p>Choose an action from the left panel.</p>
          </div>
        )}

        {activePage === "assignTask" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Assign Task</h1>
            <p>Form coming soon...</p>
          </div>
        )}

        {activePage === "allTasks" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
            {tasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={index} className="bg-white p-4 shadow rounded">
                    <h3 className="font-bold text-lg">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    <p className="text-sm text-blue-500">
                      Status: {task.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
