import { useState,useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../component/Navbar";


export default function OrderSuccess() {
    const { id } = useParams();
    const [showTick, setshowTick] = useState(false);

    const goHome = () => {
        window.location.href = "/";
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTick(true);
        }, 3000); // same as truck animation time

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-column items-center justify-center p-6">
            
            <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">

                {/* Title */}
                <h1 className="text-3xl font-bold text-green-600 mb-3">
                    🎉 Order Successful!
                </h1>

                {/* Order ID */}
                <p className="text-gray-600 mb-6">
                    Your order ID: 🚚
                    <span className="font-semibold text-blue-600 ml-1">{id}</span>
                </p>

                {/* Truck Animation */}
                {!showTick && (
                    <div className="relative h-16 overflow-hidden border-b-4 border-dashed border-gray-400 mb-6">
                        <div className="absolute text-4xl animate-[drive_3s_linear_infinite]">
                            🚚
                        </div>
                    </div>
                )}

                {/* Tick Animation */}
                {showTick && (
                    <div className="flex flex-col items-center gap-2 text-green-600 animate-bounce mb-6">
                        <div className="text-5xl">✔</div>
                        <h3 className="text-lg font-semibold text-gray-700">
                            Order placed Successfully
                        </h3>
                    </div>
                )}

                {/* Button */}
                <button
                    onClick={goHome}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition transform hover:scale-105"
                >
                    Continue Shopping
                </button>

            </div>

        </div>
    )
}
