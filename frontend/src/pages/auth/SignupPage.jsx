import { Link } from "react-router-dom";

import { useState } from "react";

import { Camera } from "lucide-react";

import api from "../../lib/axios";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

function SignupPage() {
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const setAuth = useAuthStore((state) => state.setAuth);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // store actual file
            setPreview(file);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const submitData = new FormData();

            submitData.append("fullName", formData.fullName);

            submitData.append("email", formData.email);

            submitData.append("password", formData.password);

            if (preview) {
                submitData.append("profileImage", preview);
            }

            const res = await api.post("/auth/signup", submitData);

            setAuth({
                user: res.data.user,
                token: res.data.token,
            });

            navigate("/dashboard");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-10">
            <div
                className="
          w-full
          max-w-lg
          rounded-3xl
          border
          border-slate-200
          bg-white/80
          shadow-2xl
          backdrop-blur-xl
          p-8
        "
            >
                <h1 className="text-4xl font-bold mb-2 text-slate-900">
                    Create Account
                </h1>

                <p className="text-slate-500 mb-8">
                    Start planning your next adventure.
                </p>

                {/* PROFILE IMAGE */}
                <div className="flex justify-center mb-8">
                    <label className="relative cursor-pointer">
                        <div
                            className="
                h-28
                w-28
                rounded-full
                overflow-hidden
                border-4
                border-emerald-100
                bg-slate-100
                flex
                items-center
                justify-center
              "
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Camera className="text-slate-400" size={32} />
                            )}
                        </div>

                        <div
                            className="
                absolute
                bottom-0
                right-0
                bg-emerald-500
                text-white
                rounded-full
                p-2
                shadow-lg
              "
                        >
                            <Camera size={16} />
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>

                <p className="text-center text-sm text-slate-500 mb-8">
                    Profile photo is optional
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <input
                        name="fullName"
                        onChange={handleChange}
                        type="text"
                        placeholder="Full Name"
                        className="
              w-full
              rounded-2xl
              bg-slate-50
              border
              border-slate-200
              px-4
              py-4
              outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
                    />

                    <input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        placeholder="Email"
                        className="
              w-full
              rounded-2xl
              bg-slate-50
              border
              border-slate-200
              px-4
              py-4
              outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
                    />

                    <input
                        name="password"
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        className="
              w-full
              rounded-2xl
              bg-slate-50
              border
              border-slate-200
              px-4
              py-4
              outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
                    />

                    <button
                        className="
              w-full
              py-4
              rounded-2xl
              bg-emerald-500
              hover:bg-emerald-600
              text-white
              transition
              font-semibold
              text-lg
            "
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-slate-500 text-center">
                    Already have an account?{" "}
                    <Link to="/" className="text-emerald-600 font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;
