import { Link } from "react-router-dom";

function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                <h1 className="text-4xl font-bold mb-2">Create Account</h1>

                <p className="text-slate-400 mb-8">
                    Start planning your adventures.
                </p>

                <form className="space-y-5">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none"
                    />

                    <button className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition">
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-slate-400">
                    Already have an account?{" "}
                    <Link to="/" className="text-violet-400">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;
