import { useEffect, useState } from "react";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

import { Search, Sparkles, Flame } from "lucide-react";

function ActivitySearchPage() {
    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(true);

    const [activities, setActivities] = useState([]);

    const [popularActivities, setPopularActivities] = useState([]);

    useEffect(() => {
        fetchPopularActivities();
    }, []);

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (query.trim()) {
                searchActivities();
            } else {
                fetchPopularActivities();
            }
        }, 400);

        return () => clearTimeout(debounce);
    }, [query]);

    const searchActivities = async () => {
        try {
            setLoading(true);

            const res = await api.get(`/search/activities?q=${query}`);

            setActivities(res.data.activities);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPopularActivities = async () => {
        try {
            setLoading(true);

            const res = await api.get("/search/popular-activities");

            setPopularActivities(res.data.activities);

            setActivities(res.data.activities);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            {/* HEADER */}
            <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                    <div
                        className="
                            h-16
                            w-16
                            rounded-3xl
                            bg-emerald-100
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <Sparkles className="text-emerald-600 h-8 w-8" />
                    </div>

                    <div>
                        <h1 className="text-5xl font-bold">Activities 🎯</h1>

                        <p className="text-slate-500 text-lg mt-2">
                            Add unforgettable experiences to your journey.
                        </p>
                    </div>
                </div>
            </div>

            {/* SEARCH */}
            <div className="relative mb-10">
                <Search
                    className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                />

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search activities..."
                    className="
                        w-full
                        bg-white
                        border
                        border-slate-200
                        rounded-3xl
                        pl-14
                        pr-5
                        py-5
                        outline-none
                        focus:ring-2
                        focus:ring-emerald-400
                        text-lg
                    "
                />
            </div>

            {/* POPULAR TAGS */}
            {!query && popularActivities.length > 0 && (
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Flame className="text-orange-500" />

                        <h2 className="text-2xl font-bold">
                            Popular Activities
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {popularActivities.map((activity, index) => (
                            <button
                                key={index}
                                onClick={() => setQuery(activity.title)}
                                className="
                                        bg-emerald-50
                                        hover:bg-emerald-100
                                        text-emerald-700
                                        px-5
                                        py-3
                                        rounded-2xl
                                        font-medium
                                        transition
                                    "
                            >
                                ✨ {activity.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* LOADING */}
            {loading ? (
                <div className="py-20 text-center">
                    <p className="text-slate-500 text-lg">
                        Searching activities...
                    </p>
                </div>
            ) : activities.length === 0 ? (
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
                        No Activities Found
                    </h2>

                    <p className="text-slate-500">
                        Try searching another activity.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {activities.map((activity, index) => (
                        <div
                            key={activity.id || index}
                            className="
                                    bg-white
                                    border
                                    border-slate-200
                                    rounded-3xl
                                    p-6
                                    hover:shadow-xl
                                    transition
                                "
                        >
                            {/* IMAGE */}
                            <div
                                className="
                                        h-44
                                        rounded-3xl
                                        bg-gradient-to-r
                                        from-teal-300
                                        to-emerald-300
                                        mb-6
                                    "
                            ></div>

                            {/* CONTENT */}
                            <div className="mb-5">
                                <h2 className="text-3xl font-bold mb-3">
                                    {activity.title}
                                </h2>

                                <div className="flex items-center gap-3 mb-4">
                                    <span
                                        className="
                                                bg-emerald-50
                                                text-emerald-700
                                                px-4
                                                py-2
                                                rounded-full
                                                text-sm
                                                font-medium
                                            "
                                    >
                                        {activity.category || "General"}
                                    </span>
                                </div>

                                <p className="text-slate-500 leading-relaxed">
                                    Add this exciting activity to your itinerary
                                    and enhance your travel experience.
                                </p>
                            </div>

                            {/* FOOTER */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm">
                                        Estimated Cost
                                    </p>

                                    <p className="text-xl font-bold text-emerald-600">
                                        ₹{activity.cost || 0}
                                    </p>
                                </div>

                                <button
                                    className="
                                            bg-emerald-500
                                            hover:bg-emerald-600
                                            text-white
                                            px-5
                                            py-3
                                            rounded-2xl
                                            font-medium
                                            transition
                                        "
                                >
                                    Add Activity
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </MainLayout>
    );
}

export default ActivitySearchPage;
