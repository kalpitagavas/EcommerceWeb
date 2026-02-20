const Product = require("../model/productModel");

/**
 * @desc    Get all products from the database
 * @route   GET /api/products
 * @access  Public (Anyone can browse)
 */
const getAllProduct = async (req, res) => {

    try {
       const { category, page = 1, limit = 12 } = req.query;
       let filter={}
       if(category) filter.category=category

       const skip = (page - 1) * limit;
       const products=await Product.find(filter).limit(Number(limit)).skip(skip)
    
       res.status(200).json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * @desc    Create a brand new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const newproduct = async (req, res) => {
    try {
        // We take the data sent from the frontend (name, price, etc.)
        const product = await Product.create(req.body);
        
        // If creation fails for some reason
        if (!product) return res.status(400).json({ success: false, message: "Failed to create product" });

        res.status(201).json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * @desc    Get a specific product using its unique ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const singleProduct = async (req, res) => {
    try {
        // req.params.id is the ID taken from the URL
        const getSingleProduct = await Product.findById(req.params.id);
        
        if (!getSingleProduct) return res.status(404).json({ success: false, message: "Product not found" }); 

        res.status(200).json({ success: true, data: getSingleProduct });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * @desc    Update product details (Price, Stock, etc.)
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res) => {
    try {
        // {new: true} tells Mongoose to return the UPDATED version of the product
        const updateproduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updateproduct) return res.status(404).json({ success: false, message: "Product not found" }); 
        
        res.status(200).json({ success: true, data: updateproduct });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * @desc    Remove a product from the database
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        
        if (!deletedProduct) return res.status(404).json({ success: false, message: "Product not found" }); 

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { getAllProduct, newproduct, singleProduct, updateProduct, deleteProduct };