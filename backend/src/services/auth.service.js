import User from "../models/User.js";
import logger from "../loaders/logger.js";

export const login = async (email, password, res) => {
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const user = await User.findOne({ email }).populate(
      "roleId",
      "name permissions"
    );
    if (!user)
      return res.status(400).json({ success: false, error: "User not found" });
    if (!user.active)
      return res
        .status(400)
        .json({ success: false, error: "User is deactivated" });

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
      return res.status(400).json({ success: false, error: "Wrong password" });

    const token = user.generateJWTtoken();
    user.updateLoginDate();
    await user.save();

    res.cookie("token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    logger.error(`AuthService -> login -> error: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const logout = (res) => {
  res
    .cookie("token", "", { expires: new Date(0), httpOnly: true })
    .status(200)
    .json({
      success: true,
      message: "Logout successful",
    });
};
