import prisma from "../config/prisma.js";

export const addActivity = async (req, res) => {
    try {
        const { title, description, category, cost, startTime } = req.body;

        const stop = await prisma.stop.findUnique({
            where: {
                id: req.params.stopId,
            },

            include: {
                trip: true,
            },
        });

        if (!stop || stop.trip.userId !== req.user.id) {
            return res.status(404).json({
                success: false,
                message: "Stop not found",
            });
        }

        const activity = await prisma.activity.create({
            data: {
                title,
                description,
                category,
                cost,
                startTime: startTime ? new Date(startTime) : null,
                stopId: stop.id,
            },
        });

        res.status(201).json({
            success: true,
            activity,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteActivity = async (req, res) => {
    try {
        const activity = await prisma.activity.findUnique({
            where: {
                id: req.params.activityId,
            },

            include: {
                stop: {
                    include: {
                        trip: true,
                    },
                },
            },
        });

        if (!activity || activity.stop.trip.userId !== req.user.id) {
            return res.status(404).json({
                success: false,
                message: "Activity not found",
            });
        }

        await prisma.activity.delete({
            where: {
                id: activity.id,
            },
        });

        res.status(200).json({
            success: true,
            message: "Activity deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
