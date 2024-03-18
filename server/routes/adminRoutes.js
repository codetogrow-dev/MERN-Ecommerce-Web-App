import express from "express";
import { createProduct, deleteProduct, editProduct, listProducts } from "../controllers/productControllers.js";
import { createCategory, getCategories } from "../controllers/categoryController.js";
import verifyJWT from "../middleware/authMiddleware.js";
const router = express.Router();

//Product routes
router.post("/create-product/:adminId", verifyJWT, createProduct)
router.post("/category", verifyJWT, createCategory)
router.get("/category", verifyJWT, getCategories)
router.put("/edit-product/:productId", verifyJWT, editProduct)
router.delete("/delete-product/:productId", verifyJWT, deleteProduct)
router.get("/products/:adminId", verifyJWT, listProducts)
export default router;