const express = require("express");
const { getAllProduct, newproduct, singleProduct, updateProduct, deleteProduct } = require("../controller/productController");
const { protect, admin } = require("../auth/authMiddleware"); // Add these!
const router = express.Router();

router.get("/", getAllProduct);
router.get('/:id', singleProduct);

// Restricted to Admin only
router.post('/', protect, admin, newproduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;