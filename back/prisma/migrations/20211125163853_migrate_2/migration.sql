/*
  Warnings:

  - Added the required column `haveDog` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "haveDog" TEXT NOT NULL,
ADD COLUMN     "isAdmin" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "password" TEXT NOT NULL;
