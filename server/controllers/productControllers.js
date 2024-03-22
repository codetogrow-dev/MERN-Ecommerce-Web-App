import Product from "../models/productModel.js"
import mongoose from "mongoose";
import User from "../models/userModel.js"
import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
export const createProduct = asyncHandler(async (req, res) => {
    try {
        const { title, description, category, regularPrice, salesPrice, shippingType, deliveryType, vendor, stockQuantity, offer, collections, tags } = req.body;

        const userId = req.user?._id;
        if (!userId) {
            return res.status(404).json({ message: "User not found" });
        }
        const findCategory = await Category.findOne({ name: category });
        if (!findCategory) {
            return res.status(404).json({ message: "Category not found!!" })
        }
        const pictureLocalPath = req.file.path;

        if (!pictureLocalPath) {
            return res.status(400).json({ message: "file path not found" })
        }
        const picture = await uploadOnCloudinary(pictureLocalPath);
        const product = await Product.create({
            title,
            description,
            picture: picture?.url || "",
            category: findCategory?._id,
            categoryTitle: category,
            regularPrice,
            salesPrice,
            shippingType,
            deliveryType,
            vendor,
            stockQuantity,
            offer,
            collections,
            tags,
            createdBy: userId
        })
        await product.save()
        if (product) {
            return res.status(201).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error?.message })
    }
})

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
        const adminId = req.user?._id;

        const products = await Product.aggregate([
            {
                $match: {
                    createdBy: adminId
                }
            }, {
                $project: {
                    _id: 1,
                    title: 1,
                    picture: 1,
                    salesPrice: 1,
                    categoryTitle: 1,
                    tags: 1,
                    vendor: 1,
                    createdAt: 1,
                }
            }
        ])
        if (products.length === 0) {
            return res.status(404).json({ message: "No Data Found!!" })
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
}
export const getAllProducts = asyncHandler(async (_, res) => {
    try {
        const products = await Product.find().sort({ createAt: 1 })
        if (products.length === 0) {
            return res.status(404).json({
                message
                    : "Products not found!!"
            })
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// fetch single product by id 
export const getSingleProduct = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "product not found" })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})