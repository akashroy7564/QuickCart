import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { Link } from "react-router";


const About = () => {

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("");
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

        </div>
    );
};

export default About;