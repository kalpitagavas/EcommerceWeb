const express = require('express');
const { getallOrder, newOrder, getOrderById, updateOrder, deleteOrder,getMyOrders } = require('../controller/orderController');
const { protect, admin } = require('../auth/authMiddleware');
const router = express.Router();

// Only admin should see EVERYONE'S orders
router.get('/', protect, admin, getallOrder); 

// ANY logged-in user can create an order
router.post('/', protect, newOrder); 

router.get('/myorders', protect, getMyOrders);

// User can see their own order (Note: you'll need logic in controller to check ownership)
router.get('/:id', protect, getOrderById);

// Admin usually manages status (Shipped/Delivered) or deletes
router.put('/:id', protect, admin, updateOrder);
router.delete('/:id', protect, admin, deleteOrder);

module.exports = router;