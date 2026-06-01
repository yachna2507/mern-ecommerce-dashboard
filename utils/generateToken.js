const jwt = require("jsonwebtoken");
const generateToken = (id) => {
    return jwt.sign({ id }, "secretkey123",
    {
        expiresIn: "1h",
    });
};
module.exports = generateToken;