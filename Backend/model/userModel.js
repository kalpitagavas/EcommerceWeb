const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please enter a name'] 
    },
    email: { 
        type: String, 
        lowercase: true, 
        required: [true, 'Please enter email'], 
        unique: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'] 
    },
    password: { 
        type: String, 
        required: [true, 'please enter a password'], 
        minlength: 6, 
        select: false // This hides the password by default when you find a user
    },
    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
    }
}, { timestamps: true });

// --- THE SECURITY GUARD (Pre-save Hook) ---
// This runs automatically every time you save a user
userSchema.pre('save', async function(next) {
    // If we are just updating the name/email (not password), skip this
    if (!this.isModified('password')) return next();

    // Hash the password so even if the DB is hacked, passwords are safe
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;