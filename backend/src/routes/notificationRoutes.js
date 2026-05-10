import express from "express";

import protect from "../middlewares/authMiddleware.js";

import {
    getUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getUnreadNotificationCount,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protect, getUserNotifications);
router.get("/unread-count", protect, getUnreadNotificationCount);
router.patch("/read/:notificationId", protect, markNotificationAsRead);
router.patch("/read-all", protect, markAllNotificationsAsRead);

export default router;
