import { useEffect, useState } from "react";
import { Link } from "react-router";

const slides = [
    {
        id: 1,
        image: "Grocery_image.png",
        title: "Big Grocery Sale 🛒",
        subtitle: "Up to 50% OFF on daily essentials",
    },
    {
        id: 2,
        image: "About_poster.png",
        title: "",
        subtitle: "",
    },
    {
        id: 3,
        image: "happyshopping.png",
        title: "Tech Deals 🔥",
        subtitle: "Best gadgets at lowest prices",
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[560px] overflow-hidden">

            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute w-full h-full transition-all duration-700 ease-in-out 
           ${index === current ? "opacity-00 scale-100" : "opacity-0 scale-105"}`}
                >
                    {/* Background Image */}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">

                        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
                            {slide.title}
                        </h1>

                        <p className="text-lg md:text-xl mb-6 animate-fadeIn delay-200">
                            {slide.subtitle}
                        </p>

                        <Link
                            to="/products"
                            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold 
              hover:bg-yellow-500 hover:scale-105 transition duration-300"
                        >
                            Shop Now
                        </Link>

                    </div>
                </div>
            ))}

            {/* Dots Indicator */}
            <div className="absolute bottom-4 w-full flex justify-center gap-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer 
            ${index === current ? "bg-yellow-400" : "bg-white/50"}`}
                    />
                ))}
            </div>
        </div>
    );
}