import express from "express";

import {
  login,
  protect,
  restrictTo,
  logout,
} from "../controllers/authController.js";

import { getMe } from "../controllers/userController.js";

export const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);

// ** CARE **
// Middleware (Location Sensitive)
// Protect all routes after this middleware

router.use(protect);

router.get("/me", getMe);
