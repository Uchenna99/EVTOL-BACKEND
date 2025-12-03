-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "EvtolModel" AS ENUM ('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight');

-- CreateEnum
CREATE TYPE "EvtolState" AS ENUM ('IDLE', 'LOADING', 'DELIVERING', 'RETURNING', 'MAINTENANCE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "Regions" AS ENUM ('Rumuola', 'Rumuigbo', 'Rumuokwuta', 'Rumuokoro', 'Rumudara', 'Rumubiakani', 'Rumuodumaya', 'Rumuogba');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Emergency', 'General', 'Laboratory', 'HospitalSupplies', 'ColdChain');

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
CREATE TABLE "MedicalSupply" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'General',

    CONSTRAINT "MedicalSupply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "supplyId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "totalWeight" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryOrder" (
    "id" TEXT NOT NULL,
    "evtolId" INTEGER,
    "userId" TEXT NOT NULL,
    "reference" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Evtol_id_key" ON "Evtol"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Evtol_serialNumber_key" ON "Evtol"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalSupply_id_key" ON "MedicalSupply"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryOrder_id_key" ON "DeliveryOrder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryOrder_reference_key" ON "DeliveryOrder"("reference");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "DeliveryOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_evtolId_fkey" FOREIGN KEY ("evtolId") REFERENCES "Evtol"("id") ON DELETE SET NULL ON UPDATE CASCADE;
