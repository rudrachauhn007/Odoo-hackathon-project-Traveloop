import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../../lib/axios";

import { Globe, Heart, Copy, MapPin, CalendarDays } from "lucide-react";

function PublicItineraryPage() {
    const { tripId } = useParams();

    const [loading, setLoading] = useState(true);

    const [trip, setTrip] = useState(null);

    const [stops, setStops] = useState([]);

    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchPublicTrip();
    }, [tripId]);

    const fetchPublicTrip = async () => {
        try {
            const [tripRes, stopsRes] = await Promise.all([
                api.get(`/community/trip/${tripId}`),

                api.get(`/stops/${tripId}`),
            ]);

            setTrip(tripRes.data.trip);

            setStops(stopsRes.data.stops);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLikeTrip = async () => {
        try {
            setActionLoading(true);

            await api.post(`/community/like/${tripId}`);

            setTrip((prev) => ({
                ...prev,

                likesCount: (prev.likesCount || 0) + 1,
            }));
        } catch (error) {
            console.log(error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleCopyTrip = async () => {
        try {
            setActionLoading(true);

            await api.post(`/community/copy/${tripId}`);

            alert("Trip copied successfully!");
        } catch (error) {
            console.log(error);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-slate-500 text-lg">Loading itinerary...</p>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
                <div
                    className="
                        bg-white
                        border
                        border-slate-200
                        rounded-3xl
                        p-16
                        text-center
                        max-w-2xl
                        w-full
                    "
                >
                    <h2 className="text-4xl font-bold mb-4">Trip Not Found</h2>

                    <p className="text-slate-500">
                        This public itinerary does not exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">
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
                            bg-gradient-to-r
                            from-emerald-400
                            to-teal-400
                            mb-10
                        "
                    ></div>
                )}

                {/* MAIN CARD */}
                <div
                    className="
                        bg-white
                        border
                        border-slate-200
                        rounded-3xl
                        p-10
                    "
                >
                    {/* HEADER */}
                    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8 mb-10">
                        <div>
                            <div className="flex items-center gap-3 mb-5">
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
                                    Public Itinerary
                                </span>
                            </div>

                            <h1 className="text-5xl font-bold mb-4">
                                {trip.title}
                            </h1>

                            <p className="text-slate-500 text-lg leading-relaxed max-w-3xl">
                                {trip.description ||
                                    "Shared itinerary for travelers and explorers around the world."}
                            </p>

                            {/* AUTHOR */}
                            <div className="flex items-center gap-4 mt-8">
                                <img
                                    src={
                                        trip.user?.profileImage ||
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
                                    <p className="font-semibold text-lg">
                                        {trip.user?.fullName}
                                    </p>

                                    <p className="text-slate-500">
                                        Travel Creator
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-col gap-4 min-w-[220px]">
                            <button
                                onClick={handleLikeTrip}
                                disabled={actionLoading}
                                className="
                                    bg-emerald-500
                                    hover:bg-emerald-600
                                    disabled:bg-emerald-300
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
                                <Heart size={18} />
                                ❤️ {trip.likesCount || 0} Likes
                            </button>

                            <button
                                onClick={handleCopyTrip}
                                disabled={actionLoading}
                                className="
                                    border
                                    border-slate-200
                                    bg-white
                                    hover:bg-slate-100
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
                                <Copy size={18} />
                                Copy Itinerary
                            </button>
                        </div>
                    </div>

                    {/* STOPS */}
                    {stops.length === 0 ? (
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
                                No Destinations Added
                            </h2>

                            <p className="text-slate-500">
                                This itinerary does not contain stops yet.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {stops.map((stop, index) => (
                                <div
                                    key={stop.id}
                                    className="
                                            border
                                            border-slate-200
                                            rounded-3xl
                                            p-8
                                        "
                                >
                                    {/* HEADER */}
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
                                        <div>
                                            <p className="text-emerald-600 font-medium mb-3">
                                                Day {index + 1}
                                            </p>

                                            <h2 className="text-3xl font-bold mb-3">
                                                {stop.city}, {stop.country}
                                            </h2>

                                            <div className="flex items-center gap-4 text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={16} />

                                                    {stop.city}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <CalendarDays size={16} />

                                                    {new Date(
                                                        stop.arrivalDate,
                                                    ).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ACTIVITIES */}
                                    {stop.activities?.length === 0 ? (
                                        <div
                                            className="
                                                    border
                                                    border-dashed
                                                    border-slate-300
                                                    rounded-2xl
                                                    p-8
                                                    text-center
                                                "
                                        >
                                            <p className="text-slate-500">
                                                No activities planned.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-5">
                                            {stop.activities.map((activity) => (
                                                <div
                                                    key={activity.id}
                                                    className="
                                                                bg-slate-50
                                                                rounded-2xl
                                                                p-5
                                                            "
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <h3 className="text-xl font-semibold mb-2">
                                                                {activity.title}
                                                            </h3>

                                                            <p className="text-slate-500 mb-3">
                                                                {
                                                                    activity.category
                                                                }
                                                            </p>

                                                            {activity.description && (
                                                                <p className="text-slate-600 leading-relaxed">
                                                                    {
                                                                        activity.description
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PublicItineraryPage;
