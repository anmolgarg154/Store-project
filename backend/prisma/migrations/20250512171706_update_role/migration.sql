/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "roleEnum" AS ENUM ('user', 'admin', 'storeOwner');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "roleEnum" NOT NULL;
