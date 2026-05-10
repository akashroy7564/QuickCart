import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router";
import Navbar from "../component/Navbar";


export default function Product() {
    const [products, setProducts] = useState([]);            //GOing from home
    const [search, setSearch] = useState("");                //GOing from home
    const [category, setCategory] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);


    const loadProducts = async () => {
        const res = await api.get(`/products?search=${search}&category=${category}`);
        setProducts(res.data)
    }

    useEffect(() => {
        loadProducts()
    }, [search, category]);

    if (!products) {
        return (
            <div><h1>Loading...</h1></div>
        )
    }


    const addToCart = async (productId) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            setShowLoginModal(true)
        }

        const res = await api.post(`/cart/add`, { userId, productId });
        const total = res.data.cart.items.reduce(
            (sum, item) => sum + item.productId.price * item.quantity, 0
        );
        setShowMsg(true);
        setTimeout(() => {
            setShowMsg(false)
        }, 2000)

        localStorage.setItem("cartCount", total)
        window.dispatchEvent(new Event("cartUpdated"))

    }






    return (
        <div className="bg-gray-100">
            {/* NAVBAR */}
            <Navbar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
            />

            {/* product GRID */}

            <div className="max-w-7xl  mx-auto px-4 py-10">

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-8">
                    🔥Home Products
                </h1>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {products.map((p) => (
                        <div
                            key={p._id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col px-4 py-2"
                        >

                            {/* Image */}
                            <div className="h-68 flex items-center justify-center bg-white border border-gray-300 ">
                                <Link to={`/product/${p._id}`}>
                                <img
                                    src={`http://localhost:5001${p.image}`}
                                    alt={p.title}
                                    className="h-64 w-50 object-contain overflow-hidden transition-transform duration-500 hover:scale-120 overflow-hidden"
                                /> </Link>

                            </div>

                            {/* Info */}
                            <div className="p-4 flex flex-col flex-grow">

                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                    {p.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {p.description}
                                </p>

                                <p className="text-xl font-semibold text-black-400 mt-2">
                                    ₹{p.price}
                                </p>

                                {/* Buttons */}
                                <div className="flex gap-2 mt-auto pt-4">

                                    {/* View Button */}
                                    {/* <Link to={`/product/${p._id}`} className="w-1/2">
                                        <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
                                            View
                                        </button>
                                    </Link> */}

                                    {/* Add Button */}
                                    <button
                                        onClick={() => addToCart(p._id)}
                                        className="w-full border border-red-600 text-red-600 text-xl py-2 rounded-lg hover:bg-red-600 hover:text-white hover:scale-105 transition"
                                    >
                                        Add
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>

                {/* ✅ Toast Message */}
                {showMsg && (
                    <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
                        ✅ Product Added to Cart
                    </div>
                )}

            </div>
        </div>
    )
}







