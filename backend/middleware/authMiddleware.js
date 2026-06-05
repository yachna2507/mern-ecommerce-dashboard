
//protect route
const jwt = require("jsonwebtoken");
const protect = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({message: "No token" });

    }
    try {
        const decoded = jwt.verify(token, "secretkey123");
        req.user = decoded;
        //only admin allowed
        if (decoded.role !== "admin") {
            return
            res.status(403).json( {message: "Admin only access" });
        }
        next();
    } catch (err) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = protect;