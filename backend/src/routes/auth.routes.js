import express from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/dashboard", isAuthenticated, getDashboardData);

export default router;
