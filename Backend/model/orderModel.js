const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    // 1. WHO: Link to the User who bought it
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },  
    
    // 2. PAYMENT & PROGRESS
    isPaid: { 
        type: String, 
        enum: ['Paid', 'Unpaid', 'inProcess'], 
        default: 'Unpaid' 
    },
    status: { 
        type: String, 
        enum: ["Pending", "Processing", "Shipped", "Delivered"], 
        default: "Pending" 
    },

    // 3. WHAT: An array of products
    items: [{
        product: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true 
        },
        name: { type: String, required: true },     // Snapshot: so if product name changes later, receipt stays same
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },    // Snapshot: so if price changes later, receipt stays same
    }],

    // 4. WHERE: Delivery details
    shippingAddress: {
        address: String,
        city: String,
        zipCode: String
    },

    // 5. HOW MUCH
    totalPrice: { type: Number }
   
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;