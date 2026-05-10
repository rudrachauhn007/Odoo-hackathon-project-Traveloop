import express from "express";

import protect from "../middlewares/authMiddleware.js";

import {
    addChecklistItem,
    getChecklist,
    toggleChecklistItem,
} from "../controllers/checklistController.js";

const router = express.Router();

router.post("/:tripId", protect, addChecklistItem);

router.get("/:tripId", protect, getChecklist);

router.patch("/toggle/:itemId", protect, toggleChecklistItem);

export default router;
