import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utitils/catchAsync"
import { postService } from "./post.service";
import { sendResponse } from "../../utitils/sendResponse";
import httpStatus from "http-status";

const createPost = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const id = req.user?.id

    const payload = req.body;
    
    const result = await postService.createPost(payload,id as string)

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.CREATED,
        message : "Post Created SuccessFully",  
        data : result
    })
})

const getAllPosts = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const result = await postService.getAllPosts();

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.OK,
        message : "Posts Retrieved Successfully",
        data : result
    })
})

const getPostsStats = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{

})

const getMyPosts = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{

})

const getPostById = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const postId = req.params.postId;

    if(!postId){
        throw new Error("Post Id Reqquired in params")
    }

    const result = await postService.getPostById(postId as string)

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.OK,
        message : "Post retrieved successfuly",
        data : result
    })
})

const updatePost = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{

})

const deletePost = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{

})

export const postController ={
    getAllPosts,
    createPost,
    getPostsStats,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost
}