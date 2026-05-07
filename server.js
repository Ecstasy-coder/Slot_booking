const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const slotRoutes =
require("./routes/slotRoutes");

app.use("/api", slotRoutes);

// MongoDB connection

mongoose.connect(process.env.MONGO_URI)

.then(() =>
console.log("MongoDB Connected"))

.catch(err =>
console.log(err));

// Test route

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {

  console.log(
  `Server running on ${PORT}`);

});