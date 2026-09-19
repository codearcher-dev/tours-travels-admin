import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email");
            return;
        }
        setError("");
        setSubmitted(true);
    };

    const inputClass =
        "block w-full rounded-lg border-0 py-2.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all";

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>

            <div className="w-full max-w-md space-y-8 bg-white p-10 shadow-xl ring-1 ring-gray-900/5 rounded-2xl relative z-10">
                <div className="text-center">
                    <img className="mx-auto h-20 w-auto object-contain" src="/logo.png" alt="Prime Traveller" />
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">Reset Password</h2>
                    <p className="mt-2 text-sm text-gray-500">Enter your email and we'll send a recovery link</p>
                </div>

                {submitted ? (
                    <div className="text-center space-y-6 mt-8">
                        <div className="bg-green-50 border border-green-100 text-green-800 p-6 rounded-xl font-medium shadow-sm">
                            If an account exists for <span className="font-bold">{email}</span>, you will receive a password reset link shortly.
                        </div>
                        <div>
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center gap-2 font-semibold text-primary-600 hover:text-primary-500 transition-colors bg-primary-50 px-6 py-2.5 rounded-lg w-full">
                                <ArrowLeft className="w-4 h-4" />
                                Return to Login
                            </Link>
                        </div>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center font-medium border border-red-100">{error}</div>
                        )}

                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={inputClass}
                                placeholder="Admin Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center items-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:shadow-md">
                                Send Reset Link
                                <Send className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="text-center text-sm pt-2">
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-1 font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Back to login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
