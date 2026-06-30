// import { useState,useEffect } from "react"
// import { Link } from "react-router"
// import api from "../api/axios";


// export const ProductPage=({products, setProducts})=>{


// const [search, setSearch] = useState("");                //GOing from home
// const [category, setCategory] = useState("");   
// const [showMsg, setShowMsg] = useState(false);
// const [showLoginModal, setShowLoginModal] = useState(false); 


// const loadProduct= async (req,res) => {
//     const response= await api.get(`/products?search=${search}&category=${category}`)
//     setProducts(response.data)
// }

// useEffect(()=>{
//     loadProduct()
// },[search, category])

// if (!products) {
//         return (
//             <div><h1>Loading...</h1></div>
//         )
//     }






//     return(
//     <div className="max-w-7xl  mx-auto px-4 py-10">

//                 {/* Title */}
//                 <h1 className="text-2xl font-bold text-gray-800 mb-8">
//                     🔥Home Products
//                 </h1>

//                 {/* Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

//                     {products.map((p) => (
//                         <div
//                             key={p._id}
//                             className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col px-4 py-2"
//                         >

//                             {/* Image */}
//                             <div className="h-78 flex items-center justify-center bg-white border border-gray-300 ">
//                                 <Link to={`/product/${p._id}`}>
//                                     <img
//                                         src={`http://localhost:5001${p.image}`}
//                                         alt={p.title}
//                                         className="h-64 w-50 object-contain p- transition-transform duration-500 hover:scale-120"
//                                     /> </Link>
//                             </div>

//                             {/* Info */}
//                             <div className="p-4 flex flex-col flex-grow">

//                                 <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
//                                     {p.title}
//                                 </h3>

//                                 <p className="text-gray-600 leading-relaxed">
//                                     {p.description}
//                                 </p>

//                                 <div className="p-6 flex items-center justify-between">

//                                     <p className="text-xl font-semibold text-black-400 mt-2">
//                                         ₹{p.price}
//                                     </p>

//                                     <button type="button" 
//                                     className="bg-green-600 rounded-md h-10 w-11"
//                                     onClick={()=>handleClick(p)} >Share</button>


//                                 </div>

//                                 {/* Buttons */}
//                                 <div className="flex gap-2 mt-auto pt-4">

//                                     {/* View Button */}
//                                     {/* <Link to={`/product/${p._id}`} className="w-1/2">
//                                         <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
//                                             View
//                                         </button>
//                                     </Link> */}

//                                     {/* Add Button */}
//                                     <button
//                                         onClick={() => addToCart(p._id)}
//                                         className="w-full border border-red-600 text-red-600 text-xl py-2 rounded-lg hover:bg-red-600 hover:text-white hover:scale-105 transition"
//                                     >
//                                         Add
//                                     </button>

//                                 </div>

//                             </div>
//                         </div>
//                     ))}

//                 </div>

//                 {/* ✅ Toast Message */}
//                 {showMsg && (
//                     <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
//                         ✅ Product Added to Cart
//                     </div>
//                 )}

//                 {/* SHOW-LOGIN-MODEL  */}

//                 {showLoginModal && (

//                     <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">

//                         <div className="bg-white/70 rounded-lg shadow-lg p-6 w-80 text-center ">

//                             <h2 className="text-xl font-semibold mb-3">
//                                 Login Required
//                             </h2>

//                             <p className="text-gray-600 mb-5">
//                                 Please login first to add products to cart.
//                             </p>

//                             <div className="flex justify-center gap-3">

//                                 <button
//                                     onClick={() => setShowLoginModal(false)}
//                                     className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                                 >
//                                     Cancel
//                                 </button>

//                                 <Link
//                                     to="/login"
//                                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                                 >
//                                     Login
//                                 </Link>

//                             </div>

//                         </div>

//                     </div>

//                 )}
//             </div>

//     )


// }


// src/component/ProductGrid.jsx

import { Link } from "react-router";
import { FaWhatsapp } from "react-icons/fa";

export default function ProductGrid({ products, addToCart,}) {


        const handleWhatApp = async (product) => {
        const message = `
            🛒 Product: ${product.title}

            💰 Price: ₹${product.price}

            📝 Description:
            ${product.description}

            📷 Image:
            https://quickcart-vr1o.onrender.com${product.image}
        `;

        console.log(message)
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
            message
        )}`;

        window.open(whatsappUrl, "_blank");
    }




    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
                <div
                    key={p._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col px-4 py-2"
                >
                    <div className="h-78 flex items-center justify-center bg-white border border-gray-300">
                        <Link to={`/product/${p._id}`}>
                            <img
                                src={`https://quickcart-vr1o.onrender.com${p.image}`}
                                alt={p.title}
                                className="h-64 w-50 object-contain"
                            />
                        </Link>
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {p.title}
                        </h3>

                        <p className="text-gray-600">
                            {p.description}
                        </p>

                        <div className="p-6 flex items-center justify-between">
                            <p className="text-xl font-semibold">
                                ₹{p.price}
                            </p>

                            <button
                                onClick={() => handleWhatApp(p)}
                                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
                            >
                                <FaWhatsapp size={20} />
                            </button>
                        </div>

                        <button
                            onClick={() => addToCart(p._id)}
                            className="w-full border border-red-600 text-red-600 py-2 rounded-lg hover:bg-red-600 hover:text-white"
                        >
                            Add
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}   
