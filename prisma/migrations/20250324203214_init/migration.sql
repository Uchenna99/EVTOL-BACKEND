/*
  Warnings:

  - You are about to drop the column `model` on the `Evtol` table. All the data in the column will be lost.
  - Added the required column `maxWeight` to the `Evtol` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_evtolId_fkey";

-- AlterTable
ALTER TABLE "Evtol" DROP COLUMN "model",
ADD COLUMN     "maxWeight" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Load" ALTER COLUMN "evtolId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_evtolId_fkey" FOREIGN KEY ("evtolId") REFERENCES "Evtol"("id") ON DELETE SET NULL ON UPDATE CASCADE;
