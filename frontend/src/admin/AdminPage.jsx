import { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router";
import api from "../api/axios";


export default function AdminLayout() {

    const [change, setChange] = useState(false)
    const [data, setData] = useState([])
    // const [stats, setStats] = useState({
    //     users: 0,
    //     orders: 0,
    //     messages: 0,
    //     products: 0
    // })

    const [orders, setOrders] = useState([]);

    const loadOrders = async () => {
        try {
            const res = await api.get("/order/all");
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);



    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <div className="w-60 bg-gray-900 text-white p-5">
                <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

                <ul className="space-y-4">
                    <li className="hover:bg-blue-500 text-white px-4 py-2 rounded">
                        <Link to={"/admin"}>DashBoard</Link>
                    </li>
                    <li className="hover:bg-blue-500 text-white px-4 py-2 rounded">
                        <Link to="/admin/products">Product List</Link>
                    </li>

                    <li className="hover:bg-blue-500 text-white px-4 py-2 rounded">
                        <Link to="/admin/products/add">Add Product</Link>
                    </li>


                    <li className="hover:bg-blue-500 text-white px-4 py-2 rounded">
                        <Link
                            to="/admin/orders"
                            
                        >
                            View Orders
                        </Link>
                    </li>

                    <li className="hover:bg-blue-500 text-white px-4 py-2 rounded">
                        <Link to="/admin/contact">User Message</Link>
                    </li>
                </ul>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 bg-gray-100">
                {orders.map((ord) => {

                })}
                <div className="bg-white shadow-md rounded-xl p-6 flex justify-between">
                    <div>
                        <h2 className="text-gray-500">Total Orders</h2>
                        <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
                    </div>
                    <span className="text-4xl">📦</span>
                </div>
                
                <Outlet />

            </div>

        </div>
    );
}