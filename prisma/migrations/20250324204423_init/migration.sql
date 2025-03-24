/*
  Warnings:

  - Added the required column `model` to the `Evtol` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evtol" ADD COLUMN     "model" "EvtolModel" NOT NULL;
