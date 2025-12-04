/*
  Warnings:

  - You are about to drop the column `region` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "region",
ADD COLUMN     "occupation" TEXT;
