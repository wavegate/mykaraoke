/*
  Warnings:

  - A unique constraint covering the columns `[sourceId]` on the table `JobListing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JobListing_sourceId_key" ON "JobListing"("sourceId");
