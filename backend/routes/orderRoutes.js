import express from "express";
import { placeOrder, getAllOrders, deleteOrder, getMyOrders } from "../controllers/orderController.js";
import { protect,adminOnly } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/place",protect, placeOrder)
router.get("/my-orders",protect, getMyOrders)

// for Admin 

router.get("/all", protect, adminOnly, getAllOrders);    
router.delete("/:id", protect, adminOnly,deleteOrder);


export default router;