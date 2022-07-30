/*
  Warnings:

  - Added the required column `name` to the `artists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "name" TEXT NOT NULL;
