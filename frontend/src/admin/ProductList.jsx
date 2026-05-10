import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function ProductsList() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const loadProducts = async () => {
        const response = await api.get(`/products?search=${search}`);
        setProducts(response.data);
    };

    const deletedProduct = async (id) => {
        try {
            await api.delete(`/products/delete/${id}`);
            alert("Product deleted successfully");
            loadProducts();
        } catch (err) {
            console.error("Error in deleting Product", err);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [search]);

    return (

        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">

            {/* Search Function */}
                <input placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/4 px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" />


            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-700">Product List</h2>

                <Link
                    to="/admin/products/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    + Add New Product
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">Title</th>
                            <th className="p-3 border">Price</th>
                            <th className="p-3 border">Stock</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="text-center hover:bg-gray-50">

                                <td className="p-3 border">{product.title}</td>

                                <td className="p-3 border text-green-600 font-semibold">
                                    ₹{product.price}
                                </td>

                                <td className="p-3 border">
                                    {product.stock}
                                </td>

                                <td className="p-3 border space-x-3">

                                    <Link
                                        to={`/admin/products/update/${product._id}`}
                                        className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => deletedProduct(product._id)}
                                        className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}


