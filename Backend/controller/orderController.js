const Order = require("../model/orderModel");
const Product = require("../model/productModel");

// @desc    Get all orders
const getallOrder = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email');
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Create new order
const newOrder = async (req, res) => {
    const {items, shippingAddress, user, isPaid, status}=req.body
    try {

// 1. First, check if ALL items are in stock
        for(const item of items){
            const product=await Product.findById(item.product)
            if(!product)return res.status(401).json({message: `Product ${item.product} not found`})
            if(product.inStock<item.quantity){
                return res.status(400).json({ 
                    message: `Not enough stock for ${product.name}. Only ${product.inStock} left.` 
                });
            }
            } 
        // 2. If stock is okay, calculate details and update stock
       let calculatedTotal = 0;
       const finalorder=await Promise.all(items.map(async(item)=>{
        const product=await Product.findById(item.product)
        product.inStock-=item.quantity
        await product.save();
calculatedTotal+=product.price *item.quantity
        return {
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            };
       }))

        const order = await Order.create({user: req.user._id,
            items:finalorder,
            shippingAddress,
            isPaid,
            status,
            totalPrice:calculatedTotal});
        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product', 'name image category');

        if (!order) return res.status(404).json({ success: false, data: 'Order not found' });
        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Update order
const updateOrder = async (req, res) => {
    try {
       
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ success: false, data: 'Order not found' });
        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Delete order
const deleteOrder = async (req, res) => {
    try {
       
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ success: false, data: 'Order not found' });
        res.status(200).json({ success: true, data: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { deleteOrder, updateOrder, getOrderById, newOrder, getallOrder };