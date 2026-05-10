import MainLayout from "../../layout/MainLayout";

const cities = ["Zurich", "Tokyo", "Bali", "Paris", "Singapore", "Dubai"];

function CitySearchPage() {
    return (
        <MainLayout>
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">Discover Cities 🌍</h1>

                <p className="text-slate-500 text-lg">
                    Explore destinations for your next trip.
                </p>
            </div>

            <input
                type="text"
                placeholder="Search cities..."
                className="
          w-full
          bg-white
          border
          border-slate-200
          rounded-2xl
          px-5
          py-4
          outline-none
          focus:ring-2
          focus:ring-emerald-400
          mb-10
        "
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cities.map((city) => (
                    <div
                        key={city}
                        className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-6
              hover:shadow-lg
              transition
            "
                    >
                        <div className="h-40 rounded-2xl bg-linear-to-r from-emerald-300 to-teal-300 mb-5"></div>

                        <h2 className="text-2xl font-bold mb-2">{city}</h2>

                        <p className="text-slate-500 mb-5">
                            Popular destination for travelers.
                        </p>

                        <button
                            className="
                w-full
                bg-emerald-500
                hover:bg-emerald-600
                text-white
                py-3
                rounded-2xl
                font-medium
              "
                        >
                            Add To Trip
                        </button>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}

export default CitySearchPage;
