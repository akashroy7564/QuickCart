import Cart from "../models/Cart.js";

//Add ITEM TO CART
export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ userId });
        let item;  

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity: 1 }]
            });

        } else {
            item = cart.items.find(
                (item) => item.productId.toString() === productId
            );

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
        }

        await cart.save();

        res.json({
            message: "Item Added to Cart",
            cart
        });

    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
};

export const removeItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(500).json({ message: "cart not found" })
        }
        cart.items = cart.items.filter((item) => 
            item.productId.toString() !== productId
        );
        await cart.save();
        res.json({ message: "Item remove from cart" },Cart);
    } catch (err) {
        res.status(500).json({ message: "server error", err })
    }

}


//   UPDATE Cart


export const updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.json({ message: "Cart not found" });
        }
        const item = cart.items.find((item) =>
            item.productId.toString() === productId);

        if (!item) {
            return res.status(400).json({ message: "Item not found in the cart" })
        }
        item.quantity = quantity;
        await cart.save();
        res.json({ message: "Item Quantity Updated", cart });

    } catch (err) {
        res.json({ message: "server Error", err })
    }

}


// get cart By userId
export const getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        res.json(cart)
    } catch (err) {
        res.json({ message: "server error", err })
    }
}


