import mongoose from "mongoose";
import User from "../models/userModel.js"
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import asyncHandler from "express-async-handler"
export const createCart = async (req, res) => {
    const { userId } = req.params;
    const { product, quantity } = req.body;
    try {


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!!" });
        }

        const cartProduct = await Product.findById(product)
        if (!cartProduct) {
            return res.status(400).json({ message: "Product not found!!" })
        }
        if (quantity > cartProduct.stockQuantity) {
            return res.status(400).json({ message: "Requested Quantity is invalid " })
        }
        cartProduct.stockQuantity -= quantity;
        await cartProduct.save();
        const totalPrice = cartProduct.price * quantity;

        const cart = await Cart.create({
            user: userId,
            product,
            quantity,
            totalPrice
        })
        await cart.save()
        res.status(201).json({ message: "cart added successfully", cart })


    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
export const getCarts = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const carts = await Cart.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            }, {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $addFields: {
                    user: { $arrayElemAt: ["$user", 0] },
                    product: { $arrayElemAt: ["$product", 0] }
                }
            }, {
                $project: {
                    __v: 0,
                    "user.isAdmin": 0,
                    "user.resetPasswordToken": 0,
                    "user.resetPasswordExpires": 0,
                    "user.__v": 0,
                    "product.createdBy": 0,
                    "product.createdAt": 0,
                    "product.updatedAt": 0,
                    "product.__v": 0
                }
            }

        ])
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const editCart = asyncHandler(async (req, res) => {

    try {
        const { cartId } = req.params;
        const { fieldsToUpdate } = req.body;
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found!" })
        }
        const updatedCart = await Cart.findByIdAndUpdate(cartId, { $set: fieldsToUpdate }, { new: true })
        if (updatedCart) {
            return res.status(201).json({ updatedCart, message: "Cart Updated Successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: Error.message })
    }

})