import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    const allowedFields = ["title", "description", "price", "category", "image", "stock"]

    const loadProduct = async () => {
        const res = await api.get('/products');
        const product = res.data.find((p) => p._id === id);
        setForm(product)
    }


    useEffect(() => {
        loadProduct();
    }, [])
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await api.put(`/products/update/${id}`, form)
        alert("updated successfully");
        navigate("/admin/products")

    };


    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg border">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                Edit Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {
                    allowedFields.map((key) => (
                        allowedFields.includes(key) &&
                        <input
                            key={key}
                            name={key}
                            value={form?.[key]|| ""}
                            onChange={handleChange}
                            placeholder={`Enter ${key}`}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))
                }

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
                >
                    update Product
                </button>
            </form>
        </div>
    )


}


