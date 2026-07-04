import { NextFunction, Request, Response, Router } from "express";
import { premiumController } from "./premium.controller";
import { auth } from "../../middlewares/auth";
import { Role, SubscriptionStatus } from "../../../generated/prisma/enums";
import { catchAsync } from "../../utitils/catchAsync";
import { prisma } from "../../lib/prisma";
import { subscriptionGuard } from "../../middlewares/premiumGuard";

const router = Router();

router.get(
  "/",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  subscriptionGuard(),
  premiumController.getPremiumContent,
);

export const premiumRoutes = router;
