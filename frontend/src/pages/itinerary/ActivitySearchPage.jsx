import MainLayout from "../../layout/MainLayout";

const activities = [
    "Paragliding",
    "Museum Tour",
    "Cruise Ride",
    "Food Tour",
    "Beach Party",
    "Mountain Hiking",
];

function ActivitySearchPage() {
    return (
        <MainLayout>
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">Activities 🎯</h1>

                <p className="text-slate-500 text-lg">
                    Add memorable experiences to your trip.
                </p>
            </div>

            <input
                type="text"
                placeholder="Search activities..."
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
                {activities.map((activity) => (
                    <div
                        key={activity}
                        className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-6
            "
                    >
                        <div className="h-40 rounded-2xl bg-linear-to-r from-teal-300 to-emerald-300 mb-5"></div>

                        <h2 className="text-2xl font-bold mb-2">{activity}</h2>

                        <p className="text-slate-500 mb-5">
                            Add amazing experiences to your itinerary.
                        </p>

                        <button
                            className="
                w-full
                bg-emerald-500
                hover:bg-emerald-600
                text-white
                py-3
                rounded-2xl
              "
                        >
                            Add Activity
                        </button>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}

export default ActivitySearchPage;
