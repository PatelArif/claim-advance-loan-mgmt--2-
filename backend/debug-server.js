// backend/debug-server.js
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// 🔹 Debug middleware: logs every request
app.use((req, res, next) => {
  console.log("📌 Incoming request:", req.method, req.url);
  next();
});

// 🔹 MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/loans-program")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

// 🔹 User model
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// 🔹 Seed admin route
app.get("/seed-admin", async (req, res) => {
  console.log("🌟 Seed admin route hit");
  try {
    const existing = await User.findOne({ email: "admin@example.com" });
    if (existing) return res.send("⚠️ Admin already exists");

    // For debug, skip bcrypt hashing first
    await User.create({ email: "admin@example.com", password: "123456" });
    console.log("🌟 Admin created");
    res.send("✅ Admin created: admin@example.com / 123456");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error seeding admin");
  }
});

// 🔹 Test route to see any request
app.use((req, res) => {
  console.log("🚨 Unknown route hit:", req.method, req.url);
  res.status(404).send("❌ Route not found");
});

// 🔹 Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Debug server running on http://localhost:${PORT}`)
);
