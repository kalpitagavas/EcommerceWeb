const Product=require("../model/productModel")


// @desc    Get all products
// @route   GET /api/products
const getAllProduct=async(req,res)=>{
    try{
      const product =await Product.find({})
      res.status(200).json({success:true,data:product})
    }
    catch(err){
      res.status(500).json({success:false,error:err.message})
    }
}

// @desc    Create product
// @route   POST /api/products
const newproduct=async(req,res)=>{
    try{
        const product=await Product.create(req.body)
        if(!product) return res.status(401).json({succes:false})
            res.status(201).json({success:true,data:product})
    }
    catch(err){
        res.status(500).json({succes:false,error:err.message})
    }
}

// @desc    Get single product by ID
// @route   GET /api/products/:id
const singleProduct=async(req,res)=>{
    try{
       const getSingleProduct=await Product.findById(req.params.id)
       if(!getSingleProduct) return res.status(404).json({succes:false}) 
       res.status(200).json({success:true,data:getSingleProduct})
    }
    catch(err){
        res.status(500).json({success:false,error:err.message})
    }
}

// @desc    Update product
// @route   PUT /api/products/:id
const updateProduct=async(req,res)=>{
    try{
        const updateproduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
   if(!updateproduct) return res.status(404).json({succes:false}) 
   res.status(200).json({success:true,data:updateproduct})
}
    catch(err){
        res.status(500).json({success:false,error:err.message})
    }
}


// @desc    Delete product
// @route   DELETE /api/products/:id
const deleteProduct=async(req,res)=>{
    try{
        const deleteProduct=await Product.findByIdAndDelete(req.params.id)
   if(!deleteProduct) return res.status(404).json({succes:false}) 
   res.status(200).json({success:true,data:deleteProduct})
}
    catch(err){
        res.status(500).json({success:false,error:err.message})
    }
}


module.exports={getAllProduct,newproduct,singleProduct,updateProduct,deleteProduct}