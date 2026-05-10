import { useEffect, useState } from "react";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

function CommunityPage() {
    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        fetchCommunityFeed();
    }, []);

    const fetchCommunityFeed = async () => {
        try {
            const res = await api.get("/community");

            setPosts(res.data.trips);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLikeTrip = async (tripId) => {
        try {
            setActionLoading(tripId);

            await api.post(`/community/like/${tripId}`);

            setPosts((prev) =>
                prev.map((post) =>
                    post.id === tripId
                        ? {
                              ...post,
                              likesCount: post.likesCount + 1,
                          }
                        : post,
                ),
            );
        } catch (error) {
            console.log(error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleCopyTrip = async (tripId) => {
        try {
            setActionLoading(tripId);

            await api.post(`/community/copy/${tripId}`);

            alert("Trip copied successfully!");
        } catch (error) {
            console.log(error);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <MainLayout>
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">Travel Community 🌎</h1>

                <p className="text-slate-500 text-lg">
                    Explore itineraries shared by travelers around the world.
                </p>
            </div>

            {/* LOADING */}
            {loading ? (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-lg">
                        Loading community feed...
                    </p>
                </div>
            ) : posts.length === 0 ? (
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
                        No Public Trips Yet
                    </h2>

                    <p className="text-slate-500">
                        Community trips will appear here once users share them.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="
                                bg-white
                                border
                                border-slate-200
                                rounded-3xl
                                overflow-hidden
                                hover:shadow-xl
                                transition
                            "
                        >
                            {/* COVER IMAGE */}
                            {post.coverImage ? (
                                <img
                                    src={post.coverImage}
                                    alt="trip"
                                    className="
                                        h-64
                                        w-full
                                        object-cover
                                    "
                                />
                            ) : (
                                <div
                                    className="
                                        h-64
                                        bg-linear-to-r
                                        from-emerald-400
                                        to-teal-400
                                    "
                                ></div>
                            )}

                            <div className="p-7">
                                {/* USER */}
                                <div className="flex items-center gap-4 mb-5">
                                    <img
                                        src={
                                            post.user?.profileImage ||
                                            "https://i.pravatar.cc/150"
                                        }
                                        alt="user"
                                        className="h-12 w-12 rounded-full object-cover"
                                    />

                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {post.user?.fullName}
                                        </h3>

                                        <p className="text-slate-500 text-sm">
                                            Shared Public Itinerary
                                        </p>
                                    </div>
                                </div>

                                {/* TITLE */}
                                <h2 className="text-3xl font-bold mb-3">
                                    {post.title}
                                </h2>

                                {/* DESCRIPTION */}
                                <p className="text-slate-500 mb-6 line-clamp-3">
                                    {post.description ||
                                        "Explore this amazing travel itinerary shared by the community."}
                                </p>

                                {/* DATES */}
                                <div className="flex gap-4 mb-6 text-sm text-slate-500">
                                    <span>
                                        📅{" "}
                                        {new Date(
                                            post.startDate,
                                        ).toLocaleDateString()}
                                    </span>

                                    <span>
                                        →{" "}
                                        {new Date(
                                            post.endDate,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex items-center justify-between gap-4">
                                    {/* LIKES */}
                                    <button
                                        onClick={() => handleLikeTrip(post.id)}
                                        disabled={actionLoading === post.id}
                                        className="
                                            text-emerald-600
                                            font-semibold
                                            hover:scale-105
                                            transition
                                        "
                                    >
                                        ❤️ {post.likesCount || 0} Likes
                                    </button>

                                    {/* COPY */}
                                    <button
                                        onClick={() => handleCopyTrip(post.id)}
                                        disabled={actionLoading === post.id}
                                        className="
                                            bg-emerald-500
                                            hover:bg-emerald-600
                                            disabled:bg-emerald-300
                                            text-white
                                            px-5
                                            py-3
                                            rounded-2xl
                                            font-medium
                                            transition
                                        "
                                    >
                                        {actionLoading === post.id
                                            ? "Processing..."
                                            : "Copy Trip"}
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

export default CommunityPage;
