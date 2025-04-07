import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    //Este user va a ser el identificador del usuario que acaba de crear la orden
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    //Cada vez que creemos una orden, necesitamos un array de productos
    // [
    //     {
    //         product: "ASJKDNASKJFASN35646",
    //         quantity: 2,
    //     },
    //     {
    //         product: "ASJKDNASKJFASN35646",
    //         quantity: 2,
    //     },
    // ]
    products: [
        {   
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const Order = mongoose.model("orders", orderSchema);