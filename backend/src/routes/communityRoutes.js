import express from "express";

import protect from "../middlewares/authMiddleware.js";

import {
    getCommunityFeed,
    getPublicTripById,
    toggleTripVisibility,
    toggleLikeTrip,
    copyPublicTrip,
} from "../controllers/communityController.js";

const router = express.Router();

router.get("/", getCommunityFeed);
router.get("/trip/:tripId", getPublicTripById);
router.patch("/visibility/:tripId", protect, toggleTripVisibility);
router.post("/like/:tripId", protect, toggleLikeTrip);
router.post("/copy/:tripId", protect, copyPublicTrip);

export default router;
