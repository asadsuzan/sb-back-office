import { Response } from 'express';

interface SuccessResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

const sendSuccessResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
): Response<SuccessResponse<T>> => {
  return res.status(statusCode).json({
    status: true,
    statusCode,
    message,
    data,
  });
};

export default sendSuccessResponse;
