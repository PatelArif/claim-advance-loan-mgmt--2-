import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  lastLogin: { type: Date },
});

// Password comparison
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// Generate JWT token
userSchema.methods.generateJWTtoken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Update last login
userSchema.methods.updateLoginDate = function () {
  this.lastLogin = new Date();
};

export default mongoose.model("User", userSchema);
