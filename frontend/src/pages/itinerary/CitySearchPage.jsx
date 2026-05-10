import { useEffect, useState } from "react";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

import { Search, MapPin, TrendingUp } from "lucide-react";

function CitySearchPage() {
    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(true);

    const [cities, setCities] = useState([]);

    const [trending, setTrending] = useState([]);

    useEffect(() => {
        fetchTrendingCities();
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                searchCities();
            } else {
                fetchTrendingCities();
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const searchCities = async () => {
        try {
            setLoading(true);

            const res = await api.get(`/search/cities?q=${query}`);

            setCities(res.data.cities);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTrendingCities = async () => {
        try {
            setLoading(true);

            const res = await api.get("/search/trending-destinations");

            setTrending(res.data.destinations);

            setCities(res.data.destinations);
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
                        <MapPin className="text-emerald-600 h-8 w-8" />
                    </div>

                    <div>
                        <h1 className="text-5xl font-bold">
                            Discover Cities 
                        </h1>

                        <p className="text-slate-500 text-lg mt-2">
                            Explore destinations for your next adventure.
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
                    placeholder="Search cities..."
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

            {/* TRENDING */}
            {!query && trending.length > 0 && (
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="text-emerald-600" />

                        <h2 className="text-2xl font-bold">
                            Trending Destinations
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {trending.map((city, index) => (
                            <button
                                key={index}
                                onClick={() => setQuery(city.city)}
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
                                📍 {city.city}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* LOADING */}
            {loading ? (
                <div className="py-20 text-center">
                    <p className="text-slate-500 text-lg">
                        Searching destinations...
                    </p>
                </div>
            ) : cities.length === 0 ? (
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
                    <h2 className="text-3xl font-bold mb-4">No Cities Found</h2>

                    <p className="text-slate-500">
                        Try searching another destination.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {cities.map((city, index) => (
                        <div
                            key={index}
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
                                        from-emerald-300
                                        to-teal-300
                                        mb-6
                                    "
                            ></div>

                            {/* CONTENT */}
                            <div className="flex items-start justify-between gap-4 mb-5">
                                <div>
                                    <h2 className="text-3xl font-bold mb-2">
                                        {city.city}
                                    </h2>

                                    <p className="text-slate-500">
                                        {city.country ||
                                            "Popular travel destination"}
                                    </p>
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                Discover attractions, experiences and travel
                                inspiration for {city.city}.
                            </p>

                            {/* BUTTON */}
                            <button
                                className="
                                        w-full
                                        bg-emerald-500
                                        hover:bg-emerald-600
                                        text-white
                                        py-4
                                        rounded-2xl
                                        font-semibold
                                        transition
                                    "
                            >
                                Explore Destination
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </MainLayout>
    );
}

export default CitySearchPage;
