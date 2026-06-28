import { PostStatus } from "../../../generated/prisma/enums";

export interface ICreatePostPayload {
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status?: PostStatus;
  tags: string[];
}

export interface IUpdatePostPaylaod {
  title?: string;
  content?: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status?: PostStatus;
  tags?: string[];
}
