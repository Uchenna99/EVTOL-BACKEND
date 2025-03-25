/*
  Warnings:

  - You are about to drop the column `evtolId` on the `Load` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_evtolId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_evtolId_fkey";

-- AlterTable
ALTER TABLE "Load" DROP COLUMN "evtolId";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "evtolId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_evtolId_fkey" FOREIGN KEY ("evtolId") REFERENCES "Evtol"("id") ON DELETE SET NULL ON UPDATE CASCADE;
