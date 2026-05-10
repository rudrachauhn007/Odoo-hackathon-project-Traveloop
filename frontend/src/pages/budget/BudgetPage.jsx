import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

function BudgetPage() {
    const [selectedTrip, setSelectedTrip] = useState("");

    const [loading, setLoading] = useState(true);

    const [analytics, setAnalytics] = useState(null);

    const [expenses, setExpenses] = useState([]);

    const [expenseData, setExpenseData] = useState({
        title: "",
        amount: "",
        category: "Food",
    });

    useEffect(() => {
        fetchBudgetData();
    }, [selectedTrip]);

    const fetchBudgetData = async () => {
        try {
            const [analyticsRes, expensesRes] = await Promise.all([
                api.get(`/analytics/trip/${selectedTrip}`),

                api.get(`/expenses/${selectedTrip}`),
            ]);

            setAnalytics(analyticsRes.data.analytics);

            setExpenses(expensesRes.data.expenses);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setExpenseData({
            ...expenseData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddExpense = async () => {
        try {
            await api.post(`/expenses/${selectedTrip}`, expenseData);

            setExpenseData({
                title: "",
                amount: "",
                category: "Food",
            });

            fetchBudgetData();
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="py-20 text-center text-slate-500 text-lg">
                    Loading budget dashboard...
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="mb-10">
                <h1 className="text-5xl font-bold text-slate-900 mb-3">
                    Budget Dashboard 💰
                </h1>

                <p className="text-slate-500 text-lg">
                    Track your expenses and stay within budget.
                </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white border border-slate-200 rounded-3xl p-6">
                    <p className="text-slate-500 mb-2">Total Budget</p>

                    <h2 className="text-4xl font-bold text-emerald-600">
                        ₹{analytics?.totalBudget?.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6">
                    <p className="text-slate-500 mb-2">Total Spent</p>

                    <h2 className="text-4xl font-bold">
                        ₹{analytics?.totalSpent?.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6">
                    <p className="text-slate-500 mb-2">Remaining</p>

                    <h2
                        className={`text-4xl font-bold ${
                            analytics?.remainingBudget < 0
                                ? "text-red-500"
                                : "text-emerald-600"
                        }`}
                    >
                        ₹{analytics?.remainingBudget?.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6">
                    <p className="text-slate-500 mb-2">Total Expenses</p>

                    <h2 className="text-4xl font-bold">
                        {analytics?.totalExpenses}
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* BREAKDOWN */}
                <div className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Expense Breakdown
                            </h2>

                            <p className="text-slate-500 mt-1">
                                Category-wise spending overview
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {Object.entries(analytics?.categoryBreakdown || {}).map(
                            ([category, amount]) => (
                                <div key={category}>
                                    <div className="flex justify-between mb-2">
                                        <p className="font-medium text-slate-700">
                                            {category}
                                        </p>

                                        <p className="text-slate-500">
                                            ₹{amount.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full"
                                            style={{
                                                width: `${Math.min(
                                                    (amount /
                                                        analytics.totalBudget) *
                                                        100,
                                                    100,
                                                )}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </div>

                {/* ALERTS */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Budget Alerts</h2>

                    <div className="space-y-5">
                        {analytics?.isOverBudget ? (
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                                <h3 className="font-semibold text-red-600 mb-2">
                                    Budget Exceeded
                                </h3>

                                <p className="text-sm text-slate-600">
                                    Your trip has exceeded the planned budget.
                                </p>
                            </div>
                        ) : (
                            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                                <h3 className="font-semibold text-emerald-700 mb-2">
                                    Good Progress
                                </h3>

                                <p className="text-sm text-slate-600">
                                    Your spending is within planned limits.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ADD EXPENSE */}
            <div className="mt-10 bg-white border border-slate-200 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-8">Add Expense</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        name="title"
                        value={expenseData.title}
                        onChange={handleChange}
                        placeholder="Expense title"
                        className="
                            border
                            border-slate-200
                            rounded-2xl
                            px-5
                            py-4
                            outline-none
                            focus:ring-2
                            focus:ring-emerald-400
                        "
                    />

                    <input
                        type="number"
                        name="amount"
                        value={expenseData.amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        className="
                            border
                            border-slate-200
                            rounded-2xl
                            px-5
                            py-4
                            outline-none
                            focus:ring-2
                            focus:ring-emerald-400
                        "
                    />

                    <select
                        name="category"
                        value={expenseData.category}
                        onChange={handleChange}
                        className="
                            border
                            border-slate-200
                            rounded-2xl
                            px-5
                            py-4
                            outline-none
                            focus:ring-2
                            focus:ring-emerald-400
                        "
                    >
                        <option>Food</option>

                        <option>Flights</option>

                        <option>Hotels</option>

                        <option>Activities</option>

                        <option>Transport</option>
                    </select>

                    <button
                        onClick={handleAddExpense}
                        className="
                            bg-emerald-500
                            hover:bg-emerald-600
                            text-white
                            rounded-2xl
                            font-semibold
                            transition
                        "
                    >
                        Add Expense
                    </button>
                </div>
            </div>

            {/* RECENT EXPENSES */}
            <div className="mt-10 bg-white border border-slate-200 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-8">Recent Expenses</h2>

                <div className="space-y-4">
                    {expenses.map((expense) => (
                        <div
                            key={expense.id}
                            className="
                                border
                                border-slate-200
                                rounded-2xl
                                p-5
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <div>
                                <h3 className="font-semibold text-lg">
                                    {expense.title}
                                </h3>

                                <p className="text-slate-500 text-sm">
                                    {expense.category}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="font-bold text-lg">
                                    ₹{expense.amount}
                                </p>

                                <p className="text-sm text-slate-500">
                                    {new Date(
                                        expense.spentAt,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

export default BudgetPage;
