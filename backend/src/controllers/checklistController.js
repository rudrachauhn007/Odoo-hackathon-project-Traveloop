import prisma from "../config/prisma.js";

export const addChecklistItem = async (req, res) => {
    try {
     const { title } = req.body;

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

        const item = await prisma.checklistItem.create({
            data: {
                label: title,
                tripId: trip.id,
            },
        });

        res.status(201).json({
            success: true,
            item,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getChecklist = async (req, res) => {
    try {
        const items = await prisma.checklistItem.findMany({
            where: {
                tripId: req.params.tripId,
            },
        });

        res.status(200).json({
            success: true,
            items,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const toggleChecklistItem = async (req, res) => {
    try {
        const item = await prisma.checklistItem.findUnique({
            where: {
                id: req.params.itemId,
            },

            include: {
                trip: true,
            },
        });

        if (!item || item.trip.userId !== req.user.id) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        const updatedItem = await prisma.checklistItem.update({
            where: {
                id: item.id,
            },

            data: {
                checked: !item.checked,
            },
        });

        res.status(200).json({
            success: true,
            item: updatedItem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
