import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaUsers,
  FaPlus,
  FaSignOutAlt,
  FaListAlt,
  FaEdit,
  FaTrashAlt,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const User = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    navigate("/");
  };

  return (

    <>   <div className="flex space-x-4">

      <button
        className="flex items-center bg-red-500 hover:bg-red-400 px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="mr-2" />
        Sign Out
      </button>
    </div>
      <div>hello im user</div>
    </>



  );
};

export default User;