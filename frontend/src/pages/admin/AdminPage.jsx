import MainLayout from "../../layout/MainLayout";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import mockTrips from "../../constants/mockTrips";
import mockItinerary from "../../constants/mockItinerary";

function AdminPage() {
    // Calculate total spent for the current trip (Switzerland) from mockItinerary
    let currentTripSpent = 0;
    mockItinerary.forEach(day => {
        day.activities.forEach(activity => {
            currentTripSpent += parseInt(activity.cost.replace(/[^0-9]/g, ''), 10);
        });
    });

    // Parse trip budgets and simulate expenses for Bar Chart
    const tripExpensesChartData = mockTrips.map(trip => {
        const numericBudget = parseInt(trip.budget.replace(/[^0-9]/g, ''), 10);
        // If it's the Switzerland trip (id 1), use actual calculated spent, else simulate spent
        const spent = trip.id === 1 ? currentTripSpent : Math.floor(numericBudget * (0.6 + Math.random() * 0.3));
        return {
            name: trip.title,
            Budget: numericBudget,
            Spent: spent
        };
    });

    // Data for Current Trip Progress (Pie Chart)
    const currentTripBudget = parseInt(mockTrips.find(t => t.id === 1)?.budget.replace(/[^0-9]/g, ''), 10) || 125000;
    const currentTripRemaining = currentTripBudget - currentTripSpent;
    const currentTripPieData = [
        { name: 'Spent', value: currentTripSpent },
        { name: 'Remaining Budget', value: currentTripRemaining > 0 ? currentTripRemaining : 0 }
    ];
    const PROGRESS_COLORS = ['#ef4444', '#10b981']; // Red for spent, Green for remaining

    // Process Destinations for Pie Chart
    const destinationCount = {};
    mockTrips.forEach(trip => {
        trip.destinations.forEach(dest => {
            destinationCount[dest] = (destinationCount[dest] || 0) + 1;
        });
    });

    const destinationPieData = Object.keys(destinationCount).map(key => ({
        name: key,
        value: destinationCount[key]
    }));
    const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1'];

    // Process Activity costs for Line Chart
    const activityCostData = mockItinerary.map(day => {
        let totalCost = 0;
        day.activities.forEach(activity => {
            totalCost += parseInt(activity.cost.replace(/[^0-9]/g, ''), 10);
        });
        return {
            day: `Day ${day.day}`,
            city: day.city,
            cost: totalCost
        };
    });

    // Calculate Dynamic Stats
    const totalTrips = mockTrips.length;
    const totalDestinations = Object.keys(destinationCount).length;
    let totalActivities = 0;
    mockItinerary.forEach(day => {
        totalActivities += day.activities.length;
    });

    return (
        <MainLayout>
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">Admin Dashboard </h1>

                <p className="text-slate-500 text-lg">
                    Monitor platform analytics and user activity based on User data.
                </p>
            </div>

            {/* Dynamic Statistic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {[
                    {
                        title: "Users (Simulated)",
                        value: "12,430",
                        color: "text-blue-600"
                    },
                    {
                        title: "Trips Created",
                        value: totalTrips,
                        color: "text-emerald-600"
                    },
                    {
                        title: "Unique Cities",
                        value: totalDestinations,
                        color: "text-purple-600"
                    },
                    {
                        title: "Total Activities",
                        value: totalActivities,
                        color: "text-amber-600"
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <p className="text-slate-500 mb-2 font-medium">{item.title}</p>
                        <h2 className={`text-4xl font-bold ${item.color}`}>
                            {item.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

                {/* Bar Chart: Trip Expenses vs Budget */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Trip Expenses vs Budget</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={tripExpensesChartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `₹${value / 1000}k`} />
                                <RechartsTooltip
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => `₹${value.toLocaleString()}`}
                                />
                                <Legend />
                                <Bar dataKey="Budget" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Spent" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart: Current Trip Spending */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Current Trip (Switzerland) Spending</h2>
                    <div className="h-80 relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={currentTripPieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={90}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {currentTripPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PROGRESS_COLORS[index % PROGRESS_COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => `₹${value.toLocaleString()}`}
                                />
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                            <span className="text-slate-500 text-sm font-medium">Total Spent</span>
                            <span className="text-3xl font-bold text-slate-800">₹{(currentTripSpent / 1000).toFixed(1)}k</span>
                        </div>
                    </div>
                </div>

                {/* Pie Chart: Popular Destinations */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Destination Distribution</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={destinationPieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {destinationPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Line Chart: Itinerary Costs */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Daily Activity Expenses</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activityCostData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `₹${value}`} />
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => `₹${value.toLocaleString()}`}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="cost" name="Total Daily Cost" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}

export default AdminPage;
