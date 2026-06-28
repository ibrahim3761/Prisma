/*
  Warnings:

  - The `status` column on the `comments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('APPROVED', 'REJECT');

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "status",
ADD COLUMN     "status" "CommentStatus" NOT NULL DEFAULT 'APPROVED';

-- DropEnum
DROP TYPE "ComentStatus";
