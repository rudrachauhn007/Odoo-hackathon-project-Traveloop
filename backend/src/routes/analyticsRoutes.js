import express from "express";

import protect from "../middlewares/authMiddleware.js";

import {
    getTripBudgetAnalytics,
    getDashboardStats,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/trip/:tripId", protect, getTripBudgetAnalytics);
router.get("/dashboard", protect, getDashboardStats);

export default router;
