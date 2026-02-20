const Order = require("../model/orderModel");
const Product = require("../model/productModel");

/**
 * @desc    Get all orders (Admin only usually)
 * @route   GET /api/orders
 */
const getallOrder = async (req, res) => {
    try {
        // Find all orders and bring in User details (name/email) instead of just the ID
        const orders = await Order.find({}).populate('user', 'name email');
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * @desc    Create new order & Decrease Product Stock
 * @route   POST /api/orders
 */
const newOrder = async (req, res) => {
    const { items, shippingAddress, isPaid, status } = req.body;
    
    try {
        // STEP 1: PRE-CHECK STOCK
        // We loop through the items BEFORE doing anything to ensure we don't run out halfway
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) return res.status(404).json({ message: `Product ${item.product} not found` });
            
            if (product.inStock < item.quantity) {
                return res.status(400).json({ 
                    message: `Not enough stock for ${product.name}. Only ${product.inStock} left.` 
                });
            }
        } 

        // STEP 2: UPDATE STOCK & PREPARE ORDER ITEMS
        let calculatedTotal = 0;
        
        // Use Promise.all because we are doing async database calls inside a map
        const finalorder = await Promise.all(items.map(async (item) => {
            const product = await Product.findById(item.product);
            
            // Decrease the inventory count in the database
            product.inStock -= item.quantity;
            await product.save();
            
            // Add to the total price tally
            calculatedTotal += product.price * item.quantity;
            
            // Return a clean object for the Order collection
            return {
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            };
        }));

        // STEP 3: SAVE THE ORDER
        const order = await Order.create({
            user: req.user._id, // Taken from the 'protect' middleware
            items: finalorder,
            shippingAddress,
            isPaid,
            status,
            totalPrice: calculatedTotal
        });

        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * @desc    Get order by ID (With Ownership Security)
 * @route   GET /api/orders/:id
 */
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product', 'name image category');

        if (!order) return res.status(404).json({ success: false, data: 'Order not found' });

        // SECURITY CHECK:
        // isOwner: Does the ID on the order match the person logged in?
        // isAdmin: Is the logged-in person an admin?
        const isOwner = order.user._id.toString() === req.user._id.toString();
        const isAdmin = req.user.role === 'admin';

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ 
                success: false, 
                message: 'Not authorized to view this order' 
            });
        }

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * @desc    Update order (e.g., mark as delivered)
 * @route   PUT /api/orders/:id
 */
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ success: false, data: 'Order not found' });
        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * @desc    Delete order
 * @route   DELETE /api/orders/:id
 */
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ success: false, data: 'Order not found' });
        res.status(200).json({ success: true, data: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        // Find orders where the 'user' field matches the logged-in user's ID
        // req.user._id comes from your 'protect' middleware
        const orders = await Order.find({ user: req.user._id });
        
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { deleteOrder, updateOrder, getOrderById, newOrder, getallOrder,getMyOrders };