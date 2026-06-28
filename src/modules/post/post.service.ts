import { prisma } from "../../lib/prisma";
import { ICreatePostPayload, IUpdatePostPaylaod } from "./post.interface";

const createPost = async (payload: ICreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return result;
};

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });
  return posts;
};

const getPostsStats = () => {};

const getMyPosts = async (authorId: string) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: {
        omit: {
          password: true,
        },
      },
      _count :{
        select :{
          comments : true
        }
      }
    },
  });

  return posts
};

const getPostById = async (postId: string) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return updatedPost;
};

const updatePost = async(postId : string, payload : IUpdatePostPaylaod, authorId : string, isAdmin : boolean) => {
  const post = await prisma.post.findUniqueOrThrow({
    where : {
      id : postId
    }
  })

  if(!isAdmin && post.authorId !== authorId){
    throw new Error("You are not the owner of the post!!")
  }

  const result = await prisma.post.update({
    where :{
      id : postId
    },
    data : payload,
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  })

  return result
};

const deletePost = async(postId : string, authorId : string, isAdmin : boolean) => {
  const post = await prisma.post.findUniqueOrThrow({
    where : {
      id : postId
    }
  })

  if(!isAdmin && post.authorId !== authorId){
    throw new Error("You are not the owner of the post!!")
  }

  const result = await prisma.post.delete({
    where :{
      id : postId
    }
  })

  return null
};

export const postService = {
  getAllPosts,
  createPost,
  getPostsStats,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
};
