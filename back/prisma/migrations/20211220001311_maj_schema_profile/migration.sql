/*
  Warnings:

  - You are about to drop the column `picture` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `image` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageAltText` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "picture",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "imageAltText" TEXT NOT NULL;
