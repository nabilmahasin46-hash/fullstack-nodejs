import app from "./index.js";
import db from "./config/database.js";
import "./models/userModel.js";

const PORT = process.env.PORT || 5000;

// Test koneksi database & sync model sebelum server start
try {
    await db.authenticate();
    console.log('✅ Database connected.');
    await db.sync();
    console.log('✅ Models synced.');
} catch (error) {
    console.error('❌ Database connection failed:', error.message);
    // App tetap jalan supaya Railway tidak 502, tapi log error agar terlihat
}

// Ubah bagian ini:
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use`);
    } else {
        console.error('❌ Server error:', err);
    }
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});
