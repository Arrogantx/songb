import express from 'express';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/error-handler';
import { healthRoutes } from './routes/health';
import { contentRoutes } from './routes/content';

export const createApp = () => {
  const app = express();

  // Middleware
  app.use(corsMiddleware);
  app.use(express.json());

  // Set default headers
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });

  // Routes
  app.use('/health', healthRoutes);
  app.use('/api', contentRoutes);

  // Error handling
  app.use(errorHandler);

  // Handle 404
  app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  return app;
};