import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: 'TaskMaster Pro API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api'
    }
  });
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
import authRoutes from './routes/auth.routes';
import statsRoutes from './routes/stats.routes';
app.use('/api/auth', authRoutes);
app.use('/api/tasks', statsRoutes);
// app.use('/api/projects', projectRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
