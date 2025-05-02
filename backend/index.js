 

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const StateRoute = require('./routes/StateRoute')
const CityRoute = require('./routes/CityRoute')
const hotelRoutes = require('./routes/HotelRoute')
const RoomRoutes = require("./routes/RoomRoute");
const fileUpload = require("express-fileupload");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/location-manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
// City Routes
app.use("/api", StateRoute);
app.use("/api", CityRoute);
app.use('/api', hotelRoutes);
app.use("/api", RoomRoutes);
 
app.listen(6969, () => {
  console.log("Server running on port 6969");
});