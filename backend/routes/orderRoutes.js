import express from "express";
import { placeOrder, getAllOrders } from "../controllers/orderController.js";
import { protect,adminOnly } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/place",protect, placeOrder)

// for Admin 

router.get("/all", protect, adminOnly, getAllOrders);    

export default router;