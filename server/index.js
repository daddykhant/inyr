const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Define allowed origins
const allowedOrigins = ["https://inyr.vercel.app"]; // frontend origin

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      const msg =
        "The CORS policy for this site does not allow access from the specified origin.";
      return callback(new Error(msg), false);
    },
    credentials: true, // Allow cookies or HTTP authentication
  })
);

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.status(200).send("API is running.");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
