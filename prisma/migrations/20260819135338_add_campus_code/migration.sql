/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Campus` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Campus" ADD COLUMN     "code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Campus_code_key" ON "Campus"("code");
