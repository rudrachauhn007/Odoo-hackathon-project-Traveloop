import express from "express";

import protect from "../middlewares/authMiddleware.js";

import {
    addExpense,
    getTripExpenses,
    deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/:tripId", protect, addExpense);
router.get("/:tripId", protect, getTripExpenses);
router.delete("/:expenseId", protect, deleteExpense);

export default router;
