/*
  Warnings:

  - You are about to drop the column `car` on the `drivers` table. All the data in the column will be lost.
  - Added the required column `vehicle` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "car",
ADD COLUMN     "vehicle" TEXT NOT NULL;
