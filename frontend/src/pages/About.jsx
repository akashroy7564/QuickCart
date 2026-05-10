import React from "react";
// import "./About.css";

const About = () => {
    return (
        <div className="about-page">

            {/* HERO SECTION */}
            <div className="about-hero">
                <h1>About Laptop Junction</h1>
                <p>Your trusted destination for laptops & accessories</p>
            </div>

            {/* COMPANY INFO */}
            <div className="about-container">
                <h2>Who We Are</h2>
                <p>
                    Established in 2010 in Patna, India, Laptop Junction has set a benchmark
                    in the IT industry by providing high-quality laptop parts, accessories,
                    and computer peripherals.
                    Our mission is to deliver the best technology products at affordable prices.
                </p>
            </div>

            {/* WHY CHOOSE US */}
            <div className="why-section">
                <div className="why-image">
                    <img src="about2.png" alt="about" />
                </div>

                <div className="why-content">
                    <h2>Why Choose Laptop Junction?</h2>
                    <ul>
                        <li>✔ 100% Genuine Products</li>
                        <li>✔ Best Price Guarantee</li>
                        <li>✔ Fast Delivery Across India</li>
                        <li>✔ Trusted Since 2010</li>
                    </ul>
                </div>
            </div>

            {/* PRODUCT SHOWCASE */}
            <div className="product-showcase">
                <h2>Our Products</h2>

                <div className="product-grid">
                    <div className="product-box">
                        <img src="laptop2.jpeg" alt="Laptop" />
                        <p>Laptops</p>
                    </div>
                    <div className="product-box">
                        <img src="battery.jpeg" alt="Battery" />
                        <p>Batteries</p>
                    </div>
                    <div className="product-box">
                        <img src="laptop charger.jpeg" alt="Charger" />
                        <p>Chargers</p>
                    </div>
                    <div className="product-box">
                        <img src="accessories.jpeg" alt="Accessories" />
                        <p>Accessories</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;




