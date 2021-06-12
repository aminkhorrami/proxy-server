// import express from "express";

// import {
//   signup,
//   login,
//   forgotPassword,
//   resetPassword,
//   protect,
//   updatePassword,
//   restrictTo,
//   logout,
//   varifyCode,
//   resendVarifyPhone,
//   varifyEmail,
// } from "../controllers/authController";

// import {
//   getAllUsers,
//   getUser,
//   createUser,
//   updateUser,
//   deleteUser,
//   updateMe,
//   deleteMe,
//   getMe,
//   searchUser,
//   giveOperatorPlans,
//   removePlansFromOperators,
// } from "../controllers/userController";

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/logout", logout);
// router.post("/varifyPhone", varifyCode);
// router.post("/varifyEmail", varifyEmail);
// router.post("/resendVarifyPhone", resendVarifyPhone);

// router.post("/forgotPassword", forgotPassword);
// router.patch("/resetPassword/:token", resetPassword);

// // ** CARE **
// // Middleware (Location Sensitive)
// // Protect all routes after this middleware
// router.use(protect);

// router.patch("/updateMyPassword", updatePassword);

// router.get("/me", getMe, getUser);
// router.patch("/updateMe", updateMe);
// router.delete("/deleteMe", deleteMe);

// // Middleware (Location Sensitive)
// // Restrict all routes to 'admin' after this middleware
// router.use(restrictTo("admin", "ultra-admin"));

// router.route("/").get(getAllUsers).post(createUser);

// router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

// router.use(restrictTo("ultra-admin"));
// router.route("/search").post(searchUser);
// router.route("/operate").post(giveOperatorPlans);
// router.route("/operate/remove").post(removePlansFromOperators);

// export default router;
