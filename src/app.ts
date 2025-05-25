import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { AppError } from './app/error/appError';
import AppRoutes from './app/routes/index';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';

const app: Application = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(helmet()); // Adds basic security headers to the app
app.use(express.json()); // Parse incoming JSON requests

app.use('/status', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.use('/api/v1', AppRoutes);

// Undefined Routes Handler
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
