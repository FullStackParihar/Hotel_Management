

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const StateRoute = require('./routes/StateRoute')
// const CityRoute = require('./routes/CityRoute')
// const hotelRoutes = require('./routes/HotelRoute')
// const RoomRoutes = require("./routes/RoomRoute");
// const userRoutes = require("./routes/userRoutes");
// const bookingRoutes = require('./routes/BookingRoute')
// const couponRoutes = require('./routes/CouponRoute');
// const analyticsRoutes = require('./routes/DshboardRoute')
// const locationroute = require('./routes/LocationRoute')
// const fileUpload = require("express-fileupload");

// const cron = require("node-cron");
// const { startCronJobs } = require("./Crons/DeactivateUserCron");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(fileUpload());

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, "client/build")));

// // All other GET requests not handled before will return index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

// // mongoose.connect("mongodb://localhost:27017/location-manager", {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://vishnuparihar239925:1234@cluster0.oloj4sd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

//     });
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);

//   }
// };






// app.use('/api/coupons', couponRoutes);

// app.use("/user", userRoutes);

// app.use("/api/locations", locationroute);

// app.use("/api", StateRoute);

// app.use("/api", CityRoute);

// app.use('/api', hotelRoutes);

// app.use("/api", RoomRoutes);

// app.use("/api/bookings", bookingRoutes);

// app.use('/api', analyticsRoutes);

// // const {
// //   scheduleCronJob } = require("./Crons/DeactivateUserCron");


// // scheduleCronJob();

// // const { scheduleReportCronJob } = require("./Crons/BookingReportCron");

// // scheduleReportCronJob();


// const PORT = process.env.PORT || 6969;
// const startServer = async () => {
//   await connectDB();
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// };

// startServer();




const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // You missed this import
const fileUpload = require("express-fileupload");

// Import Routes
const StateRoute = require('./routes/StateRoute');
const CityRoute = require('./routes/CityRoute');
const hotelRoutes = require('./routes/HotelRoute');
const RoomRoutes = require("./routes/RoomRoute");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require('./routes/BookingRoute');
const couponRoutes = require('./routes/CouponRoute');
const analyticsRoutes = require('./routes/DshboardRoute');
const locationroute = require('./routes/LocationRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vishnuparihar239925:1234@cluster0.oloj4sd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

// API Routes
app.use('/api/coupons', couponRoutes);
app.use("/user", userRoutes);
app.use("/api/locations", locationroute);
app.use("/api", StateRoute);
app.use("/api", CityRoute);
app.use('/api', hotelRoutes);
app.use("/api", RoomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use('/api', analyticsRoutes);

// 🔥 Serve static files only after all API routes
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 6969;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
