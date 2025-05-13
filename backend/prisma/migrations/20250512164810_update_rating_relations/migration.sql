/*
  Warnings:

  - You are about to drop the column `rating` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "rating";

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "rate" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
