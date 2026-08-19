/*
  Warnings:

  - Made the column `code` on table `Campus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Campus" ALTER COLUMN "code" SET NOT NULL;
