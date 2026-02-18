const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    name:{type:String,required:[true,'Please enter a name']},
    email:{type:String,lowercase: true,required:[true,'Please enter email'],unique:true,match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']},
    password:{type:String,required:[true,'please enter a password'],minlength:6,select:false},
    role:{type:String,enum:["user","admin"],default:"user"}
},{timestamps:true})


userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();
    const salt=await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
  
})
const User=mongoose.model("User",userSchema)
module.exports=User