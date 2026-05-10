import express from "express";

import protect from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminMiddleware.js";

import {
    getAdminDashboard,
    deleteTripAsAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protect, adminOnly, getAdminDashboard);
router.delete("/trip/:tripId", protect, adminOnly, deleteTripAsAdmin);

export default router;
