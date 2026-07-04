import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utitils/catchAsync";
import { prisma } from "../lib/prisma";
import { SubscriptionStatus } from "../../generated/prisma/enums";

export const subscriptionGuard = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;

    const subscription = await prisma.subscription.findUnique({
      where: {
        userId,
      },
    });

    if (!subscription) {
      throw new Error("Please subscribe to access premium contents");
    }

    if (subscription?.status !== SubscriptionStatus.ACTIVE) {
      throw new Error("Please subscribe again to access premium contents");
    }

    next();
  });
};
