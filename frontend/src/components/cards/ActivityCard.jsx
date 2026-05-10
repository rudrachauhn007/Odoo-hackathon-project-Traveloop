import { Clock3, Wallet } from "lucide-react";

function ActivityCard({ activity }) {
    return (
        <div
            className="
        bg-slate-50
        border
        border-slate-200
        rounded-2xl
        p-5
        hover:shadow-md
        transition
      "
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                        {activity.title}
                    </h3>

                    <div className="flex items-center gap-5 text-slate-500 text-sm">
                        <div className="flex items-center gap-2">
                            <Clock3 size={16} />
                            <span>{activity.time}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Wallet size={16} />
                            <span>{activity.cost}</span>
                        </div>
                    </div>
                </div>

                <button
                    className="
            text-emerald-600
            hover:text-emerald-700
            font-medium
          "
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

export default ActivityCard;
