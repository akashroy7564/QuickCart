import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Navbar({ search, setSearch, category, setCategory }) {
    const navigate = useNavigate();
    const [cartCount, SetCartCount] = useState(0);





    const userId = localStorage.getItem("userId")




    useEffect(() => {

        const loadCart = async () => {
            if (!userId) return SetCartCount(0)

            const res = await api.get(`/cart/${userId}`);
            const total = res.data.items.reduce(
                (sum, item) => sum + item.quantity, 0
            );
            SetCartCount(total);
        }
        loadCart();
        window.addEventListener("cartUpdated", loadCart)

        return () => {
            window.removeEventListener("cartUpdated", loadCart)
        }


    }, [userId])

    const logout = () => {
        localStorage.clear();
        SetCartCount(0);
        navigate("/");

    }

    // const handleClick = () => {
    //     setIson(!ison);
    // }


    return (
       <nav className="sticky top-0 left-0 w-full bg-white shadow-md z-50">

    <div className="max-w-7xl mx-auto px-4 py-3">

        <div className="flex items-center justify-between gap-4">

            {/* LOGO */}
            <div className="flex-shrink-0">
                <img
                    src="/Logo.png"
                    alt="QuickCart Logo"
                    className="w-44 h-12 object-contain"
                />
            </div>

            {/* SEARCH */}
            <div className="hidden md:flex flex-1 max-w-md">
                <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* CATEGORY */}
            <div className="hidden lg:block">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-52 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="">All category</option>
                    <option value="Dairy & Bread">Dairy & Bread</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Snack">Snack</option>
                    <option value="Sweet Tooth">Sweet Tooth</option>
                    <option value="Breakfast & Instant Food">Breakfast & Instant Food</option>
                    <option value="Bakery & Biscuits">Bakery & Biscuits</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Cooking-Essentials">Cooking-Essentials</option>
                    <option value="Tea, Coffee & Milk Drinks">Tea,Coffee & Milk Drinks</option>
                    <option value="Atta, Rice & Dal">Atta, Rice & Dal</option>
                    <option value="masala">Masala, Oil & More</option>
                    <option value="House-care">House-care</option>
                    <option value="Sauces & Spreads">Sauces & Spreads</option>
                    <option value="personal-care">personal-care</option>
                    <option value="Dry-fruits">Dry-fruits</option>
                </select>
            </div>

            {/* NAV LINKS */}
            <div className="flex items-center gap-4 flex-shrink-0">

                <Link
                    to="/"
                    className="text-gray-700 hover:text-green-600 font-medium transition"
                >
                    Home
                </Link>

                <Link
                    to="/products"
                    className="text-gray-700 hover:text-green-600 font-medium transition"
                >
                    Products
                </Link>

                <Link
                    to="/about"
                    className="text-gray-700 hover:text-green-600 font-medium transition"
                >
                    About
                </Link>

                {
                    userId ? (
                        <>
                            {/* CART */}
                            <Link
                                to="/cart"
                                className="relative w-10 h-10 flex items-center justify-center bg-green-100 rounded-full hover:bg-green-200 transition"
                            >
                                <span className="text-lg">🛒</span>

                                {
                                    cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                                            {cartCount}
                                        </span>
                                    )
                                }
                            </Link>

                            {/* LOGOUT */}
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* LOGIN */}
                            <Link
                                to="/login"
                                className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-4 py-2 rounded-xl hover:scale-105 transition"
                            >
                                Login
                            </Link>

                            {/* SIGNUP */}
                            <Link
                                to="/signup"
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl hover:scale-105 transition"
                            >
                                SignUp
                            </Link>
                        </>
                    )
                }

            </div>

        </div>

    </div>

</nav>
    )
}