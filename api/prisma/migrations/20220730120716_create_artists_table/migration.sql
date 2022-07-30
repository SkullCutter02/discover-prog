-- CreateTable
CREATE TABLE "artists" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "numericalId" INTEGER,
    "biography" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "country" VARCHAR(40) NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "artists_numericalId_key" ON "artists"("numericalId");
