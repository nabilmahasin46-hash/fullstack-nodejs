import express from 'express';
import cors from 'cors';
import db from "./config/database.js";
import UserRoutes from "./routes/UserRoutes.js";
const app = express();


let dbConnected = false;
(async () => {
    try {
        await db.authenticate();
        console.log('✅ Database Connected...');
        await db.sync();
        dbConnected = true;
    } catch (error) {
        console.error('❌ Database Connection Failed:', error.message);
        console.error('App will start but database operations will fail');
        dbConnected = false;
    }
})();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'https://fullstack-nodejs.pages.dev',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(cors({ origin: 'https://fullstack-nodejs.pages.dev' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
    res.json({ 
        msg: 'Backend is running',
        timestamp: new Date().toISOString(),
        databaseConnected: dbConnected,
        environment: process.env.NODE_ENV || 'development'
    });
});

app.use(UserRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ msg: 'Route not found' });
});


app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        msg: 'Internal server error',
        error: process.env.NODE_ENV === 'production' ? undefined : err.message
    });
});

export default app;

