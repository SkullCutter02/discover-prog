/*
  Warnings:

  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `numericalId` on the `Genre` table. All the data in the column will be lost.
  - Changed the type of `id` on the `Genre` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `genreId` on the `albums` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "albums" DROP CONSTRAINT "albums_genreId_fkey";

-- DropIndex
DROP INDEX "Genre_numericalId_key";

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
DROP COLUMN "numericalId",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "albums" DROP COLUMN "genreId",
ADD COLUMN     "genreId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
