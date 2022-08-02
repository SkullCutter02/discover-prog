-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'EDITOR', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';
