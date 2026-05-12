import { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router";
import api from "../api/axios";


export default function AdminLayout() {

    // const [stats, setStats] = useState({
    //     users: 0,
    //     orders: 0,
    //     messages: 0,
    //     products: 0
    // })

    const [orders, setOrders] = useState([]);
    const [user,setUser]= useState([]);
    const [product,setProduct]=useState([])

    const loadOrders = async () => {
        try {
            const resorder = await api.get("/order/all");
            setOrders(resorder.data);

            const res = await api.get("/products");
            setProduct(res.data);

            const resuser = await api.get("/auth/user");
            setUser(resuser.data);

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
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">

    {/* Cards Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between hover:shadow-2xl transition duration-300">
            <div>
                <h2 className="text-gray-500 text-sm font-medium">
                    Total Orders
                </h2>

                <p className="text-3xl font-bold text-blue-600 mt-2">
                    {orders.length}
                </p>
            </div>

            <div className="bg-blue-100 p-4 rounded-full text-4xl">
                📦
            </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between hover:shadow-2xl transition duration-300">
            <div>
                <h2 className="text-gray-500 text-sm font-medium">
                    Total product
                </h2>

                <p className="text-3xl font-bold text-green-600 mt-2">
                    {product.length}
                </p>
            </div>

            <div className="bg-green-100 p-4 rounded-full text-4xl">
                💰
            </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between hover:shadow-2xl transition duration-300">
            <div>
                <h2 className="text-gray-500 text-sm font-medium">
                    Total User:
                </h2>

                <p className="text-3xl font-bold text-red-600 mt-2">
                    {user.length}
                </p>
            </div>

            <div className="bg-red-100 p-4 rounded-full text-4xl">
                👤
            </div>
        </div>

    </div>

    <Outlet />

</div>

        </div>
    );
}