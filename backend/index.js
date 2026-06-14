import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = process.env.FRONTEND_URL?.split(',') || ['http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());
app.use(UserRoutes);

export default app;
