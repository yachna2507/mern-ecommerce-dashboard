const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

//register

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await
    User.findOne({ email });

    if (userExists) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await
    bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword,
    });
    res.json({
        message: "User registered",
        user,
    });
};

//login

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "User not found"
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }

    const token = generateToken(user._id);

    res.json({
        message: "Login successful",
        token,
    });
};