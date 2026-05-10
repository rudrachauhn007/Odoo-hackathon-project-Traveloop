import MainLayout from "../../layout/MainLayout";

function SettingsPage() {
    return (
        <MainLayout>
            <div className="mb-10">
                <h1 className="text-5xl font-bold text-slate-900 mb-3">
                    Profile & Settings ⚙️
                </h1>

                <p className="text-slate-500 text-lg">
                    Manage your profile, preferences and account settings.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* LEFT SIDE */}
                <div className="xl:col-span-2 space-y-8">
                    {/* PROFILE CARD */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-8">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                            <img
                                src="https://i.pravatar.cc/150"
                                alt="profile"
                                className="h-28 w-28 rounded-full object-cover border-4 border-emerald-100"
                            />

                            <div>
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                                    Viral Bhoi
                                </h2>

                                <p className="text-slate-500 mb-4">
                                    Traveler • Explorer • Adventure Planner
                                </p>

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
                                    Change Photo
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-3 font-semibold text-slate-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    defaultValue="Viral Bhoi"
                                    className="
                    w-full
                    border
                    border-slate-200
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    focus:ring-2
                    focus:ring-emerald-400
                  "
                                />
                            </div>

                            <div>
                                <label className="block mb-3 font-semibold text-slate-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    defaultValue="viral@example.com"
                                    className="
                    w-full
                    border
                    border-slate-200
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    focus:ring-2
                    focus:ring-emerald-400
                  "
                                />
                            </div>
                        </div>
                    </div>

                    {/* PREFERENCES */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-8">Preferences</h2>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Email Notifications
                                    </h3>

                                    <p className="text-slate-500 text-sm mt-1">
                                        Receive updates about trips and
                                        activities
                                    </p>
                                </div>

                                <button
                                    className="
                    h-8
                    w-14
                    bg-emerald-500
                    rounded-full
                    relative
                  "
                                >
                                    <div
                                        className="
                      h-6
                      w-6
                      bg-white
                      rounded-full
                      absolute
                      top-1
                      right-1
                    "
                                    ></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Public Profile
                                    </h3>

                                    <p className="text-slate-500 text-sm mt-1">
                                        Allow others to discover your public
                                        itineraries
                                    </p>
                                </div>

                                <button
                                    className="
                    h-8
                    w-14
                    bg-slate-300
                    rounded-full
                    relative
                  "
                                >
                                    <div
                                        className="
                      h-6
                      w-6
                      bg-white
                      rounded-full
                      absolute
                      top-1
                      left-1
                    "
                                    ></div>
                                </button>
                            </div>

                            <div>
                                <label className="block mb-3 font-semibold text-slate-700">
                                    Preferred Language
                                </label>

                                <select
                                    className="
                    w-full
                    border
                    border-slate-200
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    focus:ring-2
                    focus:ring-emerald-400
                  "
                                >
                                    <option>English</option>
                                    <option>Hindi</option>
                                    <option>French</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* SAVE BUTTON */}
                    <button
                        className="
              bg-emerald-500
              hover:bg-emerald-600
              text-white
              px-8
              py-4
              rounded-2xl
              font-semibold
              text-lg
              transition
            "
                    >
                        Save Changes
                    </button>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-8">
                    {/* SAVED DESTINATIONS */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-6">
                            Saved Destinations
                        </h2>

                        <div className="space-y-4">
                            {["Switzerland", "Japan", "Bali", "Norway"].map(
                                (place) => (
                                    <div
                                        key={place}
                                        className="
                    border
                    border-slate-200
                    rounded-2xl
                    p-4
                    flex
                    items-center
                    justify-between
                  "
                                    >
                                        <span className="font-medium text-slate-700">
                                            {place}
                                        </span>

                                        <button className="text-red-500 font-medium">
                                            Remove
                                        </button>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* ACCOUNT STATS */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-6">
                            Travel Stats
                        </h2>

                        <div className="space-y-5">
                            <div className="flex justify-between">
                                <span className="text-slate-500">
                                    Trips Created
                                </span>

                                <span className="font-bold text-emerald-600">
                                    12
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-500">
                                    Countries
                                </span>

                                <span className="font-bold text-emerald-600">
                                    8
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-500">
                                    Activities
                                </span>

                                <span className="font-bold text-emerald-600">
                                    34
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* DANGER ZONE */}
                    <div className="bg-white border border-red-200 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">
                            Danger Zone
                        </h2>

                        <p className="text-slate-500 mb-6">
                            Permanently delete your account and all associated
                            trips.
                        </p>

                        <button
                            className="
                w-full
                bg-red-500
                hover:bg-red-600
                text-white
                py-4
                rounded-2xl
                font-semibold
                transition
              "
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default SettingsPage;
