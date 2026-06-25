import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utitils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utitils/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync( async(req : Request, res : Response, next : NextFunction)=>{
    const paylaod = req.body;

    const loginResult = await authService.loginUser(paylaod)

    sendResponse(res,{
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in  successfully",
      data : {loginResult}
    })

})

export const authController = {
    loginUser
}