const express = require("express");

const {
  login,
  protect,
  // restrictTo,
  logout,
  signup,
} = require("../controllers/authController.js");

// import { getMe }  = require("../controllers/userController.js");

const router = express.Router();

// router.post("/login", login);
// router.get("/logout", logout);
router.post("/signup", signup);

// ** CARE **
// Middleware (Location Sensitive)
// Protect all routes after this middleware

// router.use(protect);

// router.get("/me", getMe);

exports.router = router;
