import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { Pencil, Trash2, X, Check } from "lucide-react";

function NotesPage() {
    // Initial dummy data
    const [notes, setNotes] = useState([
        {
            id: 1,
            text: "Remember hotel check-in starts at 2 PM. Keep passports ready.",
            date: "12 June 2026",
        },
        {
            id: 2,
            text: "Buy travel insurance before Friday.",
            date: "10 June 2026",
        },
        {
            id: 3,
            text: "Don't forget the power adapters for Europe.",
            date: "09 June 2026",
        }
    ]);

    const [newNote, setNewNote] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleAddNote = () => {
        if (!newNote.trim()) return;
        
        const dateObj = new Date();
        const formattedDate = dateObj.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const newNoteObj = {
            id: Date.now(),
            text: newNote,
            date: formattedDate
        };

        setNotes([newNoteObj, ...notes]);
        setNewNote("");
    };

    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleEditStart = (note) => {
        setEditingId(note.id);
        setEditText(note.text);
    };

    const handleEditSave = (id) => {
        if (!editText.trim()) return;
        setNotes(notes.map(note => note.id === id ? { ...note, text: editText } : note));
        setEditingId(null);
        setEditText("");
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditText("");
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
                <div className="bg-white border border-slate-200 rounded-3xl p-8 h-fit">
                    <h2 className="text-2xl font-bold mb-6">Add Note</h2>

                    <textarea
                        rows="10"
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
                            resize-none
                        "
                    ></textarea>

                    <button
                        onClick={handleAddNote}
                        className="
                            mt-6
                            bg-emerald-500
                            hover:bg-emerald-600
                            text-white
                            px-6
                            py-3
                            rounded-2xl
                            font-medium
                            transition
                        "
                    >
                        Save Note
                    </button>
                </div>

                <div className="space-y-5">
                    {notes.length === 0 ? (
                        <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center">
                            <p className="text-slate-500 text-lg">No notes found. Create your first note!</p>
                        </div>
                    ) : (
                        notes.map((note) => (
                            <div
                                key={note.id}
                                className="bg-white border border-slate-200 rounded-3xl p-6 relative group transition-all hover:shadow-sm"
                            >
                                {editingId === note.id ? (
                                    <div className="flex flex-col gap-3">
                                        <textarea
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            rows="4"
                                            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                                        />
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={handleEditCancel}
                                                className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition flex items-center gap-1 text-sm font-medium"
                                            >
                                                <X size={16} /> Cancel
                                            </button>
                                            <button 
                                                onClick={() => handleEditSave(note.id)}
                                                className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition flex items-center gap-1 text-sm font-medium"
                                            >
                                                <Check size={16} /> Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Action Buttons (Always Visible) */}
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <button 
                                                onClick={() => handleEditStart(note)}
                                                className="px-3 py-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition flex items-center gap-1.5 text-sm font-medium border border-slate-200 hover:border-emerald-200 bg-white"
                                            >
                                                <Pencil size={14} /> Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteNote(note.id)}
                                                className="px-3 py-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-1.5 text-sm font-medium border border-slate-200 hover:border-red-200 bg-white"
                                            >
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>

                                        <p className="text-slate-700 leading-relaxed pr-40 whitespace-pre-wrap">
                                            {note.text}
                                        </p>

                                        <p className="text-sm text-slate-400 mt-4">
                                            {note.date}
                                        </p>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

export default NotesPage;
