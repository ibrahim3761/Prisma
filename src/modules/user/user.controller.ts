import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utitils/catchAsync";
import { sendResponse } from "../../utitils/sendResponse";
import jwt from "jsonwebtoken"
import config from "../../config";
import { jwtUtils } from "../../utitils/jwt";

// const registerUser = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;

//     const user = await userService.registerUserIntoDB(payload);

//     res.status(httpStatus.CREATED).json({
//       success: true,
//       status: httpStatus.CREATED,
//       message: "User registered successfully",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       status: httpStatus.INTERNAL_SERVER_ERROR,
//       message: "Failed to register user",
//       error: (error as Error).message,
//     });
//   }
// };

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: { user },
    });
  },
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const {accessToken} = req.cookies;

    // const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)

    // if(typeof verifiedToken === 'string'){
    //   throw new Error(verifiedToken)
    // }

    const profile = await userService.getMyProfileFromDB(req.user?.id as string)

    sendResponse(res,{
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile fetched successfully",
      data: { profile },
    })
  },
);

const updateMyProfile = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
  const userId = req.user?.id as string;

  const payload = req.body

  const updatedProfile = await userService.updateMyProfileIntoDB(userId, payload);

  sendResponse(res,{
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile updated successfully",
      data: { updatedProfile },
    })

})


export const userController = {
  registerUser,
  getMyProfile,
  updateMyProfile
};
