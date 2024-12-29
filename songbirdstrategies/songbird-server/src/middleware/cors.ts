import cors from 'cors';
import { env } from '../config/env';

export const corsMiddleware = cors({
  origin: true, // Allow all origins in development
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});