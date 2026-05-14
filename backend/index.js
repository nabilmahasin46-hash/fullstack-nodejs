import express from 'express';
import cors from 'cors';
import db from "./config/database.js";
import UserRoutes from "./routes/UserRoutes.js";
const app = express();

// Database connection dengan proper error handling
(async () => {
    try {
        await db.authenticate();
        console.log('Database Connected...');
        await db.sync();
    } catch (error) {
        console.error('Database Connection Failed:', error.message);
        console.error('App will start but database operations will fail');
    }
})();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Limit request size
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
    res.json({ msg: 'Backend is running', timestamp: new Date().toISOString() });
});

app.use(UserRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ msg: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        msg: 'Internal server error',
        error: process.env.NODE_ENV === 'production' ? undefined : err.message
    });
});

export default app;

