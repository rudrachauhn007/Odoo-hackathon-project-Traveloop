import { MapPin, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TripCard({ trip }) {
    const Navigate = useNavigate();
    return (
        <div
            className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        overflow-hidden
        hover:shadow-xl
        transition-all
        duration-300
      "
        >
            <img
                src={trip.image}
                alt={trip.title}
                className="h-56 w-full object-cover"
            />

            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-bold text-slate-800">
                        {trip.title}
                    </h2>

                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                        {trip.duration}
                    </span>
                </div>

                <div className="flex items-start gap-2 text-slate-500 mb-4">
                    <MapPin size={18} className="mt-1" />

                    <p>{trip.stops?.map((stop) => stop.city).join(" • ")}</p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                        <Wallet size={18} />

                        <span>{trip.budget}</span>
                    </div>

                    <button
                    onClick={() => Navigate(`/trips/${trip.id}`)}
                        className="
              bg-emerald-500
              hover:bg-emerald-600
              text-white
              px-4
              py-2
              rounded-xl
              transition
            "
                    >
                        View Trip
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TripCard;
