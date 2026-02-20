const express = require("express");
const { login, getAllUser, register, getSingleUser, deleteUser, updateUser } = require("../controller/userController");
const { protect, admin } = require("../auth/authMiddleware");
const router = express.Router();

// Public
router.post("/register", register);
router.post('/login', login);

// Authenticated Users (Self-management)
router.get("/:id", protect, getSingleUser);
router.put("/:id", protect, updateUser); 

// Admin Only (Management)
router.get("/", protect, admin, getAllUser);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;