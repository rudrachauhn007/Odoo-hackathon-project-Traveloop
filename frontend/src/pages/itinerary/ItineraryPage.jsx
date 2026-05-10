import MainLayout from "../../layout/MainLayout";
import mockItinerary from "../../constants/mockItinerary";
import DayTimelineCard from "../../components/cards/DayTimelineCard";
import LiveMap from "../../components/map/LiveMap";

function ItineraryPage() {
    // Extract unique cities from the itinerary to pass to the map
    const tripLocations = Array.from(new Set(mockItinerary.map(day => day.city)));

    return (
        <MainLayout>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-5xl font-bold text-slate-900 mb-3">
                        Itinerary Builder 🗺️
                    </h1>

                    <p className="text-slate-500 text-lg">
                        Organize your trip day by day and track it on the live map.
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

            {/* Split Screen Layout for Timeline and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Timeline */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-8 overflow-y-auto pr-2 pb-10" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    {mockItinerary.map((dayData) => (
                        <DayTimelineCard key={dayData.day} dayData={dayData} />
                    ))}
                </div>

                {/* Right Column: Live Map */}
                <div className="lg:col-span-7 xl:col-span-8 h-[500px] lg:h-[calc(100vh-200px)] sticky top-24">
                    <LiveMap locations={tripLocations} />
                </div>
            </div>
        </MainLayout>
    );
}

export default ItineraryPage;
