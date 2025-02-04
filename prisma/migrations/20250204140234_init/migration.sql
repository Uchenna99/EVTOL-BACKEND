/*
  Warnings:

  - You are about to drop the column `ordersId` on the `Load` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_ordersId_fkey";

-- AlterTable
ALTER TABLE "Load" DROP COLUMN "ordersId",
ADD COLUMN     "orderId" TEXT;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
