const express = require("express");
const router = express.Router();
const user = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


router.post("/register", async (req, res) => {
    const {email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await
    bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        password: hashedPassword,
    });
    res.json({
        message: "User registered successfully",
        user,
    });
});

    router.post("/login", async (req , res) => {
// check user exists
        const { email, password } = req.body;
        
        

            const user= await User.findOne({email});

            if (!user) {
                return
                res.status(400).json({message: "User not found"});
            }
// check password
const isMatch = await
bcrypt.compare(password, user.password);

if(!isMatch) {
    return
    res.status(400).json({message: "Invalid password" });
}
//create token

const token = jwt.sign(
    { id: user._id },
    "secretkey123",
    { expiresIn: "1h" }
);
//send response
res.json({
    message: "Login success",
    token,
    user
});
        
    });
    

module.exports = router;