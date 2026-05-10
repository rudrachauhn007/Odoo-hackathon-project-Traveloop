import prisma from "../config/prisma.js";

export const getCommunityFeed = async (req, res) => {
    try {
        const trips = await prisma.trip.findMany({
            where: {
                isPublic: true,
            },

            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        profileImage: true,
                    },
                },
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

export const getPublicTripById = async (req, res) => {
    try {
        const trip = await prisma.trip.findFirst({
            where: {
                id: req.params.tripId,
                isPublic: true,
            },

            include: {
                user: {
                    select: {
                        fullName: true,
                        profileImage: true,
                    },
                },

                stops: {
                    include: {
                        activities: true,
                    },
                },
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

export const toggleTripVisibility = async (req, res) => {
    try {
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

        const updatedTrip = await prisma.trip.update({
            where: {
                id: trip.id,
            },

            data: {
                isPublic: !trip.isPublic,
            },
        });

        res.status(200).json({
            success: true,
            trip: updatedTrip,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const copyPublicTrip = async (req, res) => {
    try {
        const originalTrip = await prisma.trip.findFirst({
            where: {
                id: req.params.tripId,
                isPublic: true,
            },

            include: {
                stops: {
                    include: {
                        activities: true,
                    },
                },
            },
        });

        if (!originalTrip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        const copiedTrip = await prisma.trip.create({
            data: {
                title: originalTrip.title + " (Copy)",

                description: originalTrip.description,

                coverImage: originalTrip.coverImage,

                startDate: originalTrip.startDate,

                endDate: originalTrip.endDate,

                budget: originalTrip.budget,

                userId: req.user.id,

                stops: {
                    create: originalTrip.stops.map((stop) => ({
                        city: stop.city,

                        country: stop.country,

                        arrivalDate: stop.arrivalDate,

                        departureDate: stop.departureDate,

                        order: stop.order,

                        activities: {
                            create: stop.activities.map((activity) => ({
                                title: activity.title,

                                description: activity.description,

                                category: activity.category,

                                cost: activity.cost,

                                startTime: activity.startTime,
                            })),
                        },
                    })),
                },
            },
        });

        res.status(201).json({
            success: true,
            trip: copiedTrip,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const toggleLikeTrip = async (req, res) => {
    try {
        const trip = await prisma.trip.findUnique({
            where: {
                id: req.params.tripId,
            },
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        // OPTIONAL:
        // prevent self-like
        // if (trip.userId === req.user.id)

        const existingLike = await prisma.tripLike.findFirst({
            where: {
                tripId: trip.id,

                userId: req.user.id,
            },
        });

        if (existingLike) {
            // UNLIKE
            await prisma.tripLike.delete({
                where: {
                    id: existingLike.id,
                },
            });

            await prisma.trip.update({
                where: {
                    id: trip.id,
                },

                data: {
                    likesCount: {
                        decrement: 1,
                    },
                },
            });

            return res.json({
                success: true,
                liked: false,
            });
        }

        // LIKE
        await prisma.tripLike.create({
            data: {
                tripId: trip.id,

                userId: req.user.id,
            },
        });

        await prisma.trip.update({
            where: {
                id: trip.id,
            },

            data: {
                likesCount: {
                    increment: 1,
                },
            },
        });

        res.json({
            success: true,
            liked: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};