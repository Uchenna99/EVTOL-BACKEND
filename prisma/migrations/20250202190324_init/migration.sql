/*
  Warnings:

  - Made the column `evtolId` on table `Load` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_evtolId_fkey";

-- AlterTable
ALTER TABLE "Load" ALTER COLUMN "evtolId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_evtolId_fkey" FOREIGN KEY ("evtolId") REFERENCES "Evtol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
