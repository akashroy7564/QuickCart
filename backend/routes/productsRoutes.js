import express from "express";
import upload from "../middleware/upload.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { createProduct, getProducts, updatedProduct, deleteProduct } from "../controllers/productController.js";
const router = express.Router();


// Route to create a new product
router.post("/add",
    protect,
    adminOnly,
    upload.single("image"),
    createProduct);  //upload.single("image"), IS FOR IMAGE UPLOAD Directly

// Route to get a new product
router.get("/", getProducts);

// Route to update a new product
router.put("/update/:id",
    protect,
    adminOnly, updatedProduct);

// Route to delete a new product
router.delete("/delete/:id",
    protect,
    adminOnly,
    deleteProduct);

export default router;