import React, { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";

export default function CheckoutAddress() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: ""

    });
    const [Error, setError]=useState("")
    

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        
    };





const saveAddress = async (e) => {
    e.preventDefault();

    for (let key in form) {
        if (!form[key].trim()) {
            alert(`${key} is required`);
            setError(`${key} is required`)
            return;
        }
    }


    await api.post("/address/add", {
        ...form,
        userId,
    });
    navigate("/checkout");
}

return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Delivery Address
            </h2>

            <div className="grid grid-cols-1 gap-4">

                {Object.keys(form).map((key) => (
                    <div key={key} className="flex flex-col">

                        <label className="text-sm text-gray-600 mb-1 capitalize">
                            {key}
                        </label>

                        <input
                            name={key}
                            placeholder={`Enter ${key}`}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />

                    </div>
                ))}
                <p className="text-red-600 text-sm mt-1 font-medium">{Error}</p>

            </div>

            <button
                onClick={saveAddress}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
                Save Address
            </button>

        </div>

    </div>
)




}