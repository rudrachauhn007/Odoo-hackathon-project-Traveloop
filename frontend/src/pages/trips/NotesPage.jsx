import MainLayout from "../../layout/MainLayout";

function NotesPage() {
    return (
        <MainLayout>
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">Travel Notes 📝</h1>

                <p className="text-slate-500 text-lg">
                    Save reminders, hotel details and important information.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Add Note</h2>

                    <textarea
                        rows="12"
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
                        className="
              mt-6
              bg-emerald-500
              hover:bg-emerald-600
              text-white
              px-6
              py-3
              rounded-2xl
              font-medium
            "
                    >
                        Save Note
                    </button>
                </div>

                <div className="space-y-5">
                    {[1, 2, 3].map((note) => (
                        <div
                            key={note}
                            className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-6
              "
                        >
                            <p className="text-slate-700 leading-relaxed">
                                Remember hotel check-in starts at 2 PM. Keep
                                passports ready.
                            </p>

                            <p className="text-sm text-slate-400 mt-4">
                                12 June 2026
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

export default NotesPage;
