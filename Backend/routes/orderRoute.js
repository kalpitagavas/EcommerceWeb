const express=require('express');
const { getallOrder, newOrder, getOrderById, updateOrder, deleteOrder } = require('../controller/orderController');
const { protect } = require('../auth/authMiddleware');

const router=express.Router()

router.get('/',getallOrder);
router.post('/',protect,newOrder);
router.get('/:id',getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id',deleteOrder);

module.exports=router