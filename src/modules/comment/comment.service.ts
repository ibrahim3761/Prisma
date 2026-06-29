import { prisma } from "../../lib/prisma"
import { ICreateCommentPayload } from "./comment.interface"

const createComment = async (authorId: string, payload: ICreateCommentPayload) => {
    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    })

    const comment = await prisma.comment.create({
        data: {
            ...payload,
            authorId
        },
        // include:{
        //     post : true
        // }
    })

    return comment
}

const getCommentByAuthorId = () => {

}

const getCommentByCommentId = () => {

}

const updateComment = () => {

}

const deleteComment = () => {

}

const moderateComment = () => {

}

export const commentService = {
    createComment,
    getCommentByAuthorId,
    getCommentByCommentId,
    updateComment,
    deleteComment,
    moderateComment
}