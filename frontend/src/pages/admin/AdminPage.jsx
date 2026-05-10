import MainLayout from "../../layout/MainLayout";

function AdminPage() {
    return (
        <MainLayout>
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">Admin Dashboard 📊</h1>

                <p className="text-slate-500 text-lg">
                    Monitor platform analytics and user activity.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {[
                    {
                        title: "Users",
                        value: "12,430",
                    },

                    {
                        title: "Trips Created",
                        value: "4,821",
                    },

                    {
                        title: "Popular Cities",
                        value: "148",
                    },

                    {
                        title: "Activities",
                        value: "1,982",
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-6
            "
                    >
                        <p className="text-slate-500 mb-2">{item.title}</p>

                        <h2 className="text-4xl font-bold text-emerald-600">
                            {item.value}
                        </h2>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>

                <div className="space-y-5">
                    {[1, 2, 3, 4].map((activity) => (
                        <div
                            key={activity}
                            className="
                flex
                items-center
                justify-between
                border
                border-slate-200
                rounded-2xl
                p-5
              "
                        >
                            <div>
                                <h3 className="font-semibold">
                                    New Trip Created
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    User created Japan itinerary.
                                </p>
                            </div>

                            <span className="text-sm text-slate-400">
                                2 mins ago
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

export default AdminPage;
