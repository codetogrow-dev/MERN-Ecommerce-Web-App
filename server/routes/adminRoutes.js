import express from "express";
import { createProduct, deleteProduct, editProduct, listProducts } from "../controllers/productControllers.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create-product/:adminId", protect, createProduct)
router.put("/edit-product/:productId", protect, editProduct)
router.delete("/delete-product/:productId", protect, deleteProduct)
router.get("/products/:adminId", protect, listProducts)

export default router;