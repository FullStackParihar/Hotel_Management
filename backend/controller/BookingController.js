 
// const Booking = require("../model/BookingModel");
// const Room = require("../model/RoomModel");
// const User = require("../model/userModel");
// const jwt = require("jsonwebtoken");

// const bookingController = {
//   createBooking: async (req, res) => {
//     try {
//       const { userId, roomId, name, members, checkIn, checkOut, hasChild, phone } = req.body;
 
//       if (!userId || !roomId || !name || !members || !checkIn || !checkOut || !phone) {
//         return res.status(400).json({ message: "All fields are required" });
//       }

//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       const booking = new Booking({
//         userId,
//         roomId,
//         name,
//         members,
//         checkIn: new Date(checkIn),
//         checkOut: new Date(checkOut),
//         hasChild,
//         phone,
//         status: "pending",  
//       });

//       await booking.save();
//       res.status(201).json({ message: "Booking created successfully", bookingId: booking._id });
//     } catch (error) {
//       console.error("Create Booking error:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   },

//   getAllBookings: async (req, res) => {
//     try {
//       const bookings = await Booking.find()
//         .populate("userId", "firstname lastname email")
//         .populate("roomId", "roomNumber type price");
//       res.status(200).json({ bookings });
//     } catch (error) {
//       console.error("Get All Bookings error:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   },

//   updateBookingStatus: async (req, res) => {
//     try {
//       const { bookingId } = req.params;
//       const { status } = req.body;
  
//       if (!["pending", "approved", "rejected"].includes(status)) {
//         return res.status(400).json({ message: "Invalid status" });
//       }
  
//       const booking = await Booking.findById(bookingId).populate("roomId"); 
//       if (!booking) {
//         return res.status(404).json({ message: "Booking not found" });
//       }
  
//       booking.status = status;
//       await booking.save();
  
//       if (status === "approved" && booking.roomId) {
//         booking.roomId.isAvailable = false;
//         await booking.roomId.save();
//       }
  
//       res.status(200).json({ message: `Booking ${status} successfully`, booking });
//     } catch (error) {
//       console.error("Update Booking Status error:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   },

//   getUserBookings: async (req, res) => {
//     try {
//       // Extract token from Authorization header
//       const token = req.headers.authorization?.split(" ")[1];
//       if (!token) {
//         return res.status(401).json({ message: "No token provided" });
//       }

//       // Verify and decode the token
//       const decoded = jwt.verify(token, "asdfghjkl");
//       if (!decoded || !decoded._id) {
//         return res.status(401).json({ message: "Invalid token" });
//       }

//       // Fetch bookings for the authenticated user
//       const bookings = await Booking.find({ userId: decoded._id })
//         .populate("roomId", "roomNumber type price");
//       res.status(200).json(bookings);
//     } catch (error) {
//       console.error("Get User Bookings error:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
// };

// module.exports = bookingController;

const Booking = require("../model/BookingModel");
const Room = require("../model/RoomModel");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

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
 
      const populatedBooking = await Booking.findById(booking._id)
        .populate("userId", "firstname lastname email")
        .populate("roomId", "roomNumber type price");
 
      const mailOptions = {
        from: process.env.email,
        to: populatedBooking.userId.email,
        subject: "Booking Confirmation - My Hotel",
        html: `
          <h2>Booking Confirmation</h2>
          <p>Dear ${populatedBooking.userId.firstname} ${populatedBooking.userId.lastname},</p>
          <p>Thank you for booking with My Hotel! Your booking has been successfully created with the following details:</p>
          <ul>
            <li><strong>Booking ID:</strong> ${populatedBooking._id}</li>
            <li><strong>Room:</strong> Room ${populatedBooking.roomId.roomNumber} (${populatedBooking.roomId.type})</li>
            <li><strong>Price per Night:</strong> ₹${populatedBooking.roomId.price}</li>
            <li><strong>Check-In Date:</strong> ${new Date(populatedBooking.checkIn).toLocaleDateString()}</li>
            <li><strong>Check-Out Date:</strong> ${new Date(populatedBooking.checkOut).toLocaleDateString()}</li>
            <li><strong>Guests:</strong> ${populatedBooking.members} ${populatedBooking.hasChild ? "(Includes children)" : ""}</li>
            <li><strong>Phone:</strong> ${populatedBooking.phone}</li>
            <li><strong>Status:</strong> ${populatedBooking.status.charAt(0).toUpperCase() + populatedBooking.status.slice(1)}</li>
          </ul>
          <p>We will notify you once your booking is approved by the hotel administration.</p>
          <p>If you have any questions, feel free to contact us.</p>
          <p>Best regards,<br>My Hotel Team</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent to:", populatedBooking.userId.email);
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }

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
 
        const populatedBooking = await Booking.findById(bookingId)
          .populate("userId", "firstname lastname email")
          .populate("roomId", "roomNumber type price");

      
        const mailOptions = {
          from: process.env.email,
          to: populatedBooking.userId.email,
          subject: "Booking Approved - My Hotel",
          html: `
            <h2>Booking Approved</h2>
            <p>Dear ${populatedBooking.userId.firstname} ${populatedBooking.userId.lastname},</p>
            <p>We are pleased to inform you that your booking with My Hotel has been approved. Here are the details:</p>
            <ul>
              <li><strong>Booking ID:</strong> ${populatedBooking._id}</li>
              <li><strong>Room:</strong> Room ${populatedBooking.roomId.roomNumber} (${populatedBooking.roomId.type})</li>
              <li><strong>Price per Night:</strong> ₹${populatedBooking.roomId.price}</li>
              <li><strong>Check-In Date:</strong> ${new Date(populatedBooking.checkIn).toLocaleDateString()}</li>
              <li><strong>Check-Out Date:</strong> ${new Date(populatedBooking.checkOut).toLocaleDateString()}</li>
              <li><strong>Guests:</strong> ${populatedBooking.members} ${populatedBooking.hasChild ? "(Includes children)" : ""}</li>
              <li><strong>Phone:</strong> ${populatedBooking.phone}</li>
              <li><strong>Status:</strong> ${populatedBooking.status.charAt(0).toUpperCase() + populatedBooking.status.slice(1)}</li>
            </ul>
            <p>We look forward to welcoming you! If you have any questions, feel free to contact us.</p>
            <p>Best regards,<br>My Hotel Team</p>
          `,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log("Approval email sent to:", populatedBooking.userId.email);
        } catch (emailError) {
          console.error("Error sending approval email:", emailError);
        }
      }
  
      res.status(200).json({ message: `Booking ${status} successfully`, booking });
    } catch (error) {
      console.error("Update Booking Status error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getUserBookings: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, "asdfghjkl");
      if (!decoded || !decoded._id) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const bookings = await Booking.find({ userId: decoded._id })
        .populate("roomId", "roomNumber type price");
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Get User Bookings error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  checkInBooking: async (req, res) => {
    try {
      const { bookingId } = req.params;

      
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, "asdfghjkl");
      if (!decoded || !decoded._id) {
        return res.status(401).json({ message: "Invalid token" });
      }

      
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      if (booking.userId.toString() !== decoded._id) {
        return res.status(403).json({ message: "Unauthorized: You can only check in your own bookings" });
      }

      
      if (booking.status !== "approved") {
        return res.status(400).json({ message: "Booking must be approved before checking in" });
      }

      if (booking.checkedIn) {
        return res.status(400).json({ message: "Booking is already checked in" });
      }

     
      booking.checkedIn = true;
      await booking.save();

      res.status(200).json({ message: "Checked in successfully", booking });
    } catch (error) {
      console.error("Check-In Booking error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = bookingController;