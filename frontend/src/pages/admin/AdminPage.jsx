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

    return (
        <MainLayout>
            {/* HEADER */}
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">Admin Dashboard </h1>

                <p className="text-slate-500 text-lg">
                    Monitor platform analytics and user activity based on User data.
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

            {/* CHART */}
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

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* RECENT USERS */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-8">Recent Users</h2>

                    <div className="space-y-5">
                        {analytics?.recentUsers?.map((user) => (
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
                        ))}
                    </div>
                </div>

                {/* POPULAR TRIPS */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-8">Popular Trips</h2>

                    <div className="space-y-5">
                        {analytics?.popularTrips?.map((trip) => (
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
                        ))}
                    </div>
                </div>
            </div>

            {/* RECENT TRIPS */}
            <div className="mt-10 bg-white border border-slate-200 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-8">Recent Trips</h2>

                <div className="space-y-5">
                    {analytics?.recentTrips?.map((trip) => (
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
                    </div>
                </div>

                {/* Pie Chart: Popular Destinations */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Destination Distribution</h2>
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
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Line Chart: Itinerary Costs */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Daily Activity Expenses</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activityCostData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `₹${value}`} />
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => `₹${value.toLocaleString()}`}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="cost" name="Total Daily Cost" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}

export default AdminPage;
