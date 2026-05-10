import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

import { CalendarDays, IndianRupee, MapPin, Pencil, Globe } from "lucide-react";

function TripDetailsPage() {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [trip, setTrip] = useState(null);
    const [stops, setStops] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [updatingVisibility, setUpdatingVisibility] = useState(false);

    useEffect(() => {
        fetchTripDetails();
    }, [tripId]);

    const fetchTripDetails = async () => {
        try {
            const [tripRes, stopsRes, analyticsRes] = await Promise.all([
                api.get(`/trips/${tripId}`),

                api.get(`/stops/${tripId}`),

                api.get(`/analytics/trip/${tripId}`),
            ]);

            setTrip(tripRes.data.trip);

            setStops(stopsRes.data.stops);

            setAnalytics(analyticsRes.data.analytics);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleVisibilityToggle = async () => {
        try {
            setUpdatingVisibility(true);

            const res = await api.patch(`/community/visibility/${trip.id}`);

            setTrip(res.data.trip);
        } catch (error) {
            console.log(error);
        } finally {
            setUpdatingVisibility(false);
        }
    };

    const calculateDuration = () => {
        if (!trip?.startDate || !trip?.endDate) return 0;

        const start = new Date(trip.startDate);

        const end = new Date(trip.endDate);

        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        return diff;
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="py-20 text-center">
                    <p className="text-slate-500 text-lg">
                        Loading trip details...
                    </p>
                </div>
            </MainLayout>
        );
    }

    if (!trip) {
        return (
            <MainLayout>
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
                    <h2 className="text-3xl font-bold mb-4">Trip Not Found</h2>

                    <p className="text-slate-500">This trip does not exist.</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* COVER */}
            {trip.coverImage ? (
                <img
                    src={trip.coverImage}
                    alt="trip"
                    className="
                        h-80
                        w-full
                        rounded-3xl
                        object-cover
                        mb-10
                    "
                />
            ) : (
                <div
                    className="
                        h-80
                        rounded-3xl
                        bg-linear-to-r
                        from-emerald-400
                        to-teal-400
                        mb-10
                    "
                ></div>
            )}

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        {trip.isPublic && (
                            <span
                                className="
                                    bg-emerald-100
                                    text-emerald-700
                                    px-4
                                    py-2
                                    rounded-full
                                    text-sm
                                    font-medium
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <Globe size={16} />
                                Public Trip
                            </span>
                        )}
                    </div>

                    <h1 className="text-5xl font-bold text-slate-900 mb-4">
                        {trip.title}
                    </h1>

                    <p className="text-slate-500 text-lg max-w-3xl leading-relaxed">
                        {trip.description ||
                            "Explore destinations, experiences and memories from this journey."}
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleVisibilityToggle}
                        disabled={updatingVisibility}
                        className={`
            px-6
            py-4
            rounded-2xl
            font-semibold
            text-white
            transition

            ${
                trip.isPublic
                    ? "bg-slate-700 hover:bg-slate-800"
                    : "bg-emerald-500 hover:bg-emerald-600"
            }
        `}
                    >
                        {updatingVisibility
                            ? "Updating..."
                            : trip.isPublic
                              ? "Make Private"
                              : "Make Public"}
                    </button>

                    <button
                        className="
            bg-emerald-500
            hover:bg-emerald-600
            text-white
            px-6
            py-4
            rounded-2xl
            font-semibold
        "
                    >
                        Edit Trip
                    </button>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {/* DURATION */}
                <div
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
                            <CalendarDays className="text-emerald-600" />
                        </div>
                    </div>

                    <p className="text-slate-500 mb-2">Duration</p>

                    <h2 className="text-3xl font-bold">
                        {calculateDuration()} Days
                    </h2>
                </div>

                {/* BUDGET */}
                <div
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
                            <IndianRupee className="text-emerald-600" />
                        </div>
                    </div>

                    <p className="text-slate-500 mb-2">Budget</p>

                    <h2 className="text-3xl font-bold text-emerald-600">
                        ₹{trip.budget?.toLocaleString() || 0}
                    </h2>
                </div>

                {/* STOPS */}
                <div
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
                            <MapPin className="text-emerald-600" />
                        </div>
                    </div>

                    <p className="text-slate-500 mb-2">Stops</p>

                    <h2 className="text-3xl font-bold">{stops.length}</h2>
                </div>

                {/* SPENT */}
                <div
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
                            <IndianRupee className="text-emerald-600" />
                        </div>
                    </div>

                    <p className="text-slate-500 mb-2">Total Spent</p>

                    <h2 className="text-3xl font-bold">
                        ₹{analytics?.totalSpent?.toLocaleString() || 0}
                    </h2>
                </div>
            </div>

            {/* DESTINATIONS */}
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
                <h2 className="text-3xl font-bold mb-8">Destinations</h2>

                {stops.length === 0 ? (
                    <div
                        className="
                            border
                            border-dashed
                            border-slate-300
                            rounded-3xl
                            p-12
                            text-center
                        "
                    >
                        <p className="text-slate-500 text-lg">
                            No itinerary stops added yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {stops.map((stop) => (
                            <div
                                key={stop.id}
                                className="
                                        border
                                        border-slate-200
                                        rounded-3xl
                                        p-6
                                    "
                            >
                                <div
                                    className="
                                            h-40
                                            rounded-2xl
                                            bg-gradient-to-r
                                            from-emerald-300
                                            to-teal-300
                                            mb-5
                                        "
                                ></div>

                                <h3 className="text-2xl font-bold mb-2">
                                    {stop.city}
                                </h3>

                                <p className="text-slate-500 mb-4">
                                    {stop.country}
                                </p>

                                <p className="text-sm text-slate-400">
                                    {new Date(
                                        stop.arrivalDate,
                                    ).toLocaleDateString()}{" "}
                                    →{" "}
                                    {new Date(
                                        stop.departureDate,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default TripDetailsPage;
