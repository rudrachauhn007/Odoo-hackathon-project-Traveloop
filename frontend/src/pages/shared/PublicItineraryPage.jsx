function PublicItineraryPage() {
    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="h-80 rounded-3xl bg-linear-to-r from-emerald-400 to-teal-400 mb-10"></div>

                <div className="bg-white border border-slate-200 rounded-3xl p-10">
                    <h1 className="text-5xl font-bold mb-4">
                        Switzerland Escape 🇨🇭
                    </h1>

                    <p className="text-slate-500 text-lg mb-10">
                        Shared itinerary for friends and travelers.
                    </p>

                    <div className="space-y-8">
                        {[1, 2, 3].map((day) => (
                            <div
                                key={day}
                                className="
                  border
                  border-slate-200
                  rounded-3xl
                  p-6
                "
                            >
                                <h2 className="text-2xl font-bold mb-3">
                                    Day {day}
                                </h2>

                                <p className="text-slate-500">
                                    Activities and destinations planned for this
                                    day.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublicItineraryPage;
