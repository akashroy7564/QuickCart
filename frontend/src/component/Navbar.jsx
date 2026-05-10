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

    const handleClick = () => {
        setIson(!ison);
    }


    return (
        <nav className="sticky top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* LOGO */}
                <h1 className="text-2xl font-bold text-blue-600">
                    QuickCart
                </h1>
                {/* Search Function */}
                <input placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/4 px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" />

                {/* category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-40 px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
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

                {/* NAV LINKS */}
                <div className="flex items-center gap-6">

                    {/* {
                        !userId ? (
                            <>
                                <Link
                                    to="/"
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    Home
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/home"
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    Home
                                </Link>
                            </>
                        )
                    } */}


                    <Link
                        to="/"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Products
                    </Link>

                    {/* LOGIN BUTTON */}

                    {
                        userId ? (
                            <>

                                <Link to="/cart" className="relative w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300">
                                    <span>🛒</span>
                                    {
                                        cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded">{cartCount}</span>
                                        )
                                    }
                                </Link>
                                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 hover:scale-105 transition-all duration-200">
                                    Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Login</Link>
                                <Link to="/signup" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">SignUp</Link>
                            </>
                        )
                    }








                    {/* Cart ICON */}
                    {/* <Link to="/cart" className="relative w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300">
                        <span>🛒</span>
                        {
                            cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded">{cartCount}</span>
                            )
                        }
                    </Link> */}

                </div>
            </div>
        </nav>
    )
}