const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
         const connect=await mongoose.connect(process.env.MONGO_URL)
         console.log(`Connection build Successfully ${connect.connection.host}`)
    }
    catch(err){
        console.log("Eroor while connecting to MongoDBs")
        process.exit(1);
    }
}

module.exports=connectDB