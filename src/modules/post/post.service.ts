import { prisma } from "../../lib/prisma";
import { ICreatePostPayload } from "./post.interface";

const createPost = async (payload: ICreatePostPayload, userId : string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return result;
};

const getAllPosts = () => {};

const getPostsStats = () => {};

const getMyPosts = () => {};

const getPostById = () => {};

const updatePost = () => {};

const deletePost = () => {};

export const postService = {
  getAllPosts,
  createPost,
  getPostsStats,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
};
