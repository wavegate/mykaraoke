/*
  Warnings:

  - You are about to drop the column `profileId` on the `Certification` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_KeywordToProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `githubLink` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioLink` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_jobListingId_fkey";

-- DropForeignKey
ALTER TABLE "_KeywordToProfile" DROP CONSTRAINT "_KeywordToProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_KeywordToProfile" DROP CONSTRAINT "_KeywordToProfile_B_fkey";

-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "profileId",
ADD COLUMN     "resumeId" INTEGER;

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "profileId",
ADD COLUMN     "resumeId" INTEGER;

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "profileId",
ADD COLUMN     "resumeId" INTEGER;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "profileId",
ADD COLUMN     "resumeId" INTEGER;

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "githubLink" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "portfolioLink" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ALTER COLUMN "jobListingId" DROP NOT NULL;

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "_KeywordToProfile";

-- CreateTable
CREATE TABLE "_KeywordToResume" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KeywordToResume_AB_unique" ON "_KeywordToResume"("A", "B");

-- CreateIndex
CREATE INDEX "_KeywordToResume_B_index" ON "_KeywordToResume"("B");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_jobListingId_fkey" FOREIGN KEY ("jobListingId") REFERENCES "JobListing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToResume" ADD CONSTRAINT "_KeywordToResume_A_fkey" FOREIGN KEY ("A") REFERENCES "Keyword"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToResume" ADD CONSTRAINT "_KeywordToResume_B_fkey" FOREIGN KEY ("B") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
