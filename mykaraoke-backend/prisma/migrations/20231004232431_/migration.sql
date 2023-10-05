/*
  Warnings:

  - A unique constraint covering the columns `[source,sourceId]` on the table `JobListing` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "JobListing_sourceId_key";

-- CreateIndex
CREATE UNIQUE INDEX "JobListing_source_sourceId_key" ON "JobListing"("source", "sourceId");
