import { Response } from 'express';

export const successResponse = (res: Response, data: object, message: string) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res: Response, message: string, status: number) => {
  return res.status(status).json({
    success: false,
    message,
  });
};
