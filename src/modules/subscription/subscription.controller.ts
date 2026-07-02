import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utitils/catchAsync";

const createCheckoutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const subscriptionController = {
  createCheckoutSession,
};
