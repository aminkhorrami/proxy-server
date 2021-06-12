// import crypto from "crypto";
// import mongoose from "mongoose";
// import { isEmail } from "validator";
// import bcrypt from "bcryptjs";
// import { provincesEnum } from "../utils/prvinces";
// import { howYouKnowEnum } from "../utils/howYouKnow";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please State Your Name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please Provide Your Email"],
//     unique: [true, "Email Used Before"],
//     lowercase: true,
//     validate: [isEmail, ".لطفا ایمیل خود را به درستی وارد کنید"],
//   },
//   phoneNumber: {
//     type: String,
//     required: [true, "Please State Your phoneNumber"],
//     unique: [true, "Phone Number Used Before"],
//     minlength: [12, "pnumber must be at least 12 digits"],
//     maxlength: [12, "pnumber must be at most 12 digits"],
//     validate: function (value) {
//       if (/^\d+$/.test(value) !== true) return false;

//       return true;
//     },
//   },
//   role: {
//     type: String,
//     enum: ["user", "admin", "operator", "ultra-admin", "blogger"],
//     default: "user",
//   },
//   bookings: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: "Booking",
//     },
//   ],
//   plansToOperate: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: "Plan",
//     },
//   ],
//   usedSaleCodes: [
//     {
//       type: mongoose.Schema.ObjectId,
//       ref: "salecode",
//     },
//   ],
//   appleIdState: {
//     type: Boolean,
//     required: [true, "We Should Know AppleID state"],
//     default: false,
//   },
//   /// TODO: Add password validation
//   password: {
//     type: String,
//     required: [true, "Please provide a password"],
//     minlength: [8, "Your password must be more than 8 characters"],
//     select: false,
//   },
//   passwordConfirm: {
//     type: String,
//     required: [true, "Please confirm your password"],
//     validate: {
//       // TODO: This only works on CREATE and SAVE!!!
//       validator: function (el) {
//         return el === this.password;
//       },
//       message: "Passwords are not the same!",
//     },
//   },
//   passwordChangedAt: Date,
//   passwordResetToken: String,
//   passwordResetExpires: Date,
//   phoneVarifyToken: { type: String, select: false },
//   emailVarifyToken: { type: String, select: false },
//   isEmailVarified: { type: Boolean, default: false },
//   isPhoneNumberVarified: { type: Boolean, default: false },

//   active: {
//     type: Boolean,
//     default: true,
//     select: false,
//   },
//   gender: {
//     type: String,
//     enum: ["M", "F"],
//   },
//   howYouKnow: {
//     type: String,
//     enum: howYouKnowEnum,
//   },
//   province: {
//     type: String,
//     enum: provincesEnum,
//   },
//   birthDay: {
//     type: Date,
//   },
// });

// userSchema.pre("save", async function (next) {
//   // Only run this function if password was actually modified
//   if (!this.isModified("password")) return next();

//   // Hash the password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);

//   this.passwordConfirm = undefined;
//   next();
// });

// userSchema.pre("save", function (next) {
//   if (!this.isModified("password") || this.isNew) return next();

//   if (this.role !== "operator") this.plansToOperate = [];

//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });

// userSchema.pre(/^find/, function (next) {
//   this.populate("bookings");
//   // this points to the current query
//   this.find({ active: { $ne: false } });
//   next();
// });

// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );
//     return JWTTimestamp < changedTimestamp;
//   }

//   // False means not changed
//   return false;
// };

// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(7).toString("hex").toLocaleUpperCase();

//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

// userSchema.methods.createEmailVarifyToken = function () {
//   const varifyToken = crypto.randomBytes(7).toString("hex").toLocaleUpperCase();

//   this.emailVarifyToken = varifyToken;
// };

// userSchema.methods.correctPhoneToken = function (token) {
//   if (token === this.phoneVarifyToken) {
//     this.isPhoneNumberVarified = true;
//     return true;
//   }
//   return false;
// };
// userSchema.methods.correctEmailToken = function (token) {
//   if (token === this.emailVarifyToken) {
//     this.isEmailVarified = true;
//     return true;
//   }
//   return false;
// };

// userSchema.methods.changePhoneToken = function (phoneToken) {
//   // console.log(phoneToken);
//   // console.log(this.phoneVarifyToken);
//   this.phoneVarifyToken = String(phoneToken);
//   // console.log(this.phoneVarifyToken);
//   return true;
// };

// const User = mongoose.model("User", userSchema);

// export default User;
