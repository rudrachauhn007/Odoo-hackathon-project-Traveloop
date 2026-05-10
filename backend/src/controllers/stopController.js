import prisma from "../config/prisma.js";

export const addStop = async (req, res) => {
    try {
        const { city, country, arrivalDate, departureDate, order } = req.body;

        const trip = await prisma.trip.findFirst({
            where: {
                id: req.params.tripId,
                userId: req.user.id,
            },
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        const stop = await prisma.stop.create({
            data: {
                city,
                country,
                arrivalDate: new Date(arrivalDate),
                departureDate: new Date(departureDate),
                order,
                tripId: trip.id,
            },
        });

        res.status(201).json({
            success: true,
            stop,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTripStops = async (req, res) => {
    try {
        const stops = await prisma.stop.findMany({
            where: {
                tripId: req.params.tripId,
            },

            include: {
                activities: true,
            },

            orderBy: {
                order: "asc",
            },
        });

        res.status(200).json({
            success: true,
            stops,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteStop = async (req, res) => {
    try {
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

        await prisma.stop.delete({
            where: {
                id: stop.id,
            },
        });

        res.status(200).json({
            success: true,
            message: "Stop deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
