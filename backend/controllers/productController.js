import product from "../models/product.js";


// THIS IS TO UPLOAD IMAGE FROM URL (--CREATE PRODUCT--)

// export const createProduct = async (req, res) => {
//     try {
//         const newProduct = await product.create(req.body);
//         res.json({
//             message: "product created Successfully",
//             newProduct,
//         })
//     } catch (err) {
//         res.status(400).json({ message: "server error " }, err)
//     }
// };


    //    *----*CREATE PRODUCT USING MULTER *-------*

export const createProduct = async (req, res) => {
    try {

        const { title, description, price, category, stock } = req.body;

        const newProduct = await product.create({
            title,
            description,
            price,
            category,
            stock,
            image: req.file ? `/uploads/${req.file.filename}` : ""
        });

        res.json({
            message: "Product created successfully",
            newProduct
        });

    } catch (err) {
        res.status(400).json({
            message: "Server error in image",
            err
        });
    }
};


            // get all product

export const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;
        let filter = {};

        if (search) {
            filter.title = { $regex: search, $options: 'i' }
        }

        if (category) {
            filter.category = category;
        }



        const products = await product.find(filter).sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "server error", err })
    }

}


            // Update products
export const updatedProduct = async (req, res) => {
    try {
        const updated = await product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ message: "updated Successfully", updated });

    }
    catch (err) {
        res.status(500).json({ message: "Update not Working" })
    }
}

            //Delete Product
export const deleteProduct = async (req, res) => {
    try {
        await product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ message: " Delete Server Error" })
    }
}

