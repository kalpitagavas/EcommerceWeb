const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},  
    isPaid:{type:String,enum:['Paid','Unpaid','inProcess'],default:'Unpaid'},
    status:{type:String,enum:["Pending", "Processing", "Shipped", "Delivered"],default: "Pending"},
    items:[{

        product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
        name: { type: String, required: true },//incase it changes
        quantity: { type: Number, required: true, default: 1 },
        price : {type:Number,required:true},
        
    }],
    shippingAddress: {
            address:String,
            city:String,zipCode:String
        },
    totalPrice:{type:Number}
   
},{timestamps:true})

const Order=mongoose.model("Order",orderSchema)

module.exports=Order