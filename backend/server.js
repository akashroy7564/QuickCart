import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import productsRoutes from "./routes/productsRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import addressRoutes from "./routes/addressRoutes.js";
import orderRoutes from './routes/orderRoutes.js'
import ContactRoutes from "./routes/ContactRoutes.js"



dotenv.config();

const app = express();

app.use(cors({
    origin:"frontend Url",
    credentials:true
}));
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/address', addressRoutes)
app.use("/api/order", orderRoutes);
app.use("/uploads", express.static("uploads"));  //to upload image
app.use("/api/contact",ContactRoutes)




connectDB();

app.listen(5001, () => {
    console.log("backend is running at port 5001");
})
