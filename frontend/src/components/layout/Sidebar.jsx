import {
    LayoutDashboard,
    Plane,
    MapPinned,
    Wallet,
    NotebookPen,
    Settings,
    ShieldCheck,
    Users,
    Backpack,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        title: "My Trips",
        icon: Plane,
        path: "/trips",
    },

    {
        title: "Itinerary",
        icon: MapPinned,
        path: "/itinerary",
    },
    {
        title: "Budget",
        icon: Wallet,
        path: "/budget",
    },
    {
        title: "Checklist",
        icon: Backpack,
        path: "/packing",
    },
    {
        title: "Notes",
        icon: NotebookPen,
        path: "/notes",
    },
    {
        title: "Community",
        icon: Users,
        path: "/community",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
    },
    {
        title: "Admin",
        icon: ShieldCheck,
        path: "/admin",
    },
];

function Sidebar() {
    return (
        <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 flex-col">
            <div className="p-8 border-b border-slate-200">
                <h1 className="text-3xl font-bold text-emerald-500">
                    Traveloop
                </h1>

                <p className="text-slate-500 mt-2 text-sm">
                    Personalized Travel Planner
                </p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.title}
                            to={item.path}
                            className={({ isActive }) =>
                                `
                flex items-center gap-4 px-4 py-3 rounded-2xl transition-all
                ${
                    isActive
                        ? "bg-emerald-500 text-white shadow-lg"
                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-600"
                }
                `
                            }
                        >
                            <Icon size={20} />

                            <span className="font-medium">{item.title}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-200">
                <div className="bg-emerald-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-600 mb-2">
                        Ready for your next adventure?
                    </p>

                    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2 font-medium transition">
                        Plan New Trip
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
