import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();

// Set origin: true akan otomatis mengizinkan URL frontend apapun yang mengaksesnya
app.use(cors({
    origin: true, 
    credentials: true
}));

app.use(express.json());

// Pastikan menggunakan '/api' agar cocok dengan panggilan axios di frontend Anda
app.use('/api', UserRoutes);

export default app;