import express from "express";

import protect from "../middlewares/authMiddleware.js";

import { addNote, getTripNotes } from "../controllers/noteController.js";

const router = express.Router();

router.post("/:tripId", protect, addNote);

router.get("/:tripId", protect, getTripNotes);

export default router;
