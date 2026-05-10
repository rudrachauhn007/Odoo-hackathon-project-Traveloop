import { useEffect, useState } from "react";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

function NotesPage() {
    const [trips, setTrips] = useState([]);

    const [selectedTrip, setSelectedTrip] = useState("");

    const [loading, setLoading] = useState(true);

    const [notes, setNotes] = useState([]);

    const [content, setContent] = useState("");

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchTrips();
    }, []);

    useEffect(() => {
        if (selectedTrip) {
            fetchNotes();
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

    const fetchNotes = async () => {
        try {
            setLoading(true);

            const res = await api.get(`/notes/${selectedTrip}`);

            setNotes(res.data.notes);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNote = async () => {
        try {
            if (!content.trim()) return;

            setSaving(true);

            await api.post(`/notes/${selectedTrip}`, {
                content,
            });

            setContent("");

            fetchNotes();
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <MainLayout>
            {/* HEADER */}
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">Travel Notes </h1>

                <p className="text-slate-500 text-lg">
                    Save reminders, hotel details and important information.
                </p>
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
                        Create a trip first to start adding notes.
                    </p>
                </div>
            ) : (
                <>
                    {/* TRIP SELECT */}
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

                    {/* CONTENT */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* ADD NOTE */}
                        <div
                            className="
                                bg-white
                                border
                                border-slate-200
                                rounded-3xl
                                p-8
                            "
                        >
                            <h2 className="text-2xl font-bold mb-6">
                                Add Note
                            </h2>

                            <textarea
                                rows="12"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your notes here..."
                                className="
                                    w-full
                                    border
                                    border-slate-200
                                    rounded-2xl
                                    p-5
                                    outline-none
                                    focus:ring-2
                                    focus:ring-emerald-400
                                "
                            ></textarea>

                            <button
                                onClick={handleAddNote}
                                disabled={saving || !content.trim()}
                                className="
                                    mt-6
                                    bg-emerald-500
                                    hover:bg-emerald-600
                                    disabled:bg-emerald-300
                                    text-white
                                    px-6
                                    py-3
                                    rounded-2xl
                                    font-medium
                                    transition
                                "
                            >
                                {saving ? "Saving..." : "Save Note"}
                            </button>
                        </div>

                        {/* NOTES LIST */}
                        <div className="space-y-5">
                            {loading ? (
                                <div
                                    className="
                                        bg-white
                                        border
                                        border-slate-200
                                        rounded-3xl
                                        p-8
                                        text-center
                                    "
                                >
                                    <p className="text-slate-500">
                                        Loading notes...
                                    </p>
                                </div>
                            ) : notes.length === 0 ? (
                                <div
                                    className="
                                        bg-white
                                        border
                                        border-slate-200
                                        rounded-3xl
                                        p-8
                                        text-center
                                    "
                                >
                                    <h2 className="text-2xl font-bold mb-3">
                                        No Notes Yet
                                    </h2>

                                    <p className="text-slate-500">
                                        Your travel notes will appear here.
                                    </p>
                                </div>
                            ) : (
                                notes.map((note) => (
                                    <div
                                        key={note.id}
                                        className="
                                                bg-white
                                                border
                                                border-slate-200
                                                rounded-3xl
                                                p-6
                                            "
                                    >
                                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                            {note.content}
                                        </p>

                                        <p className="text-sm text-slate-400 mt-4">
                                            {new Date(
                                                note.createdAt,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </MainLayout>
    );
}

export default NotesPage;
