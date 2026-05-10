import { Bell, Search } from "lucide-react";
import NotificationBell from "./NotificationBell";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-8">
            <div className="relative w-full max-w-xl">
                <Search
                    className="absolute left-4 top-3.5 text-slate-400"
                    size={18}
                />

                <input
                    type="text"
                    placeholder="Search cities, trips, activities..."
                    className="
            w-full
            bg-slate-100
            rounded-2xl
            py-3
            pl-12
            pr-4
            outline-none
            focus:ring-2
            focus:ring-emerald-400
          "
                />
            </div>

            <div className="flex items-center gap-5 ml-6">
                <NotificationBell />

                <Link to={"/settings"} className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/100"
                        alt="profile"
                        className="h-11 w-11 rounded-full object-cover"
                    />

                    <div className="hidden md:block">
                        <p className="font-semibold text-slate-800">
                            Viral Bhoi
                        </p>

                        <p className="text-sm text-slate-500">Traveler</p>
                    </div>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;
