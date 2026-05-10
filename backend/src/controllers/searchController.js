import prisma from "../config/prisma.js";

export const searchCities = async (req, res) => {
    try {
        const query = req.query.q || "";

        const stops = await prisma.stop.findMany({
            where: {
                city: {
                    contains: query,
                    mode: "insensitive",
                },
            },

            select: {
                city: true,
                country: true,
            },

            distinct: ["city"],
        });

        res.status(200).json({
            success: true,
            cities: stops,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const searchActivities = async (req, res) => {
    try {
        const query = req.query.q || "";

        const activities = await prisma.activity.findMany({
            where: {
                title: {
                    contains: query,
                    mode: "insensitive",
                },
            },

            select: {
                id: true,
                title: true,
                category: true,
                cost: true,
            },
        });

        res.status(200).json({
            success: true,
            activities,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const searchPublicTrips = async (req, res) => {
    try {
        const query = req.query.q || "";

        const trips = await prisma.trip.findMany({
            where: {
                isPublic: true,

                OR: [
                    {
                        title: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },

                    {
                        description: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ],
            },

            include: {
                user: {
                    select: {
                        fullName: true,
                        profileImage: true,
                    },
                },
            },

            orderBy: {
                likesCount: "desc",
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

export const getTrendingDestinations = async (req, res) => {
    try {
        const trending = await prisma.stop.groupBy({
            by: ["city"],

            _count: {
                city: true,
            },

            orderBy: {
                _count: {
                    city: "desc",
                },
            },

            take: 10,
        });

        res.status(200).json({
            success: true,
            destinations: trending,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getPopularActivities = async (req, res) => {
    try {
        const activities = await prisma.activity.groupBy({
            by: ["title"],

            _count: {
                title: true,
            },

            orderBy: {
                _count: {
                    title: "desc",
                },
            },

            take: 10,
        });

        res.status(200).json({
            success: true,
            activities,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
