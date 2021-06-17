const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please State Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Provide Your Email"],
    unique: [true, "Email Used Before"],
    lowercase: true,
    // validate: ".لطفا ایمیل خود را به درستی وارد کنید",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "admin",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Your password must be more than 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    // validate: {
    //   // TODO: This only works on CREATE and SAVE!!!
    //   validator: function (el) {
    //     return el === this.password;
    //   },
    //   message: "Passwords are not the same!",
    // },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

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

const User = mongoose.model("User", userSchema);

exports.User = User;
