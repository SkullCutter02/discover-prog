-- CreateEnum
CREATE TYPE "AlbumType" AS ENUM ('STUDIO', 'LIVE');

-- CreateTable
CREATE TABLE "albums" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "numericalId" INTEGER,
    "name" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "trackListing" TEXT NOT NULL,
    "musicians" TEXT NOT NULL,
    "albumType" "AlbumType" NOT NULL,
    "imageUrl" TEXT,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "albums_numericalId_key" ON "albums"("numericalId");

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
