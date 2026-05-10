import { useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../../layout/MainLayout";

import api from "../../lib/axios";

function CreateTripPage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [preview, setPreview] = useState(null);

    const [coverImage, setCoverImage] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setCoverImage(file);

            setPreview(URL.createObjectURL(file));
        }
    };

    const handleCreateTrip = async () => {
        try {
            setLoading(true);

            const submitData = new FormData();

            submitData.append("title", formData.title);

            submitData.append("description", formData.description);

            submitData.append("startDate", formData.startDate);

            submitData.append("endDate", formData.endDate);

            submitData.append("budget", formData.budget);

            if (coverImage) {
                submitData.append("coverImage", coverImage);
            }

            await api.post("/trips", submitData);

            navigate("/trips");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-5xl font-bold text-slate-900 mb-3">
                        Create New Trip 
                    </h1>

                    <p className="text-slate-500 text-lg">
                        Start planning your next unforgettable journey.
                    </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <div className="space-y-8">
                        {/* TITLE */}
                        <div>
                            <label className="block mb-3 font-semibold text-slate-700">
                                Trip Name
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Summer Europe Tour"
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

                        {/* DATES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-3 font-semibold text-slate-700">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
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
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
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

                        {/* BUDGET */}
                        <div>
                            <label className="block mb-3 font-semibold text-slate-700">
                                Estimated Budget
                            </label>

                            <input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                placeholder="5000"
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

                        {/* DESCRIPTION */}
                        <div>
                            <label className="block mb-3 font-semibold text-slate-700">
                                Description
                            </label>

                            <textarea
                                rows="5"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your trip..."
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
                            ></textarea>
                        </div>

                        {/* IMAGE */}
                        <div>
                            <label className="block mb-3 font-semibold text-slate-700">
                                Cover Image
                            </label>

                            <label
                                className="
                                    border-2
                                    border-dashed
                                    border-slate-300
                                    rounded-3xl
                                    p-12
                                    text-center
                                    bg-slate-50
                                    block
                                    cursor-pointer
                                    overflow-hidden
                                "
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="
                                            w-full
                                            h-72
                                            object-cover
                                            rounded-2xl
                                        "
                                    />
                                ) : (
                                    <p className="text-slate-500">
                                        Upload trip cover image
                                    </p>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={handleCreateTrip}
                            disabled={loading}
                            className="
                                w-full
                                bg-emerald-500
                                hover:bg-emerald-600
                                disabled:bg-emerald-300
                                text-white
                                py-4
                                rounded-2xl
                                font-semibold
                                text-lg
                                transition
                            "
                        >
                            {loading ? "Creating Trip..." : "Create Trip"}
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default CreateTripPage;
