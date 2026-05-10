import { useEffect, useState } from "react";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

import useAuthStore from "../../store/authStore";

import {
    Users,
    Globe,
    Wallet,
    TrendingUp,
    Trash2,
    ShieldCheck,
    Plane,
} from "lucide-react";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    CartesianGrid,
    XAxis,
    YAxis,
    BarChart,
    Bar,
    Legend,
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

    if (user && user.role !== "admin") {
        return (
            <MainLayout>
                <div className="bg-white border border-red-200 rounded-3xl p-16 text-center">
                    <ShieldCheck
                        className="mx-auto mb-6 text-red-500"
                        size={70}
                    />

                    <h1 className="text-4xl font-bold text-red-500 mb-4">
                        Access Denied
                    </h1>

                    <p className="text-slate-500 text-lg">
                        You do not have permission to access the admin
                        dashboard.
                    </p>
                </div>
            </MainLayout>
        );
    }

    if (loading || !analytics) {
        return (
            <MainLayout>
                <div className="py-24 text-center">
                    <p className="text-slate-500 text-xl">
                        Loading analytics...
                    </p>
                </div>
            </MainLayout>
        );
    }

    const stats = [
        {
            title: "Users",
            value: analytics.totalUsers,
            growth: "+12%",
            icon: Users,
        },

        {
            title: "Trips",
            value: analytics.totalTrips,
            growth: "+18%",
            icon: Plane,
        },

        {
            title: "Public Trips",
            value: analytics.publicTrips,
            growth: "+9%",
            icon: Globe,
        },

        {
            title: "Expenses",
            value: analytics.totalExpenses,
            growth: "+22%",
            icon: Wallet,
        },
    ];

    const COLORS = ["#10b981", "#14b8a6", "#0f172a", "#22c55e", "#64748b"];

    return (
        <MainLayout>
            {/* HEADER */}
            <div className="mb-12">
                <div className="flex items-center justify-between flex-wrap gap-6">
                    <div>
                        <h1 className="text-5xl font-bold mb-3">
                            Admin Dashboard 
                        </h1>

                        <p className="text-slate-500 text-lg">
                            Monitor platform growth and travel analytics.
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl px-6 py-5 shadow-sm">
                        <p className="text-slate-500 mb-2">Platform Status</p>

                        <h2 className="text-2xl font-bold text-emerald-600">
                            Growing Steadily 
                        </h2>
                    </div>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="h-16 w-16 rounded-3xl bg-emerald-100 flex items-center justify-center">
                                    <Icon className="text-emerald-600" />
                                </div>

                                <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                                    <TrendingUp size={18} />

                                    {item.growth}
                                </div>
                            </div>

                            <p className="text-slate-500 mb-2">{item.title}</p>

                            <h2 className="text-5xl font-bold text-slate-900">
                                {item.value}
                            </h2>
                        </div>
                    );
                })}
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
                {/* AREA */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-2">Platform Growth</h2>

                    <p className="text-slate-500 mb-8">
                        Real monthly platform growth.
                    </p>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analytics.platformGrowth}>
                                <defs>
                                    <linearGradient
                                        id="usersGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#10b981"
                                            stopOpacity={0.8}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#10b981"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="month" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#10b981"
                                    fillOpacity={1}
                                    fill="url(#usersGradient)"
                                />

                                <Area
                                    type="monotone"
                                    dataKey="trips"
                                    stroke="#0f172a"
                                    fillOpacity={0.2}
                                    fill="#cbd5e1"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* PIE */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-2">
                        Popular Destinations
                    </h2>

                    <p className="text-slate-500 mb-8">
                        Most explored travel destinations.
                    </p>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={analytics.destinationDistribution}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={4}
                                >
                                    {analytics.destinationDistribution.map(
                                        (entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ),
                                    )}
                                </Pie>

                                <Tooltip />

                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* BAR */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-12">
                <h2 className="text-2xl font-bold mb-2">
                    Public vs Private Trips
                </h2>

                <p className="text-slate-500 mb-8">
                    Compare platform visibility distribution.
                </p>

                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analytics.tripComparison}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="label" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="value"
                                fill="#10b981"
                                radius={[12, 12, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* USERS + TRIPS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* USERS */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-8">Recent Users</h2>

                    <div className="space-y-5">
                        {analytics.recentUsers.map((recentUser) => (
                            <div
                                key={recentUser.id}
                                className="flex items-center justify-between border border-slate-200 rounded-2xl p-4"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            recentUser.profileImage ||
                                            "https://i.pravatar.cc/150"
                                        }
                                        alt="user"
                                        className="h-14 w-14 rounded-full object-cover"
                                    />

                                    <div>
                                        <h3 className="font-semibold">
                                            {recentUser.fullName}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {recentUser.email}
                                        </p>
                                    </div>
                                </div>

                                <span
                                    className={`
                                            px-4
                                            py-2
                                            rounded-full
                                            text-sm
                                            font-medium

                                            ${
                                                recentUser.role === "admin"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-emerald-100 text-emerald-600"
                                            }
                                        `}
                                >
                                    {recentUser.role === "admin"
                                        ? "Admin"
                                        : "Traveler"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TRIPS */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-8">Popular Trips</h2>

                    <div className="space-y-5">
                        {analytics.popularTrips.map((trip) => (
                            <div
                                key={trip.id}
                                className="border border-slate-200 rounded-2xl p-5"
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
                                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default AdminPage;
