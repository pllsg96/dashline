/*
  Warnings:

  - Made the column `customerId` on table `rides` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "rides" DROP CONSTRAINT "rides_customerId_fkey";

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "rides" ALTER COLUMN "customerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
