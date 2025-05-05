// const Booking = require("../model/BookingModel");
// const Room = require("../model/RoomModel");

// exports.createBooking = async (req, res) => {
//   try {
//     const { userId, roomId, name, members, checkIn, checkOut, hasChild, phone } = req.body;
//     const room = await Room.findById(roomId);
//     if (!room || !room.isAvailable) {
//       return res.status(400).json({ message: "Room is not available for booking." });
//     }
//     const booking = new Booking({
//       userId,
//       roomId,
//       name,
//       members,
//       checkIn,
//       checkOut,
//       hasChild,
//       phone,
//     });
//     await booking.save();
//     res.status(201).json({ message: "Booking request submitted successfully.", booking });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating booking", error: error.message });
//   }
// };

// exports.getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate("userId", "email")
//       .populate("roomId", "roomNumber hotelId");
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching bookings", error: error.message });
//   }
// };

// exports.approveBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.bookingId);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found." });
//     }
//     if (booking.status !== "pending") {
//       return res.status(400).json({ message: "Booking is not pending." });
//     }
//     booking.status = "approved";
//     await booking.save();

//     const room = await Room.findById(booking.roomId);
//     room.isAvailable = false;
//     await room.save();

//     res.status(200).json({ message: "Booking approved successfully.", booking });
//   } catch (error) {
//     res.status(500).json({ message: "Error approving booking", error: error.message });
//   }
// };

// exports.rejectBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.bookingId);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found." });
//     }
//     if (booking.status !== "pending") {
//       return res.status(400).json({ message: "Booking is not pending." });
//     }
//     booking.status = "rejected";
//     await booking.save();
//     res.status(200).json({ message: "Booking rejected successfully.", booking });
//   } catch (error) {
//     res.status(500).json({ message: "Error rejecting booking", error: error.message });
//   }
// };

const Booking = require("../model/BookingModel");
const Room = require("../model/RoomModel");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const bookingController = {
  
  createBooking: async (req, res) => {
    try {
      const { userId, roomId, name, members, checkIn, checkOut, hasChild, phone } = req.body;
 
      if (!userId || !roomId || !name || !members || !checkIn || !checkOut || !phone) {
        return res.status(400).json({ message: "All fields are required" });
      }

      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

     
      const booking = new Booking({
        userId,
        roomId,
        name,
        members,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        hasChild,
        phone,
        status: "pending",  
      });

      await booking.save();
      res.status(201).json({ message: "Booking created successfully", bookingId: booking._id });
    } catch (error) {
      console.error("Create Booking error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

 
  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("userId", "firstname lastname email")
        .populate("roomId", "roomNumber type price");
      res.status(200).json({ bookings });
    } catch (error) {
      console.error("Get All Bookings error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  
//   updateBookingStatus: async (req, res) => {
//     try {
//       const { bookingId } = req.params;
//       const { status } = req.body;

//       if (!["pending", "approved", "rejected"].includes(status)) {
//         return res.status(400).json({ message: "Invalid status" });
//       }

//       const booking = await Booking.findById(bookingId);
//       if (!booking) {
//         return res.status(404).json({ message: "Booking not found" });
//       }

//       booking.status = status;
//       await booking.save();
      
// if(["pending", "approved"].includes(status)){
//     Room.
// }
//       res.status(200).json({ message: `Booking ${status} successfully`, booking });
//     } catch (error) {
//       console.error("Update Booking Status error:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
// };

updateBookingStatus: async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { status } = req.body;
  
      if (!["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
  
      const booking = await Booking.findById(bookingId).populate("roomId"); 
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      booking.status = status;
      await booking.save();
  
      if (status === "approved" && booking.roomId) {
        booking.roomId.isAvailable = false;
        await booking.roomId.save();
      }
  
      res.status(200).json({ message: `Booking ${status} successfully`, booking });
    } catch (error) {
      console.error("Update Booking Status error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};  

module.exports = bookingController;