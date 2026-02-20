const mongoose=require("mongoose")
const User=require("../model/userModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//create new user
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user already exists FIRST
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // 2. NOW create the user
        const newUser = await User.create(req.body);
        
        // Remove password from the response for security
        newUser.password = undefined;

        res.status(201).json({ success: true, data: newUser });
    } catch (err) {
        // If it still hits 500, it's a real server issue
        res.status(500).json({ success: false, error: err.message });
    }
}
//get all users
const getAllUser=async(req,res)=>{
  //  const{name,email}=req.body
    try{
     const user=await User.find().select('name email role');
     res.status(200).json({data:user})
    }
    catch(err){
        res.status(500).json({success:false,error:err.message})
    }
}

//delete user
const deleteUser=async(req,res)=>{
    try{
     const removeUser=await User.findByIdAndDelete(req.params.id)
     if(!removeUser) return res.status(401).json({success:false,data:'user not found'})
     res.status(200).json({succes:true,data:removeUser})
    }
    catch(err){
 res.status(500).json({success:false,error:err.message})
    }
}
// Get Single User by ID (Professional Way)
const getSingleUser = async (req, res) => {
    try {
        // We use req.params.id because it comes from the URL /api/users/:id
        const user = await User.findById(req.params.id).select("-password");
        
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update User (Professional Way)
const updateUser = async (req, res) => {
    try {
        // Use { new: true } so 'updatedUser' contains the NEW data, not the old data
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({ success: true, data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const login = async (req, res) => {
    // 1. Get BOTH email and password from the body

    console.log("Body received:", req.body);
    const { email, password } = req.body; 

    try {
        // 2. Find user and select the hidden password
        const user = await User.findOne({ email }).select('+password');
       

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // 3. AWAIT the direct compare
        const isMatch = await bcrypt.compare(password, user.password);

        // 4. Actually CHECK if they match!
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }


         
      
            // 3. Generate the Token
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'})
       

        // 5. Success
        res.status(200).json({ 
            success: true, 
            message: "Login successful", 
             userId: user._id ,
             token:token,email:email,
             name: user.name,
             role: user.role
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}
module.exports={register,login,getAllUser,getSingleUser,deleteUser,updateUser}