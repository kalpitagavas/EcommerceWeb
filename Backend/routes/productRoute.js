const express=require("express");
const { getAllProduct, newproduct, singleProduct, updateProduct, deleteProduct } = require("../controller/productController");
const router=express.Router();


router.get("/",getAllProduct);
router.post('/',newproduct);
router.get('/:id',singleProduct);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

module.exports=router