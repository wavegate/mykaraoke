-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobListing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT,
    "postingDate" TIMESTAMP(3),
    "location" TEXT,
    "salary" INTEGER,
    "listingLink" TEXT,
    "applyLink" TEXT,
    "source" TEXT,
    "sourceId" TEXT,

    CONSTRAINT "JobListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "category" TEXT,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
