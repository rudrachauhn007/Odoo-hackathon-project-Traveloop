import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

import {
    Plane,
    CalendarDays,
    Globe,
    IndianRupee,
    ArrowRight,
    Plus,
    MapPinned,
} from "lucide-react";

function DashboardPage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [analytics, setAnalytics] = useState(null);

    const [trips, setTrips] = useState([]);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const [analyticsRes, tripsRes] = await Promise.all([
                api.get("/analytics/dashboard"),

                api.get("/trips"),
            ]);

            setAnalytics(analyticsRes.data.analytics);

            setTrips(tripsRes.data.trips);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="py-20 text-center">
                    <p className="text-slate-500 text-lg">
                        Loading dashboard...
                    </p>
                </div>
            </MainLayout>
        );
    }

    const stats = [
        {
            title: "Total Trips",
            value: analytics?.totalTrips || 0,
            icon: Plane,
            color: "text-emerald-500",
        },

        {
            title: "Upcoming Trips",
            value: analytics?.upcomingTrips || 0,
            icon: CalendarDays,
            color: "text-teal-500",
        },

        {
            title: "Countries Visited",
            value: analytics?.countriesVisited || 0,
            icon: Globe,
            color: "text-slate-800",
        },

        {
            title: "Total Spent",
            value: `₹${analytics?.totalSpent?.toLocaleString() || 0}`,
            icon: IndianRupee,
            color: "text-emerald-600",
        },
    ];

    return (
        <MainLayout>
            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-5xl font-bold text-slate-900 mb-3">
                        Welcome Back 👋
                    </h1>

                    <p className="text-slate-500 text-lg">
                        Manage your trips, budgets and adventures.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/create-trip")}
                    className="
                        bg-emerald-500
                        hover:bg-emerald-600
                        text-white
                        px-6
                        py-4
                        rounded-2xl
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-3
                        transition
                    "
                >
                    <Plus size={20} />
                    Create New Trip
                </button>
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
                                shadow-sm
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

                            <p className="text-slate-500 mb-3">{item.title}</p>

                            <h2 className={`text-4xl font-bold ${item.color}`}>
                                {item.value}
                            </h2>
                        </div>
                    );
                })}
            </div>

            {/* QUICK ACTIONS */}
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
                <div className="flex items-center gap-4 mb-8">
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
                        <MapPinned className="text-emerald-600" />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold">Quick Actions</h2>

                        <p className="text-slate-500">
                            Jump directly into planning tools.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    {[
                        {
                            title: "Itinerary",
                            path: "/itinerary",
                        },

                        {
                            title: "Budget",
                            path: "/budget",
                        },

                        {
                            title: "Checklist",
                            path: "/checklist",
                        },

                        {
                            title: "Community",
                            path: "/community",
                        },
                    ].map((action) => (
                        <button
                            key={action.title}
                            onClick={() => navigate(action.path)}
                            className="
                                border
                                border-slate-200
                                hover:border-emerald-300
                                hover:bg-emerald-50
                                rounded-2xl
                                p-6
                                text-left
                                transition
                            "
                        >
                            <h3 className="text-xl font-semibold mb-2">
                                {action.title}
                            </h3>

                            <p className="text-slate-500 text-sm">
                                Open {action.title} tools
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* RECENT TRIPS */}
            <div
                className="
                    bg-white
                    border
                    border-slate-200
                    rounded-3xl
                    p-8
                    shadow-sm
                "
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">
                            Recent Trips
                        </h2>

                        <p className="text-slate-500 mt-1">
                            Continue planning your adventures
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/trips")}
                        className="
                            text-emerald-600
                            font-semibold
                            flex
                            items-center
                            gap-2
                        "
                    >
                        View All
                        <ArrowRight size={18} />
                    </button>
                </div>

                {trips.length === 0 ? (
                    <div
                        className="
                            border
                            border-dashed
                            border-slate-300
                            rounded-3xl
                            p-16
                            text-center
                        "
                    >
                        <h2 className="text-3xl font-bold mb-4">
                            No Trips Yet
                        </h2>

                        <p className="text-slate-500 mb-8">
                            Start planning your first adventure.
                        </p>

                        <button
                            onClick={() => navigate("/create-trip")}
                            className="
                                bg-emerald-500
                                hover:bg-emerald-600
                                text-white
                                px-6
                                py-4
                                rounded-2xl
                                font-semibold
                                transition
                            "
                        >
                            Create Trip
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {trips.slice(0, 6).map((trip) => (
                            <div
                                key={trip.id}
                                className="
                                        border
                                        border-slate-200
                                        rounded-3xl
                                        overflow-hidden
                                        hover:shadow-xl
                                        transition
                                    "
                            >
                                {/* COVER */}
                                {trip.coverImage ? (
                                    <img
                                        src={trip.coverImage}
                                        alt="trip"
                                        className="
                                                h-44
                                                w-full
                                                object-cover
                                            "
                                    />
                                ) : (
                                    <div
                                        className="
                                                h-44
                                                bg-gradient-to-r
                                                from-emerald-400
                                                to-teal-400
                                            "
                                    ></div>
                                )}

                                {/* CONTENT */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                        {trip.title}
                                    </h3>

                                    <p className="text-slate-500 mb-5 line-clamp-2">
                                        {trip.description ||
                                            "Explore destinations and experiences."}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-emerald-600 font-bold text-lg">
                                            ₹
                                            {trip.budget?.toLocaleString() || 0}
                                        </span>

                                        <button
                                            onClick={() =>
                                                navigate(`/trip/${trip.id}`)
                                            }
                                            className="
                                                    text-emerald-600
                                                    font-semibold
                                                "
                                        >
                                            View Trip
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default DashboardPage;
