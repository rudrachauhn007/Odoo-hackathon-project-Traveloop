import express from "express";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
    createTrip,
    getUserTrips,
    getTripById,
} from "../controllers/tripController.js";

const router = express.Router();

router.post("/", protect, upload.single("coverImage"), createTrip);
router.get("/", protect, getUserTrips);
router.get("/:id", protect, getTripById);

export default router;
