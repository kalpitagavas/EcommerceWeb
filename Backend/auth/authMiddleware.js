const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

/**
 * MIDDLEWARE: Protect
 * Logic: Checks if the user is logged in by verifying their JWT token.
 */
const protect = async (req, res, next) => {
    let token;

    // 1. Check if the 'Authorization' header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // 2. Extract the token (e.g., "Bearer 12345" -> ["Bearer", "12345"] -> "12345")
            token = req.headers.authorization.split(" ")[1];

            // 3. Verify the token using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Find the user in the DB using the ID inside the token
            // .select("-password") ensures we don't carry the password around in 'req.user'
            req.user = await User.findById(decoded.id).select("-password");

            // 5. Move to the next function (the Controller)
            next();
        } catch (error) {
            // If token is expired or tampered with
            res.status(401).json({ success: false, message: "Not authorized, token failed" });
        }
    }

    // 6. If no token is found at all
    if (!token) {
        res.status(401).json({ success: false, message: "Not authorized, no token" });
    }
};

/**
 * MIDDLEWARE: Admin
 * Logic: Checks if the logged-in user has the 'admin' role.
 * Note: Must be placed AFTER 'protect' in the route file.
 */
const admin = (req, res, next) => {
    // req.user was populated by the protect middleware above
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed!
    } else {
        res.status(403).json({ success: false, message: "Not authorized as an admin" });
    }
}

module.exports = { protect, admin };