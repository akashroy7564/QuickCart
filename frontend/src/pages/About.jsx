import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { Link } from "react-router";
import api from "../api/axios";


const About = () => {

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("");
    const [msg, setMsg] = useState(false)
    const [contact,setContact]=useState({
        name:"",
        email:"",
        massage:"",
    })

    const handleChange=(e)=>{
        setContact({
            ...contact,
            [e.target.name]:e.target.value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post("/contact", contact);
            setMsg(response.data.message);
            setTimeout(() => {
                setMsg(false);
            }, 2000)

            setContact({
                name: "",
                email: "",
                message: ""
            })

        } catch (err) {
            alert(err);
        }
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

            {/* HERO SECTION */}
            <div className="text-white text-center">

                <img src="About_poster.png" alt="About_poster" />

            </div>

            {/* COMPANY INFO */}
            <div className="max-w-6xl mx-auto px-6 py-16">

                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">

                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Who We Are
                    </h2>

                    <p className="text-gray-600 text-lg leading-8">
                        Established in 2004 in Gaya, Bihar, India, QuickCart
                        has set a benchmark in the grocery industry by providing
                        high-quality food materials, snacks, and home decor products.
                        <br />
                        <br />
                        Our mission is to deliver the best products at affordable
                        prices with fast and reliable delivery services.
                    </p>

                </div>

            </div>

            {/* WHY CHOOSE US */}
            <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* IMAGE */}
                <div>
                    <img
                        src="about2.png"
                        alt="about"
                        className="w-full h-[400px] object-fit rounded-3xl shadow-2xl"
                    />
                </div>

                {/* CONTENT */}
                <div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-8">
                        Why Choose QuickCart?
                    </h2>

                    <div className="space-y-5">

                        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl hover:scale-105 transition duration-300">
                            <p className="text-lg font-medium text-gray-700">
                                ✔ 100% Genuine Products
                            </p>
                        </div>

                        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl hover:scale-105 transition duration-300">
                            <p className="text-lg font-medium text-gray-700">
                                ✔ Best Price Guarantee
                            </p>
                        </div>

                        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl hover:scale-105 transition duration-300">
                            <p className="text-lg font-medium text-gray-700">
                                ✔ Minimal Delivery Charges Across India
                            </p>
                        </div>

                        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl hover:scale-105 transition duration-300">
                            <p className="text-lg font-medium text-gray-700">
                                ✔ Trusted Since 2004
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            {/* PRODUCT SHOWCASE */}
            <div className="max-w-6xl mx-auto px-6 py-16">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-14">
                    Our Products
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* PRODUCT CARD */}
                    <Link to={"/products"}>
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-3 hover:shadow-2xl transition duration-300">

                        <img
                            src="snacks.png"
                            alt="Snacks"
                            className="w-full h-60 object-cover"
                        />

                        <div className="p-5 text-center">
                            <p className="text-xl font-semibold text-gray-700">
                                Snacks
                            </p>
                        </div>

                    </div>
                    </Link>

                    {/* PRODUCT CARD */}

                    <Link to={"/products"}>
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-3 hover:shadow-2xl transition duration-300">
                        <img
                            src="Atta rice.png"
                            alt="Rice"
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-5 text-center">
                            <p className="text-xl font-semibold text-gray-700">
                                Atta & Rice
                            </p>
                        </div>
                    </div>
                    </Link>

                    {/* PRODUCT CARD */}

                    <Link to={"/products"}>
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-3 hover:shadow-2xl transition duration-300">

                        <img
                            src="maggies.png"
                            alt="maggie"
                            className="w-full h-60 object-cover"
                        />

                        <div className="p-5 text-center">
                            <p className="text-xl font-semibold text-gray-700">
                                Instant Food
                            </p>
                        </div>

                    </div>
                    </Link>

                    {/* PRODUCT CARD */}

                    <Link to={"/products"}>
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-3 hover:shadow-2xl transition duration-300">

                        <img
                            src="masala oil.png"
                            alt="masala and Oils"
                            className="w-full h-60 object-cover"
                        />

                        <div className="p-5 text-center">
                            <p className="text-xl font-semibold text-gray-700">
                                Oils & Masala
                            </p>
                        </div>
                    </div>
                    </Link>

                </div>

            </div>


            {/* CONTACT SECTION */}
            <div className="bg-green-50 py-12">
                <div className="max-w-xl mx-auto px-4 text-center">

                    <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                    {msg && (
                        <div className="mb-4 text-center text-sm text-blue-600 font-medium animate-pulse">
                            {msg}
                        </div>
                    )}

                    <form onSubmit={handleFormSubmit}
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

                        <button className=" bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 rounded-md hover:bg-blue-600">
                            Send Message
                        </button>
                    </form>

                </div>
            </div>



        </div>
    );
};

export default About;