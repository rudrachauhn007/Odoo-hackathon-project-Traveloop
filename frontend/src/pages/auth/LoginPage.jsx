import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 shadow-2xl backdrop-blur-xl p-8">
                <h1 className="text-4xl font-bold mb-2">Traveloop</h1>

                <p className="text-slate-400 mb-8">
                    Plan journeys beautifully.
                </p>

                <form className="space-y-5">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
                    />

                    <input
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
