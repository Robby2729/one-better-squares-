const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Fallback to local MongoDB if MONGO_URI is not set
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/realestate';
        
        // Connect to MongoDB
        const conn = await mongoose.connect(uri);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        
        // Connection Event Listeners for monitoring
        mongoose.connection.on('error', (err) => {
            console.error(`❌ MongoDB Runtime Error: ${err.message}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB Disconnected. Application may not function correctly.');
        });

        // Graceful Shutdown: close DB connection when app terminates
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('🛑 MongoDB connection closed due to app termination (SIGINT).');
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            await mongoose.connection.close();
            console.log('🛑 MongoDB connection closed due to app termination (SIGTERM).');
            process.exit(0);
        });

    } catch (error) {
        console.error(`❌ MongoDB Initial Connection Failed: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
