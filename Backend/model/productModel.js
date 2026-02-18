const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{type:String,unique: true,required:true,trim:true},
    description:{type:String,required:true},
    category:{type:String,enum:['Clothes','Electronics','Kitchen']},
    price:{type:Number,required:true},
    inStock:{type:Number,required:true, default:1,min:[0,"Stock cannot be negative"]},
   image:{type:String,default: 'default-product.jpg'},
   user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
},{timestamps:true})

const Product=mongoose.model("Product",productSchema)
module.exports=Product