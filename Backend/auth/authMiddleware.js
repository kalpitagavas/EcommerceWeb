const jwt=require("jsonwebtoken");
const User = require("../model/userModel");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("Token received:", token); // Spy 1

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token ID:", decoded.id); // Spy 2

            req.user = await User.findById(decoded.id).select("-password");
            console.log("User found in DB:", req.user); // Spy 3

            next();
        } catch (error) {
            console.error("JWT Error:", error.message); // Spy 4
            res.status(401).json({ success: false, message: "Not authorized, token failed" });
        }
    }
  
};
    


module.exports = { protect };