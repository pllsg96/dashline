/*
  Warnings:

  - Added the required column `date` to the `rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination` to the `rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distance` to the `rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverId` to the `rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `rides` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rides" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "distance" INTEGER NOT NULL,
ADD COLUMN     "driverId" INTEGER NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL,
ADD COLUMN     "ride_id" SERIAL NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
