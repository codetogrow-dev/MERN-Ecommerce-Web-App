import Product from "../models/productModel.js"
import mongoose from "mongoose"
export const createProduct = async (req, res) => {
    try {
        const { title, description, picture, price, category, vendor, stockQuantity, shippingType, offer } = req.body
        const { adminId } = req.params;
        if (!title || !description || !price || !picture || !category || !vendor || !stockQuantity) {

            return res.status(400).json({ message: "All fields are mandatory to be filled!!" })

        }

        const createdBy = adminId;


        const product = await Product.create({
            title,
            description,
            picture,
            price,
            category,
            vendor,
            stockQuantity,
            shippingType,
            offer,

            publishedDate: new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                minute: "numeric",
                hour: "numeric",
                hour12: true,
            }),
            createdBy,
        })
        await product.populate("createdBy", "fullname email picture username")
        await product.save();

        res.status(201).json({ product, message: "Product Published Successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

export const editProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const fieldsToUpdate = req.body
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product not found!!" })
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: fieldsToUpdate }, { new: true })
        if (updatedProduct) {
            return res.status(201).json({ updatedProduct, message: "Product updated Successfully" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product not found!!" })
        }

        const deletedProduct = await Product.findByIdAndDelete(productId)
        if (deletedProduct) {
            return res.status(203).json({ message: "Product deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const listProducts = async (req, res) => {
    try {
        const { adminId } = req.params;
        const products = await Product.aggregate([
            {
                $match: { createdBy: new mongoose.Types.ObjectId(adminId) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdByUser"
                }
            },
            {
                $addFields: {
                    createdBy: { $arrayElemAt: ["$createdByUser", 0] }
                }
            },
            {
                $project: {
                    createdByUser: 0
                }
            }
        ])
        res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}