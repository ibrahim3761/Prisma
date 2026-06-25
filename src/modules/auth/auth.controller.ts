import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utitils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utitils/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync( async(req : Request, res : Response, next : NextFunction)=>{
    const paylaod = req.body;

    const {accessToken, refreshToken} = await authService.loginUser(paylaod)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 // 24 hours or 1 day  
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    })

    sendResponse(res,{
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data : {accessToken, refreshToken}
    })

})

export const authController = {
    loginUser
}