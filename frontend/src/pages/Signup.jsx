import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import api from "../api/axios";

export default function signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [msg, setMsg] = useState("")

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/signup", form);
            setMsg(response.data.message);

        } catch (err) {
            setMsg(err.response?.data?.message || "Error occured");
        }
    }

    return (


        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-green-100">

                {/* Logo / Brand */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src="/Logo.png"
                        alt="Quick Cart"
                        className="w-64 md:w-80 object-contain"
                    />

                    <p className="text-gray-500 text-center mt-2">
                        Create your account and start shopping
                    </p>
                </div>

                {msg && (
                    <div className="mb-4 text-center text-sm text-green-700 bg-green-100 py-2 rounded-lg">
                        {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="name"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Create password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300"
                    >
                        Create Account
                    </button>

                    <Link to="/" className="block">
                        <button
                            type="button"
                            className="w-full border border-green-600 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition duration-300"
                        >
                            Back to Home
                        </button>
                    </Link>

                </form>

                <div className="mt-6 text-center text-gray-600">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-green-600 font-semibold ml-2 hover:underline"
                    >
                        Login
                    </Link>
                </div>

            </div>

        </div>


    )



}