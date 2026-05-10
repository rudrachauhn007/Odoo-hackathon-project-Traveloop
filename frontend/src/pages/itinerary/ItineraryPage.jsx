import MainLayout from "../../layout/MainLayout";

import mockItinerary from "../../constants/mockItinerary";

import DayTimelineCard from "../../components/cards/DayTimelineCard";

function ItineraryPage() {
    return (
        <MainLayout>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
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
                        className="
              border
              border-slate-200
              bg-white
              hover:bg-slate-100
              px-5
              py-3
              rounded-2xl
              font-medium
              transition
            "
                    >
                        Calendar View
                    </button>

                    <button
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

            <div className="space-y-10">
                {mockItinerary.map((dayData) => (
                    <DayTimelineCard key={dayData.day} dayData={dayData} />
                ))}
            </div>
        </MainLayout>
    );
}

export default ItineraryPage;
