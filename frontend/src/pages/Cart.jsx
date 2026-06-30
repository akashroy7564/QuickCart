import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router";
import Navbar from "../component/Navbar";

export default function Cart() {
    const userId = localStorage.getItem("userId");
    const [cart, setCart] = useState({
        items: [],
        total: 0
    });
    const navigate= useNavigate()

    //Load Cart Data

    const loadCart = async () => {
        const rse = await api.get(`/cart/${userId}`)
        setCart(rse.data);
    };

    useEffect(() => {
        loadCart();
    }, [])

    const removeItem = async (productId) => {
        await api.post(`/cart/remove`, { userId, productId })
        loadCart()
        window.dispatchEvent(new Event("Cart updated"))
    }

    // update item Quantity
    const updateQty = async (productId, quantity) => {
        if (quantity === 0) {
            await removeItem(productId);
            return
        }

        await api.post(`/cart/update`, { userId, productId, quantity })
        loadCart()
        window.dispatchEvent(new Event("cartUpdated"))
    }

    if (!cart) {
        return <div>Loading</div>

    }

    const total = cart.items?.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    ) || 0;


    const handleCheckout = () => {
        (cart.items.length === 0)?navigate(""): navigate("/Checkout")
    };

return(

    <div className="">
        <Navbar/>

        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            🛒 Shopping Cart
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-5">

                {cart.items.length === 0 ? (
                    <div className="bg-white shadow-md rounded-lg p-10 text-center">
                        <p className="text-xl text-gray-500">Your cart is empty 😢</p>
                    </div>
                ) : 
                (

                    cart.items.map((item) => (
                        <div
                            key={item.productId._id}
                            className="flex flex-col sm:flex-row gap-4 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                        >

                            {/* IMAGE */}
                            <Link to={"/products"}

                            >
                            <img
                                // src={item.productId.image}        //previous one
                                src={`https://quickcart-vr1o.onrender.com${item.productId.image}`}
                                alt={item.productId.title}
                                className="w-28 h-28 object-contain"
                            />

                            </Link>

                            {/* PRODUCT DETAILS */}
                            <div className="flex-1">

                                <h3 className="text-lg font-semibold text-gray-800">
                                    {item.productId.title}
                                </h3>

                                <p className="text-blue-600 font-bold mt-1">
                                    ₹{item.productId.price}
                                </p>

                                {/* QUANTITY */}
                                <div className="flex items-center gap-3 mt-3">

                                    <button
                                        onClick={() =>
                                            updateQty(item.productId._id, item.quantity - 1)
                                        }
                                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                    >
                                        -
                                    </button>

                                    <span className="font-medium">
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            updateQty(item.productId._id, item.quantity + 1)
                                        }
                                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                    >
                                        +
                                    </button>

                                </div>

                                {/* REMOVE BUTTON */}
                                <button
                                    onClick={() => removeItem(item.productId._id)}
                                    className="text-red-500 text-sm mt-3 hover:underline"
                                >
                                    Remove
                                </button>

                            </div>

                            {/* ITEM TOTAL */}
                            <div className="text-lg font-semibold text-gray-800 flex items-center">
                                ₹{(item.productId.price * item.quantity).toFixed(2)}
                            </div>

                        </div>
                    ))

                )}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white shadow-md rounded-lg p-6 h-fit sticky top-20">

                <h3 className="text-xl font-semibold mb-4">
                    Order Summary
                </h3>

                <div className="space-y-2 text-gray-700">

                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600 font-semibold">₹60</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span>₹0</span>
                    </div>

                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{(60+total).toFixed(2)}</span>
                </div>

                <button
                    onClick={handleCheckout}
                    className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Proceed to Checkout
                </button>

            </div>

        </div>
    </div>

            )




}