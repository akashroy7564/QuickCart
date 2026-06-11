import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router";
import Navbar from "../component/Navbar";
import ProductGrid from "../component/productPage";


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
            return;
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
        <div className="bg-green-50">
            {/* NAVBAR */}
            <Navbar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
            />

            <div className="max-w-7xl mx-auto px-4 py-4">

                <div className="flex items-center gap-2 text-sm text-gray-600">

                    <Link
                        to="/"
                        className="hover:text-green-600 transition"
                    >
                        Home
                    </Link>

                    <span>/</span>

                    <Link
                        to="/products"
                        className="hover:text-green-600 transition"
                    >
                        Products
                    </Link>
                </div>
            </div>


            {/* product GRID */}

            <div className="max-w-7xl  mx-auto px-4 py-10">

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-8">
                    🔥Home Products
                </h1>

                {/* Grid */}
                <ProductGrid
                    products={products}
                    addToCart={addToCart}

                />

                {/* ✅ Toast Message */}
                {showMsg && (
                    <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
                        ✅ Product Added to Cart
                    </div>
                )}

            </div>

            {/* SHOW-LOGIN-MODEL  */}

            {showLoginModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">

                        <div className="bg-white/70 rounded-lg shadow-lg p-6 w-80 text-center ">

                            <h2 className="text-xl font-semibold mb-3">
                                Login Required
                            </h2>

                            <p className="text-gray-600 mb-5">
                                Please login first to add products to cart.
                            </p>

                            <div className="flex justify-center gap-3">

                                <button
                                    onClick={() => setShowLoginModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>

                                <Link
                                    to="/login"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Login
                                </Link>

                            </div>

                        </div>

                    </div>
            )}
        </div>
    )
}







