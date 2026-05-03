import express from 'express';
import cors from 'cors';
import UserRoutes from "./routes/UserRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));