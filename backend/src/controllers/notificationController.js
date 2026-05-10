import prisma from "../config/prisma.js";

export const getUserNotifications = async (req, res) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: {
                userId: req.user.id,
            },

            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json({
            success: true,
            notifications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const markNotificationAsRead = async (req, res) => {
    try {
        const notification = await prisma.notification.findFirst({
            where: {
                id: req.params.notificationId,
                userId: req.user.id,
            },
        });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        const updatedNotification = await prisma.notification.update({
            where: {
                id: notification.id,
            },

            data: {
                isRead: true,
            },
        });

        res.status(200).json({
            success: true,
            notification: updatedNotification,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const markAllNotificationsAsRead = async (req, res) => {
    try {
        await prisma.notification.updateMany({
            where: {
                userId: req.user.id,
                isRead: false,
            },

            data: {
                isRead: true,
            },
        });

        res.status(200).json({
            success: true,
            message: "All notifications marked as read",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUnreadNotificationCount = async (req, res) => {
    try {
        const count = await prisma.notification.count({
            where: {
                userId: req.user.id,
                isRead: false,
            },
        });

        res.status(200).json({
            success: true,
            unreadCount: count,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
