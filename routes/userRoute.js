const express = require("express");

const {
  login,
  protect,
  // restrictTo,
  logout,
  signup,
  createConnectionRecord,
  getConnectionRecords,
} = require("../controllers/authController.js");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);

// record date

router.post("/record", createConnectionRecord);
router.get("/getRecords", getConnectionRecords);

// ** CARE **
// Middleware (Location Sensitive)
// Protect all routes after this middleware

// router.use(protect);

// router.get("/me", getMe);

exports.router = router;
