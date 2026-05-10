import MainLayout from "../../layout/MainLayout";

import TripCard from "../../components/cards/TripCard";

import mockTrips from "../../constants/mockTrips";

import { useNavigate } from "react-router-dom";

function MyTripsPage() {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
                <div>
                    <h1 className="text-5xl font-bold text-slate-900 mb-3">
                        My Trips ✈️
                    </h1>

                    <p className="text-slate-500 text-lg">
                        Organize and manage all your adventures.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/create-trip")}
                    className="
            bg-emerald-500
            hover:bg-emerald-600
            text-white
            px-6
            py-4
            rounded-2xl
            font-semibold
            shadow-lg
            transition
          "
                >
                    + Create New Trip
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {mockTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                ))}
            </div>
        </MainLayout>
    );
}

export default MyTripsPage;
