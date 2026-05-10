import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

function NotesPage() {
    const [selectedTrip, setSelectedTrip] = useState("");

    const [loading, setLoading] = useState(true);

    const [notes, setNotes] = useState([]);

    const [content, setContent] = useState("");

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, [selectedTrip]);

    const fetchNotes = async () => {
        try {
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
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">Travel Notes 📝</h1>
                <p className="text-slate-500 text-lg">
                    Save reminders, hotel details and important information.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* ADD NOTE */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Add Note</h2>

                    <textarea
                        rows="12"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your notes here..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
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
                        disabled={saving}
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
                            <p className="text-slate-500">Loading notes...</p>
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
        </MainLayout>
    );
}

export default NotesPage;
