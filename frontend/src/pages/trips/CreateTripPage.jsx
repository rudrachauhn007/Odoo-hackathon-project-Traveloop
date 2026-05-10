import MainLayout from "../../layout/MainLayout";

function CreateTripPage() {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-5xl font-bold text-slate-900 mb-3">
                        Create New Trip 🌍
                    </h1>

                    <p className="text-slate-500 text-lg">
                        Start planning your next unforgettable journey.
                    </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <div className="space-y-8">
                        <div>
                            <label className="block mb-3 font-semibold text-slate-700">
                                Trip Name
                            </label>

                            <input
                                type="text"
                                placeholder="Summer Europe Tour"
                                className="
                  w-full
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-3 font-semibold text-slate-700">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    className="
                    w-full
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

                            <div>
                                <label className="block mb-3 font-semibold text-slate-700">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    className="
                    w-full
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
                        </div>

                        <div>
                            <label className="block mb-3 font-semibold text-slate-700">
                                Description
                            </label>

                            <textarea
                                rows="5"
                                placeholder="Describe your trip..."
                                className="
                  w-full
                  border
                  border-slate-200
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:ring-2
                  focus:ring-emerald-400
                "
                            ></textarea>
                        </div>

                        <div>
                            <label className="block mb-3 font-semibold text-slate-700">
                                Cover Image
                            </label>

                            <div
                                className="
                  border-2
                  border-dashed
                  border-slate-300
                  rounded-3xl
                  p-12
                  text-center
                  bg-slate-50
                "
                            >
                                <p className="text-slate-500">
                                    Upload trip cover image
                                </p>
                            </div>
                        </div>

                        <button
                            className="
                w-full
                bg-emerald-500
                hover:bg-emerald-600
                text-white
                py-4
                rounded-2xl
                font-semibold
                text-lg
                transition
              "
                        >
                            Create Trip
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default CreateTripPage;
