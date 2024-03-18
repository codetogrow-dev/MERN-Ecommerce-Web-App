import express from "express";
import { createCart, getCarts, editCart } from "../controllers/cartControllers.js"
import protect from "../middleware/authMiddleware.js";
const router = express.Router();
// cart routes 

router.post("/create-cart/:userId", protect, createCart)
router.get("/get-carts/:userId", protect, getCarts)
router.put("/edit-cart/:cartId", protect, editCart)
export default router;