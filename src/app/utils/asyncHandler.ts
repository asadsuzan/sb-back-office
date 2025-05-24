import { NextFunction, Request, RequestHandler, Response } from 'express';

const asyncHandler =
  (func: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch((error) => next(error));
  };

export default asyncHandler;
