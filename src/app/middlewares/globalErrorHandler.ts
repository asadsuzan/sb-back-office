/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleZodError from '../error/zodErrorHandler';
import config from '../config';
import handleMongooseValidationError from '../error/mongooseValidationErrorHandler';
import mongoose from 'mongoose';
import TErrorSource from '../error/errorSource.interface';
import handleMongooseCastError from '../error/mongooseCastErrorHandler';
import mongooseDuplicateErrorHandler from '../error/mongooseDuplicateErrorHandler';
import { AppError } from '../error/appError';

// Global Error Handler Middleware
export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  // setup default status code and message
  let statusCode = error.statusCode || 500;
  let message = error.message || 'An unknown error occurred';

  // construct the error source
  let errorSource: TErrorSource[] = [
    {
      path: '',
      message: message,
    },
  ];

  // check if the error is zod error , if it is modify  the default statuscode,message and the errorSource
  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation failed';
    errorSource = handleZodError(error);
  } else if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Validation Error';
    errorSource = handleMongooseValidationError(error);
  } else if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${error?.path}`;
    errorSource = handleMongooseCastError(error);
  } else if (error?.code === 11000) {
    statusCode = 400;
    message = `Duplicate entry`;
    errorSource = mongooseDuplicateErrorHandler(error);
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSource = [
      {
        path: '',
        message: error.message,
      },
    ];
  }
  // send error response
  res.status(statusCode).json({
    status: false,
    statusCode,
    message,
    errorSource,
    timestamp: new Date().toISOString(),
    // error,
    stack:
      config.NODE_ENV === 'development'
        ? error?.stack
        : 'No Stack Is Available',
  });
};
