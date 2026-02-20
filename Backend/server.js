const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require("./config/db");

// 1. Load Environment Variables
dotenv.config();

// 2. Import Route Files
const userRotate = require("./routes/userRoutes");
const orderRotate = require("./routes/orderRoute");
const productRotate = require("./routes/productRoute");

// 3. Connect to Database
connectDB();

const app = express();

// 4. Global Middlewares
app.use(cors());         // Allows your frontend to communicate with this backend
app.use(express.json());   // Lets the server read JSON data from the request body

// 5. Health Check Route
// Fixed: Added (req, res) so the server doesn't crash when you visit the homepage
app.get("/", (req, res) => {
    res.send("API is running successfully...");
});

// 6. Define API Routes
app.use('/api/users', userRotate);
app.use('/api/orders', orderRotate);
app.use('/api/product', productRotate);

// 7. Start the Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Successfully running Backend on port ${PORT}`);
});