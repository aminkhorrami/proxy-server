const jwt = require("jsonwebtoken");
// import { promisify } from "util";
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

//require("../utils/catchAsync.js");
const { User } = require("../models/userModel.js");
const { Errors } = require("../utils/errorMsg.js");

// import Email from '../utils/email';

// NO JWT ENABLED YET!
// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);
//   // Remove the password from the output
//   user.password = undefined;
//   res.status(statusCode).json({
//     status: "success",
//     token,
//     data: {
//       user: user,
//     },
//   });
// };

const signup = catchAsync(async (req, res, next) => {
  // if (req.body.role === "admin") {
  console.log("BODdddy", req.body);
  const user = await User.create(req.body);
  return res.status(201).json({
    status: "success",
    //token,
    data: {
      user: user,
    },
  });
  // } else {
  //   return res.status(301).json({ status: "failed" });
  // }
});

// export const login = catchAsync(async (req, res, next) => {
//   const { phoneNumber, password } = req.body;

//   // 1) Check if phoneNumber and password exist
//   if (!phoneNumber || !password) {
//     return next(new AppError(Errors.PHONE_PASS_INPUT_ISSUE, 400));
//   }

//   const number = phoneSanitizer(phoneNumber);

//   if (!number) {
//     return next(new AppError(Errors.PHONE_INPUT_ISSUE, 402));
//   }

//   // 2) Check if the user exists && if the password is correct
//   const user = await User.findOne({ phoneNumber: number }).select("+password");

//   if (!user || !(await user.correctPassword(password, user.password))) {
//     return next(new AppError(Errors.PHONE_PASS_INPUT_ISSUE, 400));
//   }

//   if (user.role !== "user") {
//     return createSendToken(user, 200, res);
//   }

//   if (user.isPhoneNumberVarified === false) {
//     // ! NEVER CHANGE THE MESSAGE
//     return next(new AppError(Errors.PHONE_VERIFY, 403));
//   }

//   // 3) If everyhing ok, send token to client
//   createSendToken(user, 200, res);
// });

// export const logout = (req, res) => {
//   res.cookie("jwt", "loggedout", {
//     expires: new Date(Date.now() + 1000),
//     httpOnly: true,
//   });
//   res.status(200).json({ status: "success" });
// };

// export const protect = catchAsync(async (req, res, next) => {
//   // 1) Getting token and check if it's there
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies && req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }

//   if (!token) {
//     return next(new AppError(Errors.LOGIN_ISSUE, 401));
//   }
//   // 2) Validate token
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   // 3) Check if user still exists
//   const currentUser = await User.findById(decoded.id);

//   if (!currentUser) {
//     return next(new AppError(Errors.NO_MORE_USER, 400));
//   }

//   // 4) Check if user changed password after the token was issued
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(new AppError(Errors.PASS_CHANGE_LOGIN, 401));
//   }

//   // GRANT ACCESS TO PROTECTED ROUTE
//   req.user = currentUser;
//   res.locals.user = currentUser;
//   next();
// });

// export const restrictTo = (...roles) => {
//   return (req, res, next) => {
//     // roles = ['admin', 'lead-guide']. role='user'
//     if (!roles.includes(req.user.role)) {
//       return next(new AppError(Errors.PERMISSION_ISSUE, 403));
//     }
//     next();
//   };
// };

exports.signup = signup;
