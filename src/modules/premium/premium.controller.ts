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
const getPremiumPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId as string;

    if (!postId) {
      throw new Error("Post Id Required In Params");
    }

    const result = await premiumServices.getPremiumPostById(postId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Premium post retrieved successfully",
      data: result,
    });
  },
);

export const premiumController = {
  getPremiumContent,
  getPremiumPostById,
};
