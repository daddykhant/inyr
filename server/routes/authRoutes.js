const express = require("express");
const {
  registerUser,
  loginAdmin,
  verifyAdmin,
  deleteUser,
  getAllUsers,
} = require("../controllers/authController");
// const verifyTokenAndAdminRole = require("../middleware/verifyTokenAndAdminRole");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginAdmin);
router.get("/verify", verifyAdmin);
router.delete("/delete/:id", deleteUser);
router.get("/users", getAllUsers);

module.exports = router;
