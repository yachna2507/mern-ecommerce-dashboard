const mongoose = require('mongoose');
const crypto = require('crypto');
const orderSchema = new mongoose.Schema(
    {
        customerName:{
            type: String
        },
       product_name:{ 
        type: String
       },
       price: {
       type: Number,
       },
       quantity: {
        type: Number
       },
       status: {
        type: String,
        default: "Pending",
       },
            
        });
    module.exports = mongoose.model("Order", orderSchema);