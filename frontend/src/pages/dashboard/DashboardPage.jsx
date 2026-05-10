import MainLayout from "../../layout/MainLayout";

function DashboardPage() {
    return (
        <MainLayout>
            <div className="mb-10">
                <h1 className="text-5xl font-bold text-slate-900 mb-3">
                    Welcome Back 👋
                </h1>

                <p className="text-slate-500 text-lg">
                    Manage your trips, budgets and adventures.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                    <p className="text-slate-500 mb-3">Total Trips</p>

                    <h2 className="text-5xl font-bold text-emerald-500">12</h2>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                    <p className="text-slate-500 mb-3">Upcoming Trips</p>

                    <h2 className="text-5xl font-bold text-teal-500">4</h2>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                    <p className="text-slate-500 mb-3">Countries Visited</p>

                    <h2 className="text-5xl font-bold text-slate-800">8</h2>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Recent Trips
                        </h2>

                        <p className="text-slate-500 mt-1">
                            Continue planning your adventures
                        </p>
                    </div>

                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-2xl font-medium transition">
                        + New Trip
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3].map((trip) => (
                        <div
                            key={trip}
                            className="border border-slate-200 rounded-3xl overflow-hidden hover:shadow-lg transition"
                        >
                            <div className="h-44 bg-gradient-to-r from-emerald-400 to-teal-400"></div>

                            <div className="p-5">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">
                                    Switzerland Escape
                                </h3>

                                <p className="text-slate-500 mb-4">
                                    7 Days • Zurich • Lucerne • Interlaken
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-emerald-600 font-semibold">
                                        ₹1,25,000
                                    </span>

                                    <button className="text-emerald-600 font-medium">
                                        View Trip
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

export default DashboardPage;
