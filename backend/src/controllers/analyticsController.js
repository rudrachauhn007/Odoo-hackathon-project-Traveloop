import prisma from "../config/prisma.js";

export const getTripBudgetAnalytics = async (req, res) => {
    try {
        const trip = await prisma.trip.findFirst({
            where: {
                id: req.params.tripId,
                userId: req.user.id,
            },

            include: {
                expenses: true,
            },
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        const totalSpent = trip.expenses.reduce(
            (sum, expense) => sum + expense.amount,
            0,
        );

        const remainingBudget = (trip.budget || 0) - totalSpent;

        const categoryBreakdown = {};

        trip.expenses.forEach((expense) => {
            if (!categoryBreakdown[expense.category]) {
                categoryBreakdown[expense.category] = 0;
            }

            categoryBreakdown[expense.category] += expense.amount;
        });

        const isOverBudget = remainingBudget < 0;

        res.status(200).json({
            success: true,

            analytics: {
                totalBudget: trip.budget || 0,

                totalSpent,

                remainingBudget,

                isOverBudget,

                categoryBreakdown,

                totalExpenses: trip.expenses.length,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getDashboardStats = async (req, res) => {
    try {
        const trips = await prisma.trip.findMany({
            where: {
                userId: req.user.id,
            },

            include: {
                expenses: true,

                stops: true,
            },
        });

        const totalTrips = trips.length;

        const upcomingTrips = trips.filter(
            (trip) => new Date(trip.startDate) > new Date(),
        ).length;

        const countries = new Set();

        trips.forEach((trip) => {
            trip.stops?.forEach((stop) => {
                if (stop.country) {
                    countries.add(stop.country);
                }
            });
        });

        const countriesVisited = countries.size;

        let totalSpent = 0;

        trips.forEach((trip) => {
            trip.expenses?.forEach((expense) => {
                totalSpent += expense.amount || 0;
            });
        });

        res.status(200).json({
            success: true,

            analytics: {
                totalTrips,

                upcomingTrips,

                countriesVisited,

                totalSpent,
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
