import express from "express";
import { placeOrder, getAllOrders } from "../controllers/orderController.js";


const router = express.Router();

router.post("/place", placeOrder)

// for Admin 

router.get("/all",getAllOrders)
    

export default router;