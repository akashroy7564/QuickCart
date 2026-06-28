import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import product from "../models/product.js";

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { address } = req.body;

        // get Cart 
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is Empty" })
        }

        // Prepare cart item 
        const orderItems = cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
        }));
        // Calculation
        const totalAmount = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Deduct Stock
        for (let item of cart.items) {
            await product.findByIdAndUpdate(item.productId._id, { $inc: { stock: -item.quantity } });
        }

        // createOrder
        const order = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            PaymentMethod: "COD",
        })
        await Cart.findOneAndUpdate({ userId }, { items: [] });
        res.status(201).json({ message: "Order Placed Successfully", orderId: order._id });
    } catch (err) {
        res.status(500).json({ message: "server Error", err })
    }
}


// for Admin 


export const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("userId", "name email")
            .populate("items.productId", "title price image")
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

//   deleteOrder

export const deleteOrder = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "OrderDeleted Successfully" })


}

// MY ORDER PAGE
export const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            userId: req.user.id,
        })
            .populate("items.productId", "title image price")
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};