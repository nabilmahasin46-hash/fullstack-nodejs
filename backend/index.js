import express from 'express';
import cors from 'cors';
import db from "./config/database.js";
import UserRoutes from "./routes/UserRoutes.js";
const app = express();
(async () => {
    try {
        await db.authenticate();
        console.log('Database Connected...');
        await db.sync(); // Ini akan membuat tabel 'Users' di Railway jika belum ada
    } catch (error) {
        console.error('Connection error:', error);
    }
})();
app.use(cors());
app.use(express.json());
app.use(UserRoutes);
export default app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));