const mongoose = require("mongoose");

/**
 * Logic: Establishing a connection to the MongoDB Database
 * This is an asynchronous function because connecting to a 
 * remote database takes a few seconds.
 */
const connectDB = async () => {
    try {
        // 1. Attempt to connect using the URL stored in your .env file
        const connect = await mongoose.connect(process.env.MONGO_URL);

        // 2. Success message: connect.connection.host tells you exactly where the DB is hosted (e.g., MongoDB Atlas)
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } 
    catch (err) {
        // 3. Failure: If the URL is wrong or the database is down
        console.error(`Error while connecting to MongoDB: ${err.message}`);

        // 4. Exit: process.exit(1) tells Node.js to shut down the server entirely 
        // because the app cannot function without a database.
        process.exit(1);
    }
}

module.exports = connectDB;