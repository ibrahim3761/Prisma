import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utitils/catchAsync";
import { premiumServices } from "./premium.service";
import { sendResponse } from "../../utitils/sendResponse";
import httpStatus from "http-status";

const getPremiumContent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const result = await premiumServices.getPremiumContent(query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Premium content fetched successfully",
      data: result.data,
      meta: result.meta
    });
  },
);

export const premiumController = {
  getPremiumContent,
};
