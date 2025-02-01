/*
  Warnings:

  - Changed the type of `batteryCapacity` on the `Evtol` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Evtol" DROP COLUMN "batteryCapacity",
ADD COLUMN     "batteryCapacity" INTEGER NOT NULL,
ALTER COLUMN "state" SET DEFAULT 'IDLE';

-- CreateTable
CREATE TABLE "_EvtolToMedications" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EvtolToMedications_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EvtolToMedications_B_index" ON "_EvtolToMedications"("B");

-- AddForeignKey
ALTER TABLE "_EvtolToMedications" ADD CONSTRAINT "_EvtolToMedications_A_fkey" FOREIGN KEY ("A") REFERENCES "Evtol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EvtolToMedications" ADD CONSTRAINT "_EvtolToMedications_B_fkey" FOREIGN KEY ("B") REFERENCES "Medications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
