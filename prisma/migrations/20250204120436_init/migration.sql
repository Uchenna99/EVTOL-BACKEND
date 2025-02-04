/*
  Warnings:

  - The primary key for the `Load` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `evtolId` on the `Load` table. All the data in the column will be lost.
  - Added the required column `image` to the `Evtol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Medications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_evtolId_fkey";

-- AlterTable
ALTER TABLE "Evtol" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Load" DROP CONSTRAINT "Load_pkey",
DROP COLUMN "evtolId",
ADD COLUMN     "ordersId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Load_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Load_id_seq";

-- AlterTable
ALTER TABLE "Medications" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
