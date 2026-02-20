const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        unique: true, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        enum: ['Clothes', 'Electronics', 'Kitchen','Jewellery'] // Only these 3 are allowed!
    },
    price: { 
        type: Number, 
        required: true 
    },
    inStock: { 
        type: Number, 
        required: true, 
        default: 1,
        min: [0, "Stock cannot be negative"] // Safety check!
    },
    image: { 
        type: String, 
        default: 'default-product.jpg' 
    },
    // This connects the product to the Admin who added it
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Product = mongoose.model("Product", productSchema);
module.exports = Product;