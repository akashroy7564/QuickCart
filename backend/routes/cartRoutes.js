import express from "express";
import {
    addToCart,
    removeItem,
    updateQuantity,
    getCartByUserId
} from "../controllers/cartController.js";


const router = express.Router();

// Add to cart
router.post("/add", addToCart)

// Remove from Cart
router.post("/remove", removeItem);

// update Cart
router.post("/update", updateQuantity)

// get User cart
router.get('/:userId', getCartByUserId);


export default router;