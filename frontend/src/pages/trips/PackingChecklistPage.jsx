import { useEffect, useState } from "react";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

import { Backpack, Plus, Trash2 } from "lucide-react";

function PackingChecklistPage() {
    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [trips, setTrips] = useState([]);

    const [selectedTrip, setSelectedTrip] = useState("");

    const [items, setItems] = useState([]);

    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        fetchTrips();
    }, []);

    useEffect(() => {
        if (selectedTrip) {
            fetchChecklist();
        }
    }, [selectedTrip]);

    const fetchTrips = async () => {
        try {
            const res = await api.get("/trips");

            setTrips(res.data.trips);

            if (res.data.trips.length > 0) {
                setSelectedTrip(res.data.trips[0].id);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);

            setLoading(false);
        }
    };

    const fetchChecklist = async () => {
        try {
            setLoading(true);

            const res = await api.get(`/checklist/${selectedTrip}`);

            setItems(res.data.items);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async () => {
        try {
            if (!newItem.trim()) return;

            setSaving(true);

            await api.post(`/checklist/${selectedTrip}`, {
                title: newItem,
            });

            setNewItem("");

            fetchChecklist();
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async (itemId) => {
        try {
            await api.patch(`/checklist/${itemId}`);

            fetchChecklist();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            await api.delete(`/checklist/${itemId}`);

            fetchChecklist();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainLayout>
            {/* HEADER */}
            <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                    <div
                        className="
                            h-16
                            w-16
                            rounded-3xl
                            bg-emerald-100
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <Backpack className="text-emerald-600 h-8 w-8" />
                    </div>

                    <div>
                        <h1 className="text-5xl font-bold">
                            Packing Checklist 🎒
                        </h1>

                        <p className="text-slate-500 text-lg mt-2">
                            Never forget important travel essentials.
                        </p>
                    </div>
                </div>
            </div>

            {/* EMPTY TRIPS */}
            {trips.length === 0 ? (
                <div
                    className="
                        bg-white
                        border
                        border-slate-200
                        rounded-3xl
                        p-16
                        text-center
                    "
                >
                    <h2 className="text-3xl font-bold mb-4">No Trips Found</h2>

                    <p className="text-slate-500">
                        Create a trip first to manage your packing checklist.
                    </p>
                </div>
            ) : (
                <>
                    {/* SELECT TRIP */}
                    <div className="mb-8">
                        <select
                            value={selectedTrip}
                            onChange={(e) => setSelectedTrip(e.target.value)}
                            className="
                                bg-white
                                border
                                border-slate-200
                                rounded-2xl
                                px-5
                                py-4
                                outline-none
                                focus:ring-2
                                focus:ring-emerald-400
                                min-w-[280px]
                            "
                        >
                            {trips.map((trip) => (
                                <option key={trip.id} value={trip.id}>
                                    {trip.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* ADD ITEM */}
                    <div
                        className="
                            bg-white
                            border
                            border-slate-200
                            rounded-3xl
                            p-6
                            mb-8
                            max-w-4xl
                        "
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                placeholder="Add checklist item..."
                                className="
                                    flex-1
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

                            <button
                                onClick={handleAddItem}
                                disabled={saving || !newItem.trim()}
                                className="
                                    bg-emerald-500
                                    hover:bg-emerald-600
                                    disabled:bg-emerald-300
                                    text-white
                                    px-6
                                    py-4
                                    rounded-2xl
                                    font-medium
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    transition
                                "
                            >
                                <Plus size={18} />

                                {saving ? "Adding..." : "Add Item"}
                            </button>
                        </div>
                    </div>

                    {/* LOADING */}
                    {loading ? (
                        <div className="py-20 text-center">
                            <p className="text-slate-500 text-lg">
                                Loading checklist...
                            </p>
                        </div>
                    ) : items.length === 0 ? (
                        <div
                            className="
                                bg-white
                                border
                                border-slate-200
                                rounded-3xl
                                p-16
                                text-center
                                max-w-4xl
                            "
                        >
                            <h2 className="text-3xl font-bold mb-4">
                                Checklist Empty
                            </h2>

                            <p className="text-slate-500">
                                Add travel essentials for your trip.
                            </p>
                        </div>
                    ) : (
                        <div
                            className="
                                bg-white
                                border
                                border-slate-200
                                rounded-3xl
                                p-8
                                max-w-4xl
                            "
                        >
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="
                                                flex
                                                items-center
                                                justify-between
                                                gap-4
                                                p-5
                                                rounded-2xl
                                                border
                                                border-slate-200
                                                hover:bg-slate-50
                                                transition
                                            "
                                    >
                                        <label className="flex items-center gap-4 flex-1 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={item.checked}
                                                onChange={() =>
                                                    handleToggle(item.id)
                                                }
                                                className="
                                                h-5
                                                w-5
                                                 accent-emerald-500
                                                "
                                            />

                                            <span
                                                className={`text-lg font-medium ${
                                                    item.checked
                                                        ? "line-through text-slate-400"
                                                        : "text-slate-700"
                                                }`}
                                            >
                                                {item.label}
                                            </span>
                                        </label>

                                        <button
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="
                                                    h-11
                                                    w-11
                                                    rounded-xl
                                                    bg-red-50
                                                    hover:bg-red-100
                                                    text-red-500
                                                    flex
                                                    items-center
                                                    justify-center
                                                    transition
                                                "
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </MainLayout>
    );
}

export default PackingChecklistPage;
