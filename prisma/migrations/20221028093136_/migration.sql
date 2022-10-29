/*
  Warnings:

  - Made the column `name` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Book_name_key";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "name" SET NOT NULL;
