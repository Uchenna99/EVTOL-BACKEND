/*
  Warnings:

  - Added the required column `evtolId` to the `Load` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Load" ADD COLUMN     "evtolId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_evtolId_fkey" FOREIGN KEY ("evtolId") REFERENCES "Evtol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
