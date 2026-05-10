import express from "express";

import protect from "../middlewares/authMiddleware.js";

import {
    addStop,
    getTripStops,
    deleteStop,
} from "../controllers/stopController.js";

const router = express.Router();

router.post("/:tripId", protect, addStop);

router.get("/:tripId", protect, getTripStops);

router.delete("/delete/:stopId", protect, deleteStop);

export default router;
