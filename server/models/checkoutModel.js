import mongoose from "mongoose";
const checkoutSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    deliveryType: {
        type: String,
        required: true,
        enum: ["Free Shipping", "Standard Shipping", "One Day Shipping", "Two Day Shipping"]
    },
    cardType: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true,
    },
    expiryMonth: {
        type: String,
        required: true
    },
    expiryYear: {
        type: String,
        required: true
    },
    CVV: {
        type: String,
        required: true,
    }


})

const Checkout = mongoose.model("Checkout", checkoutSchema);
export default Checkout;