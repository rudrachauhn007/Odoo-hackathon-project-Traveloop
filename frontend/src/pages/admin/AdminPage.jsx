import { useEffect, useState } from "react";

import MainLayout from "../../layout/MainLayout";
import api from "../../lib/axios";
import useAuthStore from "../../store/authStore";

import {
    BarChart3,
    Users,
    MapPinned,
    Globe,
    Wallet,
    Trash2,
} from "lucide-react";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip as RechartsTooltip,
    Legend,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";

function AdminPage() {
    const user = useAuthStore((state) => state.user);

    const [loading, setLoading] = useState(true);

    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        fetchAdminDashboard();
    }, []);

    const fetchAdminDashboard = async () => {
        try {
            const res = await api.get("/admin/dashboard");

            setAnalytics(res.data.analytics);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTrip = async (tripId) => {
        try {
            const confirmDelete = window.confirm(
                "Delete this trip permanently?",
            );

            if (!confirmDelete) return;

            await api.delete(`/admin/trip/${tripId}`);

            fetchAdminDashboard();
        } catch (error) {
            console.log(error);
        }
    };

    // ACCESS CONTROL
    if (user && user.role !== "admin") {
        return (
            <MainLayout>
                <div
                    className="
                        bg-white
                        border
                        border-red-200
                        rounded-3xl
                        p-16
                        text-center
                    "
                >
                    <h1 className="text-4xl font-bold text-red-500 mb-4">
                        Access Denied
                    </h1>

                    <p className="text-slate-500 text-lg">
                        You do not have admin permissions.
                    </p>
                </div>
            </MainLayout>
        );
    }

    if (loading) {
        return (
            <MainLayout>
                <div className="py-20 text-center">
                    <p className="text-slate-500 text-lg">
                        Loading admin dashboard...
                    </p>
                </div>
            </MainLayout>
        );
    }

    const stats = [
        {
            title: "Total Users",
            value: analytics?.totalUsers || 0,
            icon: Users,
        },

        {
            title: "Trips Created",
            value: analytics?.totalTrips || 0,
            icon: MapPinned,
        },

        {
            title: "Public Trips",
            value: analytics?.publicTrips || 0,
            icon: Globe,
        },

        {
            title: "Expenses",
            value: analytics?.totalExpenses || 0,
            icon: Wallet,
        },
    ];

    const chartData = [
        {
            label: "Users",
            value: analytics?.totalUsers || 0,
        },

        {
            label: "Trips",
            value: analytics?.totalTrips || 0,
        },

        {
            label: "Public Trips",
            value: analytics?.publicTrips || 0,
        },

        {
            label: "Activities",
            value: analytics?.totalActivities || 0,
        },

        {
            label: "Expenses",
            value: analytics?.totalExpenses || 0,
        },
    ];

    const maxValue = Math.max(...chartData.map((item) => item.value), 1);

    const COLORS = ["#10b981", "#14b8a6", "#0f172a", "#64748b", "#22c55e"];

    const destinationPieData = analytics?.destinationDistribution || [];

    const activityCostData = analytics?.dailyExpenses || [];

    return (
        <MainLayout>
            {/* HEADER */}
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">Admin Dashboard 📊</h1>

                <p className="text-slate-500 text-lg">
                    Monitor platform analytics and user activity.
                </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="
                                bg-white
                                border
                                border-slate-200
                                rounded-3xl
                                p-6
                            "
                        >
                            <div className="flex items-center justify-between mb-5">
                                <div
                                    className="
                                        h-14
                                        w-14
                                        rounded-2xl
                                        bg-emerald-100
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <Icon className="text-emerald-600" />
                                </div>
                            </div>

                            <p className="text-slate-500 mb-2">{item.title}</p>

                            <h2 className="text-4xl font-bold text-slate-900">
                                {item.value}
                            </h2>
                        </div>
                    );
                })}
            </div>

            {/* ANALYTICS BAR */}
            <div
                className="
                    bg-white
                    border
                    border-slate-200
                    rounded-3xl
                    p-8
                    mb-10
                "
            >
                <div className="flex items-center gap-4 mb-10">
                    <div
                        className="
                            h-14
                            w-14
                            rounded-2xl
                            bg-emerald-100
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <BarChart3 className="text-emerald-600" />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold">
                            Platform Analytics
                        </h2>

                        <p className="text-slate-500">
                            Overview of platform growth and engagement.
                        </p>
                    </div>
                </div>

                <div className="space-y-7">
                    {chartData.map((item) => {
                        const width = (item.value / maxValue) * 100;

                        return (
                            <div key={item.label}>
                                <div className="flex items-center justify-between mb-3">
                                    <p className="font-semibold text-slate-700">
                                        {item.label}
                                    </p>

                                    <p className="text-slate-500 font-medium">
                                        {item.value}
                                    </p>
                                </div>

                                <div className="h-5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="
                                                h-full
                                                bg-gradient-to-r
                                                from-emerald-500
                                                to-teal-500
                                                rounded-full
                                                transition-all
                                                duration-700
                                            "
                                        style={{
                                            width: `${width}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* USERS + POPULAR */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
                {/* USERS */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-8">Recent Users</h2>

                    <div className="space-y-5">
                        {analytics?.recentUsers?.length === 0 ? (
                            <p className="text-slate-500">No users found.</p>
                        ) : (
                            analytics?.recentUsers?.map((user) => (
                                <div
                                    key={user.id}
                                    className="
                                            flex
                                            items-center
                                            gap-4
                                            border
                                            border-slate-200
                                            rounded-2xl
                                            p-4
                                        "
                                >
                                    <img
                                        src={
                                            user.profileImage ||
                                            "https://i.pravatar.cc/150"
                                        }
                                        alt="user"
                                        className="
                                                h-14
                                                w-14
                                                rounded-full
                                                object-cover
                                            "
                                    />

                                    <div>
                                        <h3 className="font-semibold">
                                            {user.fullName}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* POPULAR TRIPS */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-8">Popular Trips</h2>

                    <div className="space-y-5">
                        {analytics?.popularTrips?.length === 0 ? (
                            <p className="text-slate-500">No trips found.</p>
                        ) : (
                            analytics?.popularTrips?.map((trip) => (
                                <div
                                    key={trip.id}
                                    className="
                                            border
                                            border-slate-200
                                            rounded-2xl
                                            p-5
                                        "
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {trip.title}
                                            </h3>

                                            <p className="text-sm text-slate-500 mt-1">
                                                By {trip.user?.fullName}
                                            </p>

                                            <p className="text-emerald-600 font-medium mt-2">
                                                ❤️ {trip.likesCount} Likes
                                            </p>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleDeleteTrip(trip.id)
                                            }
                                            className="
                                                    bg-red-500
                                                    hover:bg-red-600
                                                    text-white
                                                    p-3
                                                    rounded-xl
                                                    transition
                                                "
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* RECENT TRIPS */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-10">
                <h2 className="text-2xl font-bold mb-8">Recent Trips</h2>

                <div className="space-y-5">
                    {analytics?.recentTrips?.length === 0 ? (
                        <p className="text-slate-500">No recent trips.</p>
                    ) : (
                        analytics?.recentTrips?.map((trip) => (
                            <div
                                key={trip.id}
                                className="
                                        flex
                                        items-center
                                        justify-between
                                        border
                                        border-slate-200
                                        rounded-2xl
                                        p-5
                                    "
                            >
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {trip.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Created by {trip.user?.fullName}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm text-slate-400">
                                        {new Date(
                                            trip.createdAt,
                                        ).toLocaleDateString()}
                                    </p>

                                    <p className="text-emerald-600 font-medium mt-1">
                                        {trip.isPublic ? "Public" : "Private"}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* PIE */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">
                        Destination Distribution
                    </h2>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={destinationPieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {destinationPieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>

                                <RechartsTooltip />

                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* LINE */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">
                        Daily Activity Expenses
                    </h2>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activityCostData}>
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="day" />

                                <YAxis />

                                <RechartsTooltip />

                                <Legend />

                                <Line
                                    type="monotone"
                                    dataKey="cost"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default AdminPage;
