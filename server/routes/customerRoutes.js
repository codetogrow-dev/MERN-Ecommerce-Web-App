import express from "express";
import { createCart, getCarts, editCart } from "../controllers/cartControllers.js"
import { getAllProducts, getSingleProduct } from "../controllers/productControllers.js";
import { addToWishlist, allWishLists, deleteWishList } from "../controllers/wishlistControllers.js";
import protect from "../middleware/authMiddleware.js";
import verifyJWT from "../middleware/authMiddleware.js";
const router = express.Router();
// cart routes 
router.post("/create-cart/:userId", protect, createCart)
router.get("/get-carts/:userId", protect, getCarts)
router.put("/edit-cart/:cartId", protect, editCart)
// product routes
router.get("/products", verifyJWT, getAllProducts)
router.get("/product/:productId", verifyJWT, getSingleProduct)
//wishlist routes
router.post("/wishlist/:productId", verifyJWT, addToWishlist)
router.get("/wishlist", verifyJWT, allWishLists)
router.delete("/wishlist/:wishlistId", verifyJWT, deleteWishList)
export default router;