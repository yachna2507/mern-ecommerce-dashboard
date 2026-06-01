const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const Order = require("./models/order");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", authRoutes);

//protected route
app.get("/dashboard", protect, (req, res) => {
            res.json({
         message: "Welcome dashboard",
         user: req.user,
});
        });

        //DB connect
        mongoose.connect("mongodb://localhost:27017/authDB")
        .then(() => console.log("MongoDB conected"))
        .catch((err) => console.log(err));
        app.post("/orders", async (req, res) =>
        { 
            console.log(req.body);
            try {
                const newOrder = new Order({
                    customerName: req.body.customerName,
                    product_name: req.body.product_name,
                    price: req.body.price,
                    quantity: req.body.quantity
                });
        
                await newOrder.save();
        
                res.send("Order added successfully");
            } catch (err) {
                console.log(err);
                res.send(err);
            }
        });
        //-- Read---
        app.get('/orders', async(req, res) =>
        {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page -1) * limit;
            const orders = await Order.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
            const total = await Order.countDocuments();
            res.json({
                orders,
                totalPages: Math.ceil(total/limit),
                currentpage: page,
            });
            });
            //Update ------
        
        app.put('/orders/:id', async (req, res) =>
        {
            try {
                const updateOrder = 
                await Order.findByIdAndUpdate(req.params.id, req.body,
                    {
                staus: req.body.status,
                    },
                    {
                        new: true
                    }
                );
            
                res.json("updateOrder");

        
            } catch (err) {
         console.log(err);
                res.status(500).json({
                    success: false,
            });
            }
            
        });
        
        //-- delete-- 
        
        app.delete('/orders/:id', async (req, res) =>
        {
            try {
                await Order.findByIdAndDelete(req.params.id);
                res.send("Order deleted");
            } catch (err) {
                console.log(err);
                res.send(err);
            }
        });
        
        
            

//server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});