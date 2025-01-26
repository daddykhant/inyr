const jwt = require("jsonwebtoken");

const verifyTokenAndAdminRole = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }

    // Check if the user has an admin role
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    req.user = user; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  });
};
