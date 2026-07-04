import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utitils/catchAsync";
import { premiumServices } from "./premium.service";
import { sendResponse } from "../../utitils/sendResponse";
import httpStatus from "http-status";

const getPremiumContent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const result = await premiumServices.getPremiumContent();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Premium content fetched successfully",
      data: result,
    });
  },
);


export const premiumController = {
    getPremiumContent
};