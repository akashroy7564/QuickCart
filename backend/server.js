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
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";



dotenv.config();

const app = express();

app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL
}));
app.use(cookieParser());
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy: false
}))
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/address', addressRoutes)
app.use("/api/order", orderRoutes);
app.use("/uploads", express.static("uploads"));  //to upload image
app.use("/api/contact",ContactRoutes)




connectDB();

const PORT=5001


app.listen(PORT, () => {
    console.log("backend is running at port",PORT);
})
