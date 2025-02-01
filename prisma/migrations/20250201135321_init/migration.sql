-- CreateEnum
CREATE TYPE "EvtolModel" AS ENUM ('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight');

-- CreateEnum
CREATE TYPE "EvtolState" AS ENUM ('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING');

-- CreateTable
CREATE TABLE "Evtol" (
    "id" SERIAL NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "model" "EvtolModel" NOT NULL,
    "batteryCapacity" TEXT NOT NULL,
    "state" "EvtolState" NOT NULL,

    CONSTRAINT "Evtol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medications" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Medications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Evtol_id_key" ON "Evtol"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Medications_id_key" ON "Medications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Medications_code_key" ON "Medications"("code");
