import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api/axios";
import Navbar from "../component/Navbar";



export default function DemoPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);



    const loadDemoProduct = async () => {
        const res = await api.get(`/products?search=${search}&category=${category}`)
        setProducts(res.data);
    }

    const addToCart = async () => {
        setShowLoginModal(true);
    }


    useEffect(() => {
        loadDemoProduct();
    }, [search, category])


    return (
        <div>
            {/* NAVBAR */}
            <Navbar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
            />

            {/* HERO SECTION */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-24 text-center text-white pt-20">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to Laptop Junction DEMO page 💻
                </h1>
                <p className="text-lg mb-6">
                    Best Laptops, Accessories & Parts at Best Prices
                </p>

                <Link
                    to="/products"
                    className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500"
                >
                    Shop Now
                </Link>
            </div>

            {/* Product grid */}
            <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">


                {products.map((product) => (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                        <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
                        >

                            <img
                                src={`https://quickcart-vr1o.onrender.com${product.image}`}
                                alt={product.title}
                                className="w-64 h-64 object-contain"
                            />

                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    {product.title}
                                </h2>

                                <p className="text-blue-600 font-bold text-lg">
                                    ₹{product.price}
                                </p>
                            </div>
                        </Link>
                        <button onClick={() => addToCart(product._id)}
                            className="w-full mt-3 bg-yellow-600 text-white font-medium py-2 rounded-lg shadow hover:bg-blue-700 hover:scale-105 transition duration-200"
                        >Add to cart</button>
                    </div>

                ))}

                {/* SHOW MODAL-LOGIN */}

                {showLoginModal && (

                    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">

                        <div className="bg-white/80 rounded-lg shadow-lg p-6 w-80 text-center">

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


            {/* CONTACT SECTION */}
            <div className="bg-gray-100 py-12">
                <div className="max-w-xl mx-auto px-4 text-center">

                    <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="p-3 border rounded-md"
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                            className="p-3 border rounded-md"
                        />

                        <textarea
                            placeholder="Your Message"
                            className="p-3 border rounded-md"
                        ></textarea>

                        <button className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">
                            Send Message
                        </button>
                    </form>

                </div>
            </div>

            {/* FOOTER */}
            <footer className="bg-black text-white text-center py-4">
                <p>© 2026 Laptop Junction | Designed by Akash</p>
            </footer>

        </div>

    )

}
















