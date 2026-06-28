import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../component/Navbar";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");                //GOing from home
    const [category, setCategory] = useState("");

    const loadOrders = async () => {
        try {
            const res = await api.get("/order/my-orders");
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    return (
        <>

            <Navbar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}

            />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">
                    My Orders {orders.length}
                </h1>

                {orders.length === 0 ? (
                    <h2>No Orders Yet</h2>
                ) : (
                    orders.map((order) => {

                        const total = order.items.reduce(
                            (sum, item) =>
                                sum + item.productId.price * item.quantity,
                            0
                        );

                        return (
                            <div
                                key={order._id}
                                className="border rounded-lg p-5 mb-5 shadow"
                            >
                                <div className="flex justify-between mb-4">
                                    <div>
                                        <p>
                                            <b>Order ID:</b>{" "}
                                            {order._id.slice(-6)}
                                        </p>

                                        <p>
                                            <b>Date:</b>{" "}
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <h2 className="font-bold text-lg">
                                        ₹{total + 60}
                                    </h2>
                                </div>

                                {order.items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex justify-between border-b py-2"
                                    >
                                        <div>
                                            <h3>{item.productId.title}</h3>
                                            <img
                                                src={`http://localhost:5001${item.productId.image}`}
                                                alt={item.productId.title}
                                                className="w-28 h-28 object-contain"
                                            />
                                            <p>
                                                Qty : {item.quantity}
                                            </p>
                                        </div>
                                        <p>
                                            ₹
                                            {item.productId.price *
                                                item.quantity}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
}