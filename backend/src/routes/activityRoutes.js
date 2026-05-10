import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import protect from "../middlewares/authMiddleware.js";

import {
    addActivity,
    deleteActivity,
} from "../controllers/activityController.js";

const router = express.Router();

router.post("/:stopId", protect, addActivity);

router.delete("/:activityId", protect, deleteActivity);

export default router;
