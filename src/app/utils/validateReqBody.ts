import { AnyZodObject } from 'zod';
import { Request, NextFunction, Response } from 'express';
const validateRequestBody = (validationSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validationSchema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequestBody;
