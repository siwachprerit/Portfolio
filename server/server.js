import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Portfolio API is running' });
});

// Connect DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
