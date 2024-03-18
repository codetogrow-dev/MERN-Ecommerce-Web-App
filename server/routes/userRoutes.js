import express from "express";
import { signup, login, updateProfile, forgetPassword, resetPassword, changePassword } from "../controllers/userControllers.js";
import verifyJWT from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerMiddleware.js";
const router = express.Router();


// sign up 
router.post("/signup", upload.single("picture"), signup)
router.post("/login", login)
router.put("/update-profile/:userId", verifyJWT, updateProfile)
router.post("/forget-password", verifyJWT, forgetPassword)
router.post("/reset-password", verifyJWT, resetPassword)
router.post("/change-password/:userId", verifyJWT, changePassword)

export default router;
