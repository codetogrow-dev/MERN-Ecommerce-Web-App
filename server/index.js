import express from "express";
import bodyParser from "body-parser"   // import body parser
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

const port = 5000;
app.use(cors())
app.use(bodyParser.json()) // it will help the express app to parse the json data    
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on("connected", () => {
    console.log("database connected");
})

app.use("/api/user", userRouter)


// signup   http://localhost:5000/api/user/signup

// app.get("/", (req, res) => {
//     res.status(200).json("express app is working")
// })

app.listen(port, () => {
    console.log(`server is running at port ${port} successfully`)
})


