import prisma from "../config/prisma.js";

export const addExpense = async (req, res) => {
    try {
        const { title, amount, category, spentAt } = req.body;

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

        const expense = await prisma.expense.create({
            data: {
                title,

                amount: parseFloat(amount),

                category,

                spentAt: spentAt ? new Date(spentAt) : new Date(),

                tripId: trip.id,
            },
        });

        res.status(201).json({
            success: true,
            expense,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTripExpenses = async (req, res) => {
    try {
        const expenses = await prisma.expense.findMany({
            where: {
                tripId: req.params.tripId,
            },

            orderBy: {
                spentAt: "desc",
            },
        });

        res.status(200).json({
            success: true,
            expenses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const expense = await prisma.expense.findUnique({
            where: {
                id: req.params.expenseId,
            },

            include: {
                trip: true,
            },
        });

        if (!expense || expense.trip.userId !== req.user.id) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        await prisma.expense.delete({
            where: {
                id: expense.id,
            },
        });

        res.status(200).json({
            success: true,
            message: "Expense deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
