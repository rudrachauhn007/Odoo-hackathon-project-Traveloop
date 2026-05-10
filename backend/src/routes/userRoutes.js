import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
    getCurrentUser,
    updateProfile,
} from "../controllers/userController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/me", protect, getCurrentUser);
router.put("/profile", protect, upload.single("profileImage"), updateProfile);

export default router;
