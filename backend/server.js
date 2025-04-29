const express = require("express");
require("dotenv").config();
const cors = require("cors");
 

const dbConnection = require("../backend/db/dataBase");
 
const userRoutes = require("./routes/userRoutes");
const locationRoute = require('./routes/LocationRoute')

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
 

app.use("/user", userRoutes);
app.use('/locations', locationRoute);
 

dbConnection();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
