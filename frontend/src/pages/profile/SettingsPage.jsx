import MainLayout from "../../layout/MainLayout";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../lib/axios";
import useAuthStore from "../../store/authStore";

function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState("https://i.pravatar.cc/150");
    const user = useAuthStore((state) => state.user);
    const setAuth = useAuthStore((state) => state.setAuth);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        bio: "",
        language: "English",
        role: "user",
    });

    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const res = await api.get("/users/me");

            const currentUser = res.data.user;

            setFormData({
                fullName: currentUser.fullName || "",

                email: currentUser.email || "",

                bio: currentUser.bio || "",

                language: "English",

                role: currentUser.role || "user",
            });

            if (currentUser.profileImage) {
                setPreview(currentUser.profileImage);
            }

            setAuth({
                user: currentUser,

                token: localStorage.getItem("token"),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        logout();

        navigate("/login");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageFile(file);

            setPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,

            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);

            const submitData = new FormData();

            submitData.append("fullName", formData.fullName);

            submitData.append("bio", formData.bio);

            if (imageFile) {
                submitData.append("profileImage", imageFile);
            }

            const res = await api.put("/users/profile", submitData);

            setAuth({
                user: res.data.user,

                token: localStorage.getItem("token"),
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            {/* HEADER */}
            <div className="mb-10">
                <h1 className="text-5xl font-bold text-slate-900 mb-3">
                    Profile & Settings 
                </h1>

                <p className="text-slate-500 text-lg">
                    Manage your profile, preferences and travel identity.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* LEFT */}
                <div className="xl:col-span-2 space-y-8">
                    {/* PROFILE */}
                    <div
                        className="
                            bg-white
                            border
                            border-slate-200
                            rounded-3xl
                            p-8
                            shadow-sm
                        "
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                            {/* IMAGE */}
                            <div className="relative w-fit">
                                <div
                                    className="
                                        h-32
                                        w-32
                                        rounded-full
                                        overflow-hidden
                                        border-4
                                        border-emerald-100
                                        shadow-lg
                                    "
                                >
                                    <img
                                        src={preview}
                                        alt="profile"
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                        "
                                    />
                                </div>

                                <label
                                    className="
                                        absolute
                                        bottom-1
                                        right-1
                                        bg-emerald-500
                                        hover:bg-emerald-600
                                        text-white
                                        p-3
                                        rounded-full
                                        cursor-pointer
                                        shadow-lg
                                        transition
                                    "
                                >
                                    <Camera size={18} />

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {/* INFO */}
                            <div>
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                                    {formData.fullName}
                                </h2>

                                <p className="text-slate-500 mb-5">
                                    {formData.bio ||
                                        "Travel enthusiast exploring the world."}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <span
                                        className={`
                                            px-4
                                            py-2
                                            rounded-full
                                            text-sm
                                            font-medium

                                            ${
                                                formData.role === "admin"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-emerald-100 text-emerald-600"
                                            }
                                        `}
                                    >
                                        <p className="font-semibold text-slate-800 capitalize">
                                            {formData.role}
                                        </p>
                                    </span>

                                    <span
                                        className="
                                            bg-teal-50
                                            text-teal-600
                                            px-4
                                            py-2
                                            rounded-full
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        Explorer
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* FORM */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* FULL NAME */}
                            <div>
                                <label className="block mb-3 font-semibold text-slate-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
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

                            {/* EMAIL */}
                            <div>
                                <label className="block mb-3 font-semibold text-slate-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    disabled
                                    value={formData.email}
                                    className="
                                        w-full
                                        border
                                        border-slate-200
                                        rounded-2xl
                                        px-5
                                        py-4
                                        bg-slate-100
                                        outline-none
                                    "
                                />
                            </div>
                        </div>

                        {/* BIO */}
                        <div className="mt-6">
                            <label className="block mb-3 font-semibold text-slate-700">
                                Bio
                            </label>

                            <textarea
                                rows="4"
                                name="bio"
                                value={formData.bio}
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
                            ></textarea>
                        </div>
                    </div>

                    {/* PREFERENCES */}
                    <div
                        className="
                            bg-white
                            border
                            border-slate-200
                            rounded-3xl
                            p-8
                            shadow-sm
                        "
                    >
                        <h2 className="text-2xl font-bold mb-8">Preferences</h2>

                        <div>
                            <label className="block mb-3 font-semibold text-slate-700">
                                Preferred Language
                            </label>

                            <select
                                name="language"
                                value={formData.language}
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
                            >
                                <option>English</option>

                                <option>Hindi</option>

                                <option>French</option>
                            </select>
                        </div>
                    </div>

                    {/* SAVE */}
                    <button
                        onClick={handleUpdateProfile}
                        disabled={loading}
                        className="
                            bg-emerald-500
                            hover:bg-emerald-600
                            disabled:bg-emerald-300
                            text-white
                            px-8
                            py-4
                            rounded-2xl
                            font-semibold
                            text-lg
                            shadow-lg
                            transition
                        "
                    >
                        {loading ? "Saving..." : "Save Profile Changes"}
                    </button>
                </div>

                {/* RIGHT */}
                <div className="space-y-8">
                    {/* ACCOUNT OVERVIEW */}
                    <div
                        className="
                            bg-white
                            border
                            border-slate-200
                            rounded-3xl
                            p-8
                            shadow-sm
                        "
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    Account Overview
                                </h2>

                                <p className="text-slate-500 mt-1">
                                    Your travel identity and account details.
                                </p>
                            </div>

                            <div
                                className={`
                                    px-4
                                    py-2
                                    rounded-full
                                    text-sm
                                    font-semibold

                                    ${
                                        formData.role === "admin"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-emerald-100 text-emerald-600"
                                    }
                                `}
                            >
                                {formData.role === "admin"
                                    ? "Administrator"
                                    : "Traveler"}
                            </div>
                        </div>

                        <div className="space-y-5">
                            {/* EMAIL */}
                            <div
                                className="
                                    border
                                    border-slate-200
                                    rounded-2xl
                                    p-5
                                "
                            >
                                <p className="text-slate-500 text-sm mb-2">
                                    Email Address
                                </p>

                                <p className="font-semibold text-slate-800 break-all">
                                    {formData.email}
                                </p>
                            </div>

                            {/* ROLE */}
                            <div
                                className="
                                    border
                                    border-slate-200
                                    rounded-2xl
                                    p-5
                                "
                            >
                                <p className="text-slate-500 text-sm mb-2">
                                    Account Role
                                </p>

                                <p className="font-semibold text-slate-800 capitalize">
                                    {formData.role}
                                </p>
                            </div>

                            {/* STATUS */}
                            <div
                                className="
                                    border
                                    border-slate-200
                                    rounded-2xl
                                    p-5
                                "
                            >
                                <p className="text-slate-500 text-sm mb-2">
                                    Member Status
                                </p>

                                <p className="font-semibold text-emerald-600">
                                    Active Explorer 🌍
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* DANGER ZONE */}
                    <div
                        className="
                            bg-white
                            border
                            border-red-200
                            rounded-3xl
                            p-8
                            shadow-sm
                        "
                    >
                        <h2 className="text-2xl font-bold text-red-500 mb-4">
                            Danger Zone
                        </h2>

                        <p className="text-slate-500 mb-6">
                            Permanently delete your account and travel history.
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

                        <button
                            onClick={handleLogout}
                            className="
        w-full
        bg-slate-900
        hover:bg-slate-800
        text-white
        py-4
        mt-3
        rounded-2xl
        font-semibold
        transition
    "
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default SettingsPage;
