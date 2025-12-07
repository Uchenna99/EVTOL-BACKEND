/*
  Warnings:

  - You are about to drop the column `status` on the `DeliveryOrder` table. All the data in the column will be lost.
  - You are about to drop the column `totalWeight` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `name` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED');

-- AlterTable
ALTER TABLE "DeliveryOrder" DROP COLUMN "status",
ADD COLUMN     "deliveryStatus" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "totalWeight",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Status";
