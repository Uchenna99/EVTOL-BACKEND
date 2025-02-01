/*
  Warnings:

  - You are about to drop the column `quantity` on the `Medications` table. All the data in the column will be lost.
  - You are about to drop the `_EvtolToMedications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EvtolToMedications" DROP CONSTRAINT "_EvtolToMedications_A_fkey";

-- DropForeignKey
ALTER TABLE "_EvtolToMedications" DROP CONSTRAINT "_EvtolToMedications_B_fkey";

-- AlterTable
ALTER TABLE "Medications" DROP COLUMN "quantity";

-- DropTable
DROP TABLE "_EvtolToMedications";

-- CreateTable
CREATE TABLE "Load" (
    "id" SERIAL NOT NULL,
    "quantity" TEXT NOT NULL,
    "medicationsId" INTEGER NOT NULL,
    "evtolId" INTEGER,

    CONSTRAINT "Load_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Load_id_key" ON "Load"("id");

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_medicationsId_fkey" FOREIGN KEY ("medicationsId") REFERENCES "Medications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_evtolId_fkey" FOREIGN KEY ("evtolId") REFERENCES "Evtol"("id") ON DELETE SET NULL ON UPDATE CASCADE;
