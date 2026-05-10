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
        const totalTrips = await prisma.trip.count({
            where: {
                userId: req.user.id,
            },
        });

        const totalExpenses = await prisma.expense.findMany({
            where: {
                trip: {
                    userId: req.user.id,
                },
            },
        });

        const totalSpent = totalExpenses.reduce(
            (sum, expense) => sum + expense.amount,
            0,
        );

        const publicTrips = await prisma.trip.count({
            where: {
                userId: req.user.id,
                isPublic: true,
            },
        });

        res.status(200).json({
            success: true,

            stats: {
                totalTrips,

                totalSpent,

                publicTrips,

                totalExpenseEntries: totalExpenses.length,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
