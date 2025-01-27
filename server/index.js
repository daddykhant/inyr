const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Define allowed origins
const allowedOrigins = [
  "https://inyr.vercel.app/", // frontend origin
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman requests)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      const msg =
        "The CORS policy for this site does not allow access from the specified origin.";
      return callback(new Error(msg), false);
    },
    credentials: true, // Allow cookies or HTTP authentication if needed
    optionsSuccessStatus: 204, // For legacy browser support
  })
);

app.use(bodyParser.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
