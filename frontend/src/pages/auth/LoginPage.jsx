import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import useAuthStore from "../../store/authStore";

function LoginPage() {
    const [formData, setFormData] = useState({
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

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const res = await api.post("/auth/login", formData);

            setAuth({
                user: res.data.user,
                token: res.data.token,
            });

            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 shadow-2xl backdrop-blur-xl p-8">
                <h1 className="text-4xl font-bold mb-2">Traveloop</h1>

                <p className="text-slate-400 mb-8">
                    Plan journeys beautifully.
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
                    />

                    <input
                        name="password"
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
                    />

                    <button className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition font-semibold">
                        Login
                    </button>
                </form>

                <p className="mt-6 text-slate-400">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-indigo-400">
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
