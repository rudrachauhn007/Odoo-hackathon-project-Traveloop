import MainLayout from "../../layout/MainLayout";

const items = [
    "Passport",
    "Flight Tickets",
    "Camera",
    "Power Bank",
    "Jackets",
    "Shoes",
];

function PackingChecklistPage() {
    return (
        <MainLayout>
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-3">
                    Packing Checklist 🎒
                </h1>

                <p className="text-slate-500 text-lg">
                    Never forget important travel essentials.
                </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-3xl">
                <div className="space-y-4">
                    {items.map((item) => (
                        <label
                            key={item}
                            className="
                flex
                items-center
                gap-4
                p-5
                rounded-2xl
                border
                border-slate-200
                hover:bg-slate-50
                cursor-pointer
              "
                        >
                            <input
                                type="checkbox"
                                className="h-5 w-5 accent-emerald-500"
                            />

                            <span className="text-lg font-medium">{item}</span>
                        </label>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

export default PackingChecklistPage;
