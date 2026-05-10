// import { useState } from "react";
// import api from "../api/axios.js";
// import { useNavigate } from "react-router";


// export default function AddProduct() {
//     const [form, setForm] = useState({
//         title: "",
//         description: "",
//         price: "",
//         category:"",
//         image: "",
//         stock: ""
//     })

//     const navigate = useNavigate();


//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await api.post("/products/add", form);
//             alert("product added successfully");
//             navigate("/admin/products")
//         } catch (error) {
//             res.status(400).json({message:"server error hai"},err)

//         }
//     }


//     return (
//         <div className="max-w-lg mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg border">
//             <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
//                 Add New Product
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 {
//                     Object.keys(form).map((key) => (
//                         <input
//                             key={key}
//                             name={key}
//                             value={form[key]}
//                             onChange={handleChange}
//                             placeholder={`Enter ${key}`}
//                             className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     ))
//                 }

//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
//                 >
//                     Add Product
//                 </button>
//             </form>
//         </div>
//     )
// }


// manual way to add product 


import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";

export default function AddProduct() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: ""
    });

    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });

        formData.append("image", image);

        try {
            await api.post("/products/add", formData,);

            alert("Product added successfully");
            navigate("/admin/products");

        } catch (error) {
            console.log(error);
            alert("Server error");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg border">

            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                Add New Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    name="title"
                    placeholder="Enter Title"
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    name="description"
                    placeholder="Enter Description"
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    name="price"
                    placeholder="Enter Price"
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    name="category"
                    placeholder="Enter Category"
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    name="stock"
                    placeholder="Enter Stock"
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                {/* Image Upload */}
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700"
                >
                    Add Product
                </button>

            </form>

        </div>
    );
}