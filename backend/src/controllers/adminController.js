import prisma from "../config/prisma.js";

export const getAdminDashboard = async (req, res) => {
    try {
        // TOTAL STATS
        const totalUsers = await prisma.user.count();
        const totalTrips = await prisma.trip.count();
        const publicTrips = await prisma.trip.count({
            where: {
                isPublic: true,
            },
        });

        const totalExpenses = await prisma.expense.count();

        // RECENT USERS
        const recentUsers = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },

            take: 5,

            select: {
                id: true,
                fullName: true,
                email: true,
                profileImage: true,
                role: true,
                createdAt: true,
            },
        });

        // POPULAR TRIPS
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

        // DESTINATION DISTRIBUTION
        const stops = await prisma.stop.findMany({
            select: {
                city: true,
            },
        });

        const destinationMap = {};

        stops.forEach((stop) => {
            const city = stop.city || "Unknown";
            if (!destinationMap[city]) {
                destinationMap[city] = 0;
            }
            destinationMap[city] += 1;
        });

        const destinationDistribution = Object.entries(destinationMap).map(
            ([name, value]) => ({
                name,
                value,
            }),
        );

        // PLATFORM GROWTH
        const users = await prisma.user.findMany({
            select: {
                createdAt: true,
            },
        });

        const trips = await prisma.trip.findMany({
            select: {
                createdAt: true,
            },
        });

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const growthMap = {};

        months.forEach((month) => {
            growthMap[month] = {
                month,
                users: 0,
                trips: 0,
            };
        });

        // USER GROWTH
        users.forEach((user) => {
            const month = months[new Date(user.createdAt).getMonth()];

            growthMap[month].users += 1;
        });

        // TRIP GROWTH
        trips.forEach((trip) => {
            const month = months[new Date(trip.createdAt).getMonth()];

            growthMap[month].trips += 1;
        });

        const platformGrowth = Object.values(growthMap);
        // PUBLIC VS PRIVATE
        const tripComparison = [
            {
                label: "Public",
                value: publicTrips,
            },

            {
                label: "Private",
                value: totalTrips - publicTrips,
            },
        ];

        res.status(200).json({
            success: true,

            analytics: {
                totalUsers,
                totalTrips,
                publicTrips,
                totalExpenses,
                recentUsers,
                popularTrips,
                destinationDistribution,
                platformGrowth,
                tripComparison,
            },
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteTripByAdmin = async (req, res) => {
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
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
