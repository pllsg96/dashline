/*
  Warnings:

  - A unique constraint covering the columns `[driverId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reviews_driverId_key" ON "reviews"("driverId");
