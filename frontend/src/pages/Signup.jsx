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



        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign-up</h2>
                {msg && (
                    <div className="mb-4 text-center text-sm text-blue-600 font-medium">
                        {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        placeholder="Enter name"
                        value={form.value}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Sign-up</button>
                    <Link to="/"><button className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-900 hover:text-white ">GO Home</button></Link>
                </form>
            </div>
        </div>


    )



}