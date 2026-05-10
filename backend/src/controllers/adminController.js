import prisma from "../config/prisma.js";

export const getAdminDashboard = async (req, res) => {
    try {
        const totalUsers = await prisma.user.count();
        const totalTrips = await prisma.trip.count();
        const publicTrips = await prisma.trip.count({
            where: {
                isPublic: true,
            },
        });

        const totalActivities = await prisma.activity.count()
        const totalExpenses = await prisma.expense.count();
        const recentUsers = await prisma.user.findMany({
            take: 5,

            orderBy: {
                createdAt: "desc",
            },

            select: {
                id: true,
                fullName: true,
                email: true,
                profileImage: true,
                createdAt: true,
            },
        });

        const recentTrips = await prisma.trip.findMany({
            take: 5,

            orderBy: {
                createdAt: "desc",
            },

            include: {
                user: {
                    select: {
                        fullName: true,
                    },
                },
            },
        });

        const popularTrips = await prisma.trip.findMany({
            where: {
                isPublic: true,
            },

            orderBy: {
                likesCount: "desc",
            },

            take: 5,

            include: {
                user: {
                    select: {
                        fullName: true,
                    },
                },
            },
        });

        res.status(200).json({
            success: true,

            analytics: {
                totalUsers,

                totalTrips,

                publicTrips,

                totalActivities,

                totalExpenses,

                recentUsers,

                recentTrips,

                popularTrips,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteTripAsAdmin = async (req, res) => {
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

        await prisma.trip.delete({
            where: {
                id: trip.id,
            },
        });

        res.status(200).json({
            success: true,
            message: "Trip deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
