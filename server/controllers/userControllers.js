import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
let createToken = (_id, fullname, username, email, picture, isAdmin) => {
    const payload = {
        _id,
        fullname,
        username,
        email,
        picture,
        isAdmin
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10d" })
}

export const signup = async (req, res) => {

    const { fullname, email, username, password, picture, isAdmin } = req.body

    if (!fullname || !email || !username || !password) {
        return res.status(400).json({ message: "Please fill all the fields" })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return res.status(400).json({ message: "email already exists" })
    }

    const findByUsername = await User.findOne({ username })
    if (findByUsername) {
        return res.status(400).json({ message: "username already exists" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Email is not a valid email " })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({

            fullname,
            email,
            username,
            password: hashedPassword,
            picture,
            isAdmin


        })

        await user.save()

        res.status(201).json({
            _id: user._id,

            fullname: user.fullname,
            email: user.email,
            username: user.username,
            password: user.password,
            picture: user.picture,
            isAdmin: user.isAdmin,
            token: createToken(user._id, user.fullname, user.email, user.picture, user.isAdmin),
            message: "user Successfully Registered",
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: "email is required" })
    }
    if (!password) {
        return res.status(400).json({ message: "password is required" })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(500).json({ message: "User not found!!!" })
        }

        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
            return res.status(400).json({ message: "Incorrect Password" })
        }
        res.status(201).json({
            _id: user._id,

            fullname: user.fullname,
            email: user.email,
            password: user.password,
            picture: user.picture,
            isAdmin: user.isAdmin,
            token: createToken(user._id, user.fullname, user.email, user.picture, user.isAdmin),
            message: "user Successfully loggedIn",
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }


}
// update Profile
export const updateProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        const fieldsToUpdate = req.body;

        const user = await User.findByIdAndUpdate(userId, { $set: fieldsToUpdate }, { new: true })
        if (!user) {
            return res.status(404).json({ message: "User not found!!" })
        }
        res.status(201).json({ user, message: "Profile update successfully" })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// forget password 
export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ message: "Email is required " })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found!!" })
        }

        const OTP = crypto.randomBytes(12).toString("hex");
        const expiry = Date.now() + 3600000                 // 1hour = 60 mintues , 1 minute = 60sec + 1sec =  1000msec        60*60*10000  1hour = 3600000 
        user.resetPasswordToken = OTP;
        user.resetPasswordExpires = expiry;

        await user.save();

        const transporter = nodemailer.createTransport({

            service: "gmail",
            auth: {
                user: process.env.DEV_EMAIL,
                pass: process.env.DEV_PASS,
            }

        })

        const mailOptions = {
            from: process.env.DEV_EMAIL,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP is ${OTP}`
        }
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return res.status(400).json({ message: error.message || "Failed to send OTP" })
            }

            res.status(201).json({
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                password: user.password,
                picture: user.picture,
                isAdmin: user.isAdmin,
                username: user.username,
                message: "Email sended Successfully",
            })
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const resetPassword = async (req, res) => {
    const { password, confirmPassword, resetPasswordToken } = req.body;

    if (!password || !confirmPassword || !resetPasswordToken) {
        return res.status(400).json({ message: "All fields are mandatory to be filled" })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password not matched" })
    }

    if (!resetPasswordToken) {
        return res.status(400).json({ message: "OTP is required" })
    }

    try {

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(404).json({ message: "User not found !!" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword;

        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            password: user.password,
            picture: user.picture,
            isAdmin: user.isAdmin,
            username: user.username,
            message: "Password Reset Successfully",
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// change Password 

export const changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const { userId } = req.params
    try {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ message: "All fields are mondatary to be filled" })
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Password not matched" })
        }


        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }
        const isValidPassword = await bcrypt.compare(currentPassword, user.password)
        if (!isValidPassword) {
            return res.status(400).json({ message: "Incorrect Password" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        await user.save();

        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            password: user.password,
            picture: user.picture,
            isAdmin: user.isAdmin,
            username: user.username,
            message: "Password updated Successfully",
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }


}
