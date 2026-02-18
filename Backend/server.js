const express=require("express")
const cors=require("cors");
const connectDB = require("./config/db");
const userRotate = require("./routes/userRoutes");
const orderRotate = require("./routes/orderRoute");
const productRotate = require("./routes/productRoute");
require('dotenv').config();
const app=express();
// Database Connection
connectDB();
// Middlewares
app.use(cors())
app.use(express.json());

app.get("/",()=>res.send("API is running successfully..."))

app.use('/api/users', userRotate);
app.use('/api/orders',orderRotate);
app.use('/api/product',productRotate);
const PORT=process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Successfully running Backend on port ${PORT}`)
})