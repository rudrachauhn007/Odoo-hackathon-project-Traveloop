import MainLayout from "../../layout/MainLayout";

function TripDetailsPage() {
    return (
        <MainLayout>
            <div className="h-80 rounded-3xl bg-linear-to-r from-emerald-400 to-teal-400 mb-10"></div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-5xl font-bold text-slate-900 mb-3">
                        Switzerland Escape
                    </h1>

                    <p className="text-slate-500 text-lg">
                        Zurich • Lucerne • Interlaken
                    </p>
                </div>

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6">
                    <p className="text-slate-500 mb-2">Duration</p>

                    <h2 className="text-3xl font-bold">7 Days</h2>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6">
                    <p className="text-slate-500 mb-2">Budget</p>

                    <h2 className="text-3xl font-bold text-emerald-600">
                        ₹1,25,000
                    </h2>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6">
                    <p className="text-slate-500 mb-2">Stops</p>

                    <h2 className="text-3xl font-bold">3 Cities</h2>
                </div>
            </div>
        </MainLayout>
    );
}

export default TripDetailsPage;
