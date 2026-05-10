import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";
import Navbar from "../component/Navbar";
import { Link } from "react-router";

export default function ProductDetails() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [search, setSearch] = useState("");                //GOing from home
    const [category, setCategory] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    
    const navigate = useNavigate();

    const loadProduct = async () => {
        const response = await api.get(`/products?search=${search}&category=${category}`)
        setProducts(response.data)

        const matchProduct = response.data.find((item) => item._id === id)
        setProduct(matchProduct);

        //     const selected = response.data.find((item) => item._id === id);
        // setProduct(selected);


        const sortedProducts = response.data.sort((a, b) => {
            if (a.category === matchProduct.category && b.category !== matchProduct.category) {
                return -1;
            }
            if (a.category !== matchProduct.category && b.category === matchProduct.category) {
                return 1;
            }
            return 0;
        });

        setProducts(sortedProducts);



    }

    useEffect(() => {
        loadProduct()
        window.scrollTo(0, 0);
    }, [search, category, id]);

    if (!product) {
        return (
            <div><h1>Loading...</h1></div>
        )
    }

    const addToCart = async (productId) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("please login first");
            setShowLoginModal(true);
            return;
        }
        const res = await api.post(`/cart/add`, { userId, productId });
        const total = res.data.cart.items.reduce(
            (sum, item) => sum + item.productId.price * item.quantity, 0
        );

        setShowMsg(true);
        setTimeout(() => {
            setShowMsg(false)
        }, 2000)

        localStorage.setItem("cartCount", total)
        window.dispatchEvent(new Event("cartUpdated"))

    }



    const BuyNow = async (productId) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("please login first");
            setShowLoginModal(true);
            return;
        }
        const res = await api.post(`/cart/add`, { userId, productId });
        const total = res.data.cart.items.reduce(
            (sum, item) => sum + item.productId.price * item.quantity, 0
        );

        
        navigate("/cart")

        localStorage.setItem("cartCount", total)
        window.dispatchEvent(new Event("cartUpdated"));

    }



    return (
        <div>
            {/* NAVBAR */}
            <Navbar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
            />

            {/* Show Clickable router */}

            <div className="max-w-7xl mx-auto px-4 py-4">

                <div className="flex items-center gap-2 text-sm text-gray-600">

                    <Link
                        to="/"
                        className="hover:text-green-600 transition"
                    >
                        Home
                    </Link>

                    <span>/</span>

                    <Link
                        to="/products"
                        className="hover:text-green-600 transition"
                    >
                        Products
                    </Link>

                    <span>/</span>

                    <span className="text-green-700 font-semibold">
                        Product Detail
                    </span>

                </div>

            </div>



            <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10 ">
                {/* IMAGE SECTION */}
                <div className="border border-gray-300 bg-white p-6 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                        // src={`/${product.image}`}
                        src={`http://localhost:5001${product.image}`}
                        alt={product.title}
                        className="w-full max-h-[400px] object-contain transition-transform duration-500 hover:scale-110"
                    />
                </div>

                {/* PRODUCT INFO */}
                <div className="flex flex-col justify-center space-y-4 ">
                    <div className=" w-24 rounded bg-gray-500 text-center text-white font-bold">
                        <p >{product.category}</p>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {product.title}
                    </h1>

                    <p className="text-gray-600 leading-relaxed">
                        {product.description}
                    </p>

                    <h2 className="text-2xl font-bold text-blue-600">
                        ₹{product.price}
                    </h2>
                    <p className="text-gray-500">
                        <span className="text-gray-600">Product_id:- </span>{product._id}
                    </p>

                    <button onClick={() => addToCart(product._id)}
                        className="w-92 bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                        Add to Cart 🛒
                    </button>

                    <button onClick={() => BuyNow(product._id)}
                        className="w-92 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
                        Buy Now
                    </button>

                    <br />


                    {/* Our policy */}

                    <div>

                        <h2 className="text-3xl font-bold text-gray-800 mb-8">
                            Why Choose QuickCart?
                        </h2>

                        <div className="space-y-5">

                            <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl hover:scale-105 transition duration-300">
                                <p className="text-lg font-medium text-gray-700">
                                    ✔ 100% Genuine Products
                                </p>
                            </div>

                            <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl hover:scale-105 transition duration-300">
                                <p className="text-lg font-medium text-gray-700">
                                    ✔ Best Price Guarantee
                                </p>
                            </div>

                            <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl hover:scale-105 transition duration-300">
                                <p className="text-lg font-medium text-gray-700">
                                    ✔ Minimal Delivery Charges Across India
                                </p>
                            </div>

                            <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl hover:scale-105 transition duration-300">
                                <p className="text-lg font-medium text-gray-700">
                                    ✔ Trusted Since 2004
                                </p>
                            </div>

                        </div>

                    </div>



                </div>
            </div>


            {/* PRODUCT GRID  */}

            <div className="max-w-7xl  mx-auto px-4 py-10">

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-8">
                    🔥Related Products
                </h1>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {products.map((p) => (
                        <div
                            key={p._id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col px-4 py-2"
                        >

                            {/* Image */}
                            <div className="h-74  flex items-center justify-center bg-white border border-gray-300 ">
                                <Link to={`/product/${p._id}`}>
                                    <img
                                        src={`http://localhost:5001${p.image}`}
                                        alt={p.title}
                                        className="h-54 w-54 object-contain overflow-hidden transition-transform duration-500 hover:scale-120"
                                    /> </Link>

                            </div>

                            {/* Info */}
                            <div className="p-4 flex flex-col flex-grow">

                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                    {p.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {p.description}
                                </p>

                                <p className="text-xl font-semibold text-black-400 mt-2">
                                    ₹{p.price}
                                </p>

                                {/* Buttons */}
                                <div className="flex gap-2 mt-auto pt-4">

                                    {/* View Button */}
                                    {/* <Link to={`/product/${p._id}`} className="w-1/2">
                                        <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
                                            View
                                        </button>
                                    </Link> */}

                                    {/* Add Button */}
                                    <button
                                        onClick={() => addToCart(p._id)}
                                        className="w-full border border-red-600 text-red-600 text-xl py-2 rounded-lg hover:bg-red-600 hover:text-white hover:scale-105 transition"
                                    >
                                        Add
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>

                {/* ✅ Toast Message */}
                {showMsg && (
                    <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
                        ✅ Product Added to Cart
                    </div>
                )}

            </div>




        </div>
    );


}










