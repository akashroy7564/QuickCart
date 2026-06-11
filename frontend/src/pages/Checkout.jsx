import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";



export default function Checkout() {
    const userId = localStorage.getItem("userId");
    const [address, setAddress] = useState([])
    const [selectAddress, setSelectAddress] = useState(null);
    const [cart, setCart] = useState(null);

    const navigate = useNavigate();

    const loadAddress=async (params) => {
        api.get(`/address/${userId}`).then((res) => {
            setAddress(res.data)
            setSelectAddress(res.data[0]);
        });
    }



    useEffect(() => {
        if (!userId) {
            navigate("/");
            return
        }
        api.get(`/cart/${userId}`).then((res) => setCart(res.data));
        loadAddress()
        
    }, [])

    const handleDelete = async (_id,res) => {
        await api.delete(`/address/${_id}`)
        loadAddress()
    }

    if (!cart) {
        return <div>Loding...</div>
    }
    const total = cart.items.reduce(
        (sum, item) => sum + item.quantity * item.productId.price, 0
    );

    const placeOrder = async () => {
        if (!selectAddress) {
            alert("please select address")
            return
        }
        const res = await api.post("/order/place", {
            userId,
            address: selectAddress,
        });
        navigate(`/success/${res.data.orderId}`);
    }





    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">

            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">

                {/* Checkout Title */}
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">
                    Checkout
                </h1>
                <button className="w-1/4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-green-500 transition cursor-pointer"
                    onClick={() => navigate("/checkAddress")}>
                    +Address
                </button>

                {/* Address Section */}
                <h2 className="text-xl font-medium mb-4 text-gray-700">
                    Select Address
                </h2>


                <div className="space-y-4 mb-8">
                    {
                        address.map((addr) => (
                            <label key={addr._id} className="relative block border p-3 rounded cursor-pointer mb-2">
                                <input type="radio" name="address"
                                    checked={selectAddress?._id === addr._id}
                                    onChange={() => setSelectAddress(addr)}
                                />
                                <strong>{addr.fullName}</strong>
                                <p className="font-semibold text-gray-800">{addr.addressLine} {addr.city} {addr.state} {addr.pincode} </p>
                                <p className="text-sm">{addr.phone}</p>
                                <button type="button"
                                    onClick={() => handleDelete(addr._id)}
                                    className="absolute bottom-2 right-3 bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700" 
                                    >
                                    Delete
                                </button>
                            </label>
                        ))
                    }
                </div>

                {/* Order Summary */}
                <div className="border-t pt-6">

                    <h2 className="text-xl font-medium mb-4 text-gray-700">
                        Order Summary
                    </h2>

                    <div className="flex  justify-between text-lg mb-6">
                        <span className="text-gray-600">Total Amount</span>
                        <strong className="font-bold text-lg text-gray-800">
                            ₹{(60 + total)}
                        </strong>
                    </div>

                    <button onClick={placeOrder}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition">
                        Place Order (COD)
                    </button>

                </div>

            </div>

        </div>
    )










}