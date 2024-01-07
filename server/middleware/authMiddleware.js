import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
const protect = async (req, res, next) => {
    let token;



    let authToken = req.headers.authorization || req.headers.Authorization;

    if (!authToken) {
        return next();
    }

    try {

        token = authToken.split(" ")[1]   // token =  "Bearer egdwedweuidweuidnwedinwejdnwdnweidnwidwui"

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken._id).select("-password");
        next();

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

    if (!token) {
        return res.status(400).json({ message: "User is not Authorized " })
    }

}
export default protect;