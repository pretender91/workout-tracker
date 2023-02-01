-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'User');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'User';
