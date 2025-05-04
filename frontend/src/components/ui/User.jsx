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
import UserPanel from "../User/UserPanel";

const User = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    navigate("/");
  };

  return (

    <>    
<UserPanel/>
    </>



  );
};

export default User;