import ActivityCard from "./ActivityCard";

function DayTimelineCard({ dayData }) {
    return (
        <div className="relative">
            <div
                className="
          absolute
          left-5
          top-16
          bottom-0
          w-1
          bg-emerald-100
        "
            ></div>

            <div className="flex gap-6">
                <div
                    className="
            h-10
            w-10
            rounded-full
            bg-emerald-500
            text-white
            flex
            items-center
            justify-center
            font-bold
            shrink-0
            z-10
          "
                >
                    {dayData.day}
                </div>

                <div className="flex-1">
                    <div
                        className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-7
              shadow-sm
            "
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-800">
                                    {dayData.city}
                                </h2>

                                <p className="text-slate-500 mt-1">
                                    {dayData.date}
                                </p>
                            </div>

                            <button
                                className="
                  bg-emerald-500
                  hover:bg-emerald-600
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  font-medium
                  transition
                "
                            >
                                + Add Activity
                            </button>
                        </div>

                        <div className="space-y-4">
                            {dayData.activities.map((activity, index) => (
                                <ActivityCard key={index} activity={activity} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DayTimelineCard;
