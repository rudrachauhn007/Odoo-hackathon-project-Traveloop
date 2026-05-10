import MainLayout from "../../layout/MainLayout";

function BudgetPage() {
    return (
        <MainLayout>
            <div className="mb-10">
                <h1 className="text-5xl font-bold text-slate-900 mb-3">
                    Budget Dashboard 💰
                </h1>

                <p className="text-slate-500 text-lg">
                    Track your expenses and stay within budget.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white border border-slate-200 rounded-3xl p-6">
                    <p className="text-slate-500 mb-2">Total Budget</p>

                    <h2 className="text-4xl font-bold text-emerald-600">
                        ₹2,50,000
                    </h2>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6">
                    <p className="text-slate-500 mb-2">Flights</p>

                    <h2 className="text-4xl font-bold">₹90,000</h2>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6">
                    <p className="text-slate-500 mb-2">Hotels</p>

                    <h2 className="text-4xl font-bold">₹70,000</h2>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6">
                    <p className="text-slate-500 mb-2">Activities</p>

                    <h2 className="text-4xl font-bold">₹45,000</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Expense Breakdown
                            </h2>

                            <p className="text-slate-500 mt-1">
                                Category-wise spending overview
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                title: "Flights",
                                amount: "₹90,000",
                                width: "80%",
                            },

                            {
                                title: "Hotels",
                                amount: "₹70,000",
                                width: "65%",
                            },

                            {
                                title: "Activities",
                                amount: "₹45,000",
                                width: "45%",
                            },

                            {
                                title: "Food",
                                amount: "₹25,000",
                                width: "30%",
                            },
                        ].map((item) => (
                            <div key={item.title}>
                                <div className="flex justify-between mb-2">
                                    <p className="font-medium text-slate-700">
                                        {item.title}
                                    </p>

                                    <p className="text-slate-500">
                                        {item.amount}
                                    </p>
                                </div>

                                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full"
                                        style={{ width: item.width }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Budget Alerts</h2>

                    <div className="space-y-5">
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                            <h3 className="font-semibold text-emerald-700 mb-2">
                                Good Progress
                            </h3>

                            <p className="text-sm text-slate-600">
                                Your total trip spending is within planned
                                limits.
                            </p>
                        </div>

                        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
                            <h3 className="font-semibold text-orange-600 mb-2">
                                Hotel Costs Rising
                            </h3>

                            <p className="text-sm text-slate-600">
                                Accommodation costs are nearing your expected
                                limit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default BudgetPage;
