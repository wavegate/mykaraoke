/*
  Warnings:

  - You are about to drop the column `name` on the `JobListing` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Keyword` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `Keyword` table. All the data in the column will be lost.
  - Added the required column `company` to the `JobListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `JobListing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobListing" DROP COLUMN "name",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "crawlDate" TIMESTAMP(3),
ADD COLUMN     "specialization" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Keyword" DROP COLUMN "category",
DROP COLUMN "count";

-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "_JobListingToKeyword" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobListingToKeyword_AB_unique" ON "_JobListingToKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_JobListingToKeyword_B_index" ON "_JobListingToKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToKeyword_AB_unique" ON "_CategoryToKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToKeyword_B_index" ON "_CategoryToKeyword"("B");

-- AddForeignKey
ALTER TABLE "_JobListingToKeyword" ADD CONSTRAINT "_JobListingToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "JobListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobListingToKeyword" ADD CONSTRAINT "_JobListingToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToKeyword" ADD CONSTRAINT "_CategoryToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToKeyword" ADD CONSTRAINT "_CategoryToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword"("name") ON DELETE CASCADE ON UPDATE CASCADE;
