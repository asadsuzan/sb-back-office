// Custom AppError Class
export class AppError extends Error {
  statusCode: number;
  status: string;
  error?: unknown;
  constructor(message: string, statusCode: number, error?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.error = error;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
