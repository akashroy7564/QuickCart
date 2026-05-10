import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link, Navigate, useNavigate } from "react-router";
import Navbar from "../component/Navbar";
import HeroSlider from "../component/Hero";


export default function Home() {
    const [products, setProducts] = useState([]);            //GOing from home
    const [search, setSearch] = useState("");                //GOing from home
    const [category, setCategory] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [ison, setIson] = useState(false);
    const [msg, setMsg] = useState(false)
    const [contact, setContact] = useState({
        name: "",
        email: "",
        message: ""
    });


    const loadProducts = async () => {
        const res = await api.get(`/products?search=${search}&category=${category}`);
        setProducts(res.data)
    }

    useEffect(() => {
        loadProducts()

    }, [search, category]);


    const addToCart = async (productId) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            // alert("please login first");
            setShowLoginModal(true);
            return;
        }
        const res = await api.post(`/cart/add`, { userId, productId });
        const total = res.data.cart.items.reduce(
            (sum, item) => sum + item.productId.price * item.quantity, 0
        );

        setShowMsg(true);
        setTimeout(() => {
            setShowMsg(false)
        }, 1000)

        localStorage.setItem("cartCount", total)
        window.dispatchEvent(new Event("cartUpdated"))

    }


    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post("/contact", contact);
            setMsg(response.data.message);
            setContact({
                name: "",
                email: "",
                message: ""
            })

        } catch (err) {
            alert(err);
        }

    }





    const categories = [
        { name: "Dairy & Bread ", value:"dairy",  image: "milk &Dairy.png" },
        { name: "Vegetables",  value:" vegetable", image: "vegetable.png" },
        { name: "Cold Drinks & Juices",  value:"Beverage",image: "cold-drink.png" },
        { name: "Snack", value:"Snack",  image: "snacks.png" },
        { name: "Breakfast & Instant Food", value:"instant-food",  image: "maggies.png" },
        { name: "Sweet Tooth", value:"Ice_cream",  image: "Ice-Cream.png" },
        { name: "Bakery & Biscuits", value:"Biscuits",  image: "biscuits.png" },
        { name: "Tea, Coffee & Milk Drinks", value:"Tea",  image: "tea&Coffee.png" },
        { name: "Atta, Rice & Dal", value:"Rice",  image: "Atta rice.png" },
        { name: "Masala, Oil & Sugar", value:"masala",  image: "masala oil.png" },
        { name: "Sauces & Spreads", value:"Sauces",  image: "Sauces & Spread.png" },
        { name: "Cleaning Essentials", value:" House-care",  image: "cleaning.png" },
        { name: "Home & Office", value:"",  image: "/icons/home.png" },
        { name: "personal-care", value:"",  image: "/icons/personal.png" },
    ];







    return (
        <div className="bg-gray-50 " >



            {/* NAVBAR */}
            <Navbar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                ison={ison}
                setIson={setIson}
            />




            {/* HERO SECTION */}

            <HeroSlider />







            {/* CATEGORY SECTION */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">

                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            onClick={() => setCategory(cat.value)}
                            className="flex flex-col items-center cursor-pointer group"
                        >
                            <div className="bg-blue-100 rounded-xl p-2 shadow-sm group-hover:shadow-md transition">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-28 h-29 object-contain rounded-md  "
                                />
                            </div>

                            <p className="text-x1 font-semibold text-center mt-2 text-gray-900 group-hover:text-blue-600">
                                {cat.name}
                            </p>
                        </div>
                    ))}

                </div>
            </div>








            {/* Product grid */}
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
                            <div className="h-78 flex items-center justify-center bg-white border border-gray-300 ">
                                <Link to={`/product/${p._id}`}>
                                    <img
                                        src={`http://localhost:5001${p.image}`}
                                        alt={p.title}
                                        className="h-64 w-50 object-contain p- transition-transform duration-500 hover:scale-120"
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


            {/* CONTACT SECTION */}
            <div className="bg-gray-100 py-12">
                <div className="max-w-xl mx-auto px-4 text-center">

                    <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                    {msg && (
                        <div className="mb-4 text-center text-sm text-blue-600 font-medium">
                            {msg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}
                        className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="name"
                            value={contact.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="p-3 border rounded-md"
                        />

                        <input
                            type="email"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="p-3 border rounded-md"
                        />

                        <textarea
                            name="message"
                            value={contact.message}
                            onChange={handleChange}
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
    );
}
