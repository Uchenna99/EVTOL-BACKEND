-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "EvtolModel" AS ENUM ('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight');

-- CreateEnum
CREATE TYPE "EvtolState" AS ENUM ('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING');

-- CreateEnum
CREATE TYPE "Regions" AS ENUM ('Rumuola', 'Rumuigbo', 'Rumuokwuta', 'Rumuokoro', 'Rumudara', 'Rumubiakani', 'Rumuodumaya', 'Rumuogba');

-- CreateTable
CREATE TABLE "Load" (
    "id" TEXT NOT NULL,
    "medicationsId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" TEXT,

    CONSTRAINT "Load_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "evtolId" INTEGER,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evtol" (
    "id" SERIAL NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "model" "EvtolModel" NOT NULL,
    "maxWeight" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "batteryCapacity" INTEGER NOT NULL DEFAULT 100,
    "state" "EvtolState" NOT NULL DEFAULT 'IDLE',

    CONSTRAINT "Evtol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "googleId" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "image" TEXT,
    "region" "Regions" NOT NULL,
    "password" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'USER',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "otp" TEXT,
    "otpExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medications" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Medications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Load_id_key" ON "Load"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Evtol_id_key" ON "Evtol"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Evtol_serialNumber_key" ON "Evtol"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medications_id_key" ON "Medications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Medications_code_key" ON "Medications"("code");

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_medicationsId_fkey" FOREIGN KEY ("medicationsId") REFERENCES "Medications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_evtolId_fkey" FOREIGN KEY ("evtolId") REFERENCES "Evtol"("id") ON DELETE SET NULL ON UPDATE CASCADE;
