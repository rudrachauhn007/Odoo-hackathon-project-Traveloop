import { useEffect, useState } from "react";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

function ItineraryPage() {
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState("");
    const [loading, setLoading] = useState(true);
    const [stops, setStops] = useState([]);
    const [showStopForm, setShowStopForm] = useState(false);
    const [newStop, setNewStop] = useState({
        city: "",
        country: "",
        arrivalDate: "",
        departureDate: "",
    });

    const [activityInputs, setActivityInputs] = useState({});

    useEffect(() => {
        fetchTrips();
    }, []);

    useEffect(() => {
        if (selectedTrip) {
            fetchStops();
        }
    }, [selectedTrip]);

    const fetchTrips = async () => {
        try {
            const res = await api.get("/trips");

            setTrips(res.data.trips);

            if (res.data.trips.length > 0) {
                setSelectedTrip(res.data.trips[0].id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchStops = async () => {
        try {
            setLoading(true);

            const res = await api.get(`/stops/${selectedTrip}`);

            setStops(res.data.stops);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStopChange = (e) => {
        setNewStop({
            ...newStop,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddStop = async () => {
        try {
            if (!newStop.city || !newStop.country) return;

            await api.post(`/stops/${selectedTrip}`, {
                ...newStop,

                order: stops.length + 1,
            });

            setNewStop({
                city: "",
                country: "",
                arrivalDate: "",
                departureDate: "",
            });

            setShowStopForm(false);

            fetchStops();
        } catch (error) {
            console.log(error);
        }
    };

    const handleActivityInputChange = (stopId, field, value) => {
        setActivityInputs((prev) => ({
            ...prev,

            [stopId]: {
                ...prev[stopId],

                [field]: value,
            },
        }));
    };

    const handleAddActivity = async (stopId) => {
        try {
            const data = activityInputs[stopId];

            if (!data?.title) return;

            await api.post(`/activities/${stopId}`, {
                title: data.title,

                category: data.category || "General",

                description: data.description || "",
            });

            setActivityInputs((prev) => ({
                ...prev,

                [stopId]: {
                    title: "",
                    category: "",
                    description: "",
                },
            }));

            fetchStops();
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="py-20 text-center">
                    <p className="text-slate-500 text-lg">
                        Loading itinerary...
                    </p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-5xl font-bold text-slate-900 mb-3">
                        Itinerary Builder 🗺️
                    </h1>

                    <p className="text-slate-500 text-lg">
                        Organize your trip day by day.
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => setShowStopForm(!showStopForm)}
                        className="
                            bg-emerald-500
                            hover:bg-emerald-600
                            text-white
                            px-6
                            py-3
                            rounded-2xl
                            font-medium
                            transition
                        "
                    >
                        + Add Stop
                    </button>
                </div>
            </div>

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
                        min-w-70
                    "
                >
                    {trips.map((trip) => (
                        <option key={trip.id} value={trip.id}>
                            {trip.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* ADD STOP FORM */}
            {showStopForm && (
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
                    <h2 className="text-2xl font-bold mb-6">Add New Stop</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <input
                            type="text"
                            name="city"
                            value={newStop.city}
                            onChange={handleStopChange}
                            placeholder="City"
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
                            type="text"
                            name="country"
                            value={newStop.country}
                            onChange={handleStopChange}
                            placeholder="Country"
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
                            type="date"
                            name="arrivalDate"
                            value={newStop.arrivalDate}
                            onChange={handleStopChange}
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
                            type="date"
                            name="departureDate"
                            value={newStop.departureDate}
                            onChange={handleStopChange}
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
                    </div>

                    <button
                        onClick={handleAddStop}
                        className="
                            mt-6
                            bg-emerald-500
                            hover:bg-emerald-600
                            text-white
                            px-6
                            py-3
                            rounded-2xl
                            font-medium
                        "
                    >
                        Save Stop
                    </button>
                </div>
            )}

            {/* EMPTY */}
            {stops.length === 0 ? (
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
                    <h2 className="text-3xl font-bold mb-4">
                        No Stops Added Yet
                    </h2>

                    <p className="text-slate-500">
                        Start building your itinerary.
                    </p>
                </div>
            ) : (
                <div className="space-y-10">
                    {stops.map((stop, index) => (
                        <div
                            key={stop.id}
                            className="
                                    bg-white
                                    border
                                    border-slate-200
                                    rounded-3xl
                                    p-8
                                "
                        >
                            {/* HEADER */}
                            <div className="mb-8">
                                <p className="text-sm text-emerald-600 font-medium mb-2">
                                    Day {index + 1}
                                </p>

                                <h2 className="text-3xl font-bold">
                                    {stop.city}, {stop.country}
                                </h2>
                            </div>

                            {/* ACTIVITIES */}
                            <div className="space-y-4 mb-8">
                                {stop.activities?.length === 0 ? (
                                    <div
                                        className="
                                                border
                                                border-dashed
                                                border-slate-300
                                                rounded-2xl
                                                p-6
                                                text-center
                                            "
                                    >
                                        <p className="text-slate-500">
                                            No activities added yet.
                                        </p>
                                    </div>
                                ) : (
                                    stop.activities?.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="
                                                        border
                                                        border-slate-200
                                                        rounded-2xl
                                                        p-5
                                                    "
                                        >
                                            <h3 className="font-semibold text-lg">
                                                {activity.title}
                                            </h3>

                                            <p className="text-slate-500 text-sm mt-1">
                                                {activity.category}
                                            </p>

                                            {activity.description && (
                                                <p className="text-slate-600 mt-3">
                                                    {activity.description}
                                                </p>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* ADD ACTIVITY */}
                            <div
                                className="
                                        border
                                        border-slate-200
                                        rounded-2xl
                                        p-5
                                    "
                            >
                                <h3 className="font-semibold text-lg mb-5">
                                    Add Activity
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Activity title"
                                        value={
                                            activityInputs[stop.id]?.title || ""
                                        }
                                        onChange={(e) =>
                                            handleActivityInputChange(
                                                stop.id,
                                                "title",
                                                e.target.value,
                                            )
                                        }
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
                                        type="text"
                                        placeholder="Category"
                                        value={
                                            activityInputs[stop.id]?.category ||
                                            ""
                                        }
                                        onChange={(e) =>
                                            handleActivityInputChange(
                                                stop.id,
                                                "category",
                                                e.target.value,
                                            )
                                        }
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

                                    <button
                                        onClick={() =>
                                            handleAddActivity(stop.id)
                                        }
                                        className="
                                                bg-emerald-500
                                                hover:bg-emerald-600
                                                text-white
                                                rounded-2xl
                                                font-medium
                                            "
                                    >
                                        Add Activity
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </MainLayout>
    );
}

export default ItineraryPage;
