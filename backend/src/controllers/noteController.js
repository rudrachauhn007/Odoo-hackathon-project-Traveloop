import prisma from "../config/prisma.js";

export const addNote = async (req, res) => {
    try {
        const { content } = req.body;

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

        const note = await prisma.note.create({
            data: {
                content,
                tripId: trip.id,
            },
        });

        res.status(201).json({
            success: true,
            note,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTripNotes = async (req, res) => {
    try {
        const notes = await prisma.note.findMany({
            where: {
                tripId: req.params.tripId,
            },

            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json({
            success: true,
            notes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
