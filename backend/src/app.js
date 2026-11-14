import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import trafficRoutes from './routes/traffic.routes.js';
import routeRoutes from './routes/route.routes.js';
import fleetRoutes from './routes/fleet.routes.js';
import transitRoutes from './routes/transit.routes.js';
import emissionRoutes from './routes/emission.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'smartmove-ai-backend',
    mode: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/traffic', trafficRoutes);
app.use('/api/v1/routes', routeRoutes);
app.use('/api/v1/fleet', fleetRoutes);
app.use('/api/v1/transit', transitRoutes);
app.use('/api/v1/emissions', emissionRoutes);

app.use(errorHandler);

export default app;
