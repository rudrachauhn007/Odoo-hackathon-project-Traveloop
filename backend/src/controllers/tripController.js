import prisma from "../config/prisma.js";

import cloudinary from "../config/cloudinary.js";

export const createTrip = async (req, res) => {
    try {
        const { title, description, startDate, endDate, budget } = req.body;

        let coverImage = null;

        // Upload image if provided
        if (req.file) {
            const base64 = req.file.buffer.toString("base64");

            const dataURI = `data:${req.file.mimetype};base64,${base64}`;

            const uploadResult = await cloudinary.uploader.upload(dataURI, {
                folder: "traveloop/trips",
            });

            coverImage = uploadResult.secure_url;
        }

        const trip = await prisma.trip.create({
            data: {
                title,

                description,

                coverImage,

                startDate: startDate ? new Date(startDate) : null,

                endDate: endDate ? new Date(endDate) : null,

                budget: budget ? parseFloat(budget) : null,

                userId: req.user.id,
            },
        });

        res.status(201).json({
            success: true,
            message: "Trip created successfully",
            trip,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUserTrips = async (req, res) => {
    try {
        const trips = await prisma.trip.findMany({
            where: {
                userId: req.user.id,
            },

            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json({
            success: true,
            trips,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTripById = async (req, res) => {
    try {
        const trip = await prisma.trip.findFirst({
            where: {
                id: req.params.id,

                userId: req.user.id,
            },

            include: {
                stops: {
                    include: {
                        activities: true,
                    },
                },

                notes: true,

                checklist: true,
            },
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        res.status(200).json({
            success: true,
            trip,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
