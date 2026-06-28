// import { useState,useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate, useParams } from "react-router";

// export default function Order{
//     const loadOrder = async () => {
//         const res = await api.post(`/order/place`);
//         setProducts(res.data)
//     }


//     useEffect(() => {
//         loadProducts()
//     }, );

//     if (!products) {
//         return (
//             <div><h1>Loading...</h1></div>
//         )
//     }

//     return(

//     )

// }

import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {

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


    const handleDelete=async(id)=>{
        await api.delete(`/order/${id}`)
        loadOrders()
    }

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Admin Orders
            </h1>

            <div className="overflow-x-auto bg-white shadow rounded-lg">

                <table className="min-w-full border">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">Order ID</th>
                            <th className="p-3 border">Customer</th>
                            <th className="p-3 border">Products</th>
                            <th className="p-3 border">Total</th>
                            <th className="p-3 border">Address</th>
                            <th className="p-3 border">Date</th>
                            <th className="p-3 border">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => {

                            const total = order.items.reduce(
                                (sum, item) =>
                                    sum + item.productId.price * item.quantity,
                                0
                            );

                            

                            return (
                                <tr key={order._id} className="text-center">

                                    <td className="border p-2">
                                        {order._id}
                                    </td>

                                    <td className="border p-2">
                                        {order.userId?.name}
                                        <br />
                                        {order.userId?.email}
                                    </td>

                                    <td className="border p-2">
                                        {order.items.map((item) => (
                                            <div key={item._id}>
                                                {item.productId?.title} × {item.quantity}
                                            </div>
                                        ))}
                                    </td>

                                    <td className="border p-2 font-semibold">
                                        ₹{(60+total)}
                                    </td>

                                    <td className="border p-2 text-sm">
                                        {order.address?.fullName} <br />
                                        {order.address?.addressLine} <br />
                                        {order.address?.city} {order.address?.pincode}<br/>
                                        {order.address?.phone}
                                    </td>

                                    <td className="border p-2">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="border p-2 text-sm">
                                    <button 
                                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                                    onClick={()=>handleDelete(order._id)}
                                    >delete
                                    </button>
                                    
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>

            </div>

        </div>
    );
}