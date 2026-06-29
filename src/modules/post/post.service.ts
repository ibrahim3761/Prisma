import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
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
    // filtering / exact match without AND operator
    // where : {
    //   title : "My Third Post",
    //   content : "Ronaldo"
    // },

    // filtering / exact match with AND operator
    // where: {
    //   AND: [
    //     {
    //       title: "My Third Post",
    //     },
    //     {
    //       content: "Ronaldo",
    //     },
    //     {
    //       tags: {
    //         equals: ["typescripts", "prisma", "express"],
    //       },
    //     },
    //   ],
    // },

    // searching / partial match

    // where:{
    //   title : {
    //     contains : "ronaldo",
    //     mode : "insensitive"
    //   },
    //   // X Not ideal for partial match
    //   // content : {
    //   //   contains : "Ronaldo"
    //   // }
    // },

    // searching / partial search with OR operator

    // where: {
    //   OR: [
    //     {
    //       title: {
    //         contains: "ronaldo",
    //         mode: "insensitive",
    //       }
    //     },
    //     {
    //       content : {
    //         contains : "Ronaldo",
    //         mode: "insensitive"
    //       }
    //     }
    //   ],
    // },

    // combining search (OR) and filtering (AND)

    // where : {
    //   //filtering & seaching combine
    //   AND:[
    //     {
    //       //searching
    //       OR : [
    //         {
    //           title : {
    //             contains : "Ronaldo",
    //             mode : "insensitive"
    //           }
    //         },
    //         {
    //           content : {
    //             contains : "Ronaldo",
    //             mode : "insensitive"
    //           }
    //         }
    //       ]
    //     },
    //     // filtering
    //     {
    //       title : "Ronaldo Nazario"
    //     },
    //     {
    //       content : "Ronaldo"
    //     }
    //   ]
    // },

    take : 1,
    // skip : 1,
    skip:2,
    // skip = (page-1) * limit

    //sorting
    orderBy : {
      createdAt : "desc",
      title : "asc",
      content : "desc"
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
  return posts;
};

const getPostsStats = async () => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    // const totalPosts = await tx.post.count();

    // const totalPublishedPosts = await tx.post.count({
    //   where: {
    //     status: PostStatus.PUBLISHED,
    //   },
    // });

    // const totalDraftdPosts = await tx.post.count({
    //   where: {
    //     status: PostStatus.DRAFT,
    //   },
    // });

    // const totalArchivedPosts = await tx.post.count({
    //   where: {
    //     status: PostStatus.ARCHIVED,
    //   },
    // });

    // const totalComments = await tx.comment.count();

    // const totalApprovedComments = await tx.comment.count({
    //   where: {
    //     status: CommentStatus.APPROVED,
    //   },
    // });

    // const totalRejectedComments = await tx.comment.count({
    //   where: {
    //     status: CommentStatus.REJECT,
    //   },
    // });

    // //not a good appraoch
    // // const allPosts = await tx.post.findMany();

    // // let totalPostViews = 0;

    // // allPosts.forEach((post)=>{
    // //   totalPostViews = totalPostViews + post.views
    // // })

    // const totalPostViewsAggregate = await tx.post.aggregate({
    //   _sum: {
    //     views: true,
    //   },
    // });

    // const totalPostViews = totalPostViewsAggregate._sum.views;

    // return {
    //   totalPosts,
    //   totalPublishedPosts,
    //   totalDraftdPosts,
    //   totalArchivedPosts,
    //   totalComments,
    //   totalApprovedComments,
    //   totalRejectedComments,
    //   totalPostViews,
    // };

    const [
      totalPosts,
      totalPublishedPosts,
      totalDraftdPosts,
      totalArchivedPosts,
      totalComments,
      totalApprovedComments,
      totalRejectedComments,
      totalPostViewsAggregate,
    ] = await Promise.all([
      await tx.post.count(),

      await tx.post.count({
        where: {
          status: PostStatus.PUBLISHED,
        },
      }),

      await tx.post.count({
        where: {
          status: PostStatus.DRAFT,
        },
      }),

      await tx.post.count({
        where: {
          status: PostStatus.ARCHIVED,
        },
      }),

      await tx.comment.count(),

      await tx.comment.count({
        where: {
          status: CommentStatus.APPROVED,
        },
      }),

      await tx.comment.count({
        where: {
          status: CommentStatus.REJECT,
        },
      }),

      await tx.post.aggregate({
        _sum: {
          views: true,
        },
      }),
    ]);

    return {
      totalPosts,
      totalPublishedPosts,
      totalDraftdPosts,
      totalArchivedPosts,
      totalComments,
      totalApprovedComments,
      totalRejectedComments,
      totalPostViews: totalPostViewsAggregate._sum.views,
    };
  });

  return transactionResult;
};

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
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return posts;
};

const getPostById = async (postId: string) => {
  // await prisma.post.update({
  //   where: {
  //     id: postId,
  //   },
  //   data: {
  //     views: {
  //       increment: 1,
  //     },
  //   },
  // });

  // const post = await prisma.post.findUniqueOrThrow({
  //   where: {
  //     id: postId,
  //   },
  //   include : {
  //     author :{
  //       omit:{
  //         password : true
  //       },
  //     },
  //     comments :{
  //       where:{
  //         status : ComentStatus.APPROVED
  //       },
  //       orderBy:{
  //         createdAt : "desc"
  //       }
  //     },
  //     _count:{
  //       select:{
  //         comments : true
  //       }
  //     }
  //   }
  // });

  // return post;

  const transactionResult = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: {
        id: postId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    // throw new Error("fdafdsf")

    const post = await tx.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
        comments: {
          where: {
            status: CommentStatus.APPROVED,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  });

  return transactionResult;
};

const updatePost = async (
  postId: string,
  payload: IUpdatePostPaylaod,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not the owner of the post!!");
  }

  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data: payload,
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return result;
};

const deletePost = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not the owner of the post!!");
  }

  const result = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return null;
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
