import express from "express";
import {
    addToCart,
    removeItem,
    updateQuantity,
    getCartByUserId
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// Add to cart
router.post("/add", protect, addToCart)

// Remove from Cart
router.post("/remove",protect, removeItem);

// update Cart
router.post("/update",protect, updateQuantity)

// get User cart
router.get('/:userId',protect, getCartByUserId);


export default router;