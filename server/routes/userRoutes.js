import express from "express";
import { signup, login, updateProfile, forgetPassword, resetPassword, changePassword } from "../controllers/userControllers.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();


// sign up 
router.post("/signup", signup)
router.post("/login", login)
router.put("/update-profile/:userId", protect, updateProfile)
router.post("/forget-password", protect, forgetPassword)
router.post("/reset-password", protect, resetPassword)
router.post("/change-password/:userId", protect, changePassword)

export default router;
