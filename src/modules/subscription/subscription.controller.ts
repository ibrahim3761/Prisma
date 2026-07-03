import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utitils/catchAsync";
import { subscriptionServices } from "./subscription.service";
import { sendResponse } from "../../utitils/sendResponse";
import httpStatus from "http-status";

const createCheckoutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;

    const result = await subscriptionServices.createCheckoutSession(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Checkout completed successfully",
      data: result,
    });
  },
);

const handleWebhook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const event = req.body as Buffer;
    const signature = req.headers['stripe-signature']!;

    await subscriptionServices.handleWebhook(event,signature as string)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Webhook triggered successfully",
      data: null,
    });
  },
);

export const subscriptionController = {
  createCheckoutSession, 
  handleWebhook,
};
