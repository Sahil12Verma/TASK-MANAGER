// server/index.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./Routes/userRoute");
const taskRoute = require("./Routes/taskRoute");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Task Manager's API");
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
