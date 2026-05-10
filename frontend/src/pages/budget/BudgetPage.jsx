import { useEffect, useState } from "react";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

function BudgetPage() {
    const [trips, setTrips] = useState([]);

    const [selectedTrip, setSelectedTrip] = useState("");

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [analytics, setAnalytics] = useState(null);

    const [expenses, setExpenses] = useState([]);

    const [expenseData, setExpenseData] = useState({
        title: "",
        amount: "",
        category: "Food",
    });

    useEffect(() => {
        fetchTrips();
    }, []);

    useEffect(() => {
        if (selectedTrip) {
            fetchBudgetData();
        }
    }, [selectedTrip]);

    const fetchTrips = async () => {
        try {
            const res = await api.get("/trips");

            setTrips(res.data.trips);

            if (res.data.trips.length > 0) {
                setSelectedTrip(res.data.trips[0].id);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);

            setLoading(false);
        }
    };

    const fetchBudgetData = async () => {
        try {
            setLoading(true);

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
            if (!expenseData.title || !expenseData.amount) return;

            setSaving(true);

            await api.post(`/expenses/${selectedTrip}`, {
                ...expenseData,

                amount: Number(expenseData.amount),
            });

            setExpenseData({
                title: "",
                amount: "",
                category: "Food",
            });

            fetchBudgetData();
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
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
            {/* HEADER */}
            <div className="mb-10">
                <h1 className="text-5xl font-bold text-slate-900 mb-3">
                    Budget Dashboard 💰
                </h1>

                <p className="text-slate-500 text-lg">
                    Track your expenses and stay within budget.
                </p>
            </div>

            {/* EMPTY TRIPS */}
            {trips.length === 0 ? (
                <div
                    className="
                        bg-white
                        border
                        border-slate-200
                        rounded-3xl
                        p-16
                        text-center
                    "
                >
                    <h2 className="text-3xl font-bold mb-4">No Trips Found</h2>

                    <p className="text-slate-500">
                        Create a trip first to start tracking expenses.
                    </p>
                </div>
            ) : (
                <>
                    {/* TRIP SELECT */}
                    <div className="mb-8">
                        <select
                            value={selectedTrip}
                            onChange={(e) => setSelectedTrip(e.target.value)}
                            className="
                                bg-white
                                border
                                border-slate-200
                                rounded-2xl
                                px-5
                                py-4
                                outline-none
                                focus:ring-2
                                focus:ring-emerald-400
                                min-w-[280px]
                            "
                        >
                            {trips.map((trip) => (
                                <option key={trip.id} value={trip.id}>
                                    {trip.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white border border-slate-200 rounded-3xl p-6">
                            <p className="text-slate-500 mb-2">Total Budget</p>

                            <h2 className="text-4xl font-bold text-emerald-600">
                                ₹{analytics?.totalBudget?.toLocaleString() || 0}
                            </h2>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-3xl p-6">
                            <p className="text-slate-500 mb-2">Total Spent</p>

                            <h2 className="text-4xl font-bold">
                                ₹{analytics?.totalSpent?.toLocaleString() || 0}
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
                                ₹
                                {analytics?.remainingBudget?.toLocaleString() ||
                                    0}
                            </h2>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-3xl p-6">
                            <p className="text-slate-500 mb-2">
                                Total Expenses
                            </p>

                            <h2 className="text-4xl font-bold">
                                {analytics?.totalExpenses || 0}
                            </h2>
                        </div>
                    </div>

                    {/* BREAKDOWN */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl p-8">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold">
                                    Expense Breakdown
                                </h2>

                                <p className="text-slate-500 mt-1">
                                    Category-wise spending overview
                                </p>
                            </div>

                            <div className="space-y-6">
                                {Object.entries(
                                    analytics?.categoryBreakdown || {},
                                ).length === 0 ? (
                                    <p className="text-slate-500">
                                        No expenses yet.
                                    </p>
                                ) : (
                                    Object.entries(
                                        analytics?.categoryBreakdown || {},
                                    ).map(([category, amount]) => (
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
                                                            analytics?.totalBudget >
                                                                0
                                                                ? (amount /
                                                                      analytics.totalBudget) *
                                                                      100
                                                                : 0,
                                                            100,
                                                        )}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* ALERTS */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-6">
                                Budget Alerts
                            </h2>

                            {analytics?.isOverBudget ? (
                                <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                                    <h3 className="font-semibold text-red-600 mb-2">
                                        Budget Exceeded
                                    </h3>

                                    <p className="text-sm text-slate-600">
                                        Your trip has exceeded the planned
                                        budget.
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
                                disabled={saving}
                                className="
                                    bg-emerald-500
                                    hover:bg-emerald-600
                                    disabled:bg-emerald-300
                                    text-white
                                    rounded-2xl
                                    font-semibold
                                    transition
                                "
                            >
                                {saving ? "Adding..." : "Add Expense"}
                            </button>
                        </div>
                    </div>

                    {/* RECENT */}
                    <div className="mt-10 bg-white border border-slate-200 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-8">
                            Recent Expenses
                        </h2>

                        <div className="space-y-4">
                            {expenses.length === 0 ? (
                                <p className="text-slate-500">
                                    No expenses added yet.
                                </p>
                            ) : (
                                expenses.map((expense) => (
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
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </MainLayout>
    );
}

export default BudgetPage;
