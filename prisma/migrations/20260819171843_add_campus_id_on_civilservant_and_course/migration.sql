/*
  Warnings:

  - You are about to drop the column `institutionId` on the `courses` table. All the data in the column will be lost.
  - Added the required column `campusId` to the `civil_servants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campusId` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "civil_servants" ADD COLUMN     "campusId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "institutionId",
ADD COLUMN     "campusId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "civil_servants" ADD CONSTRAINT "civil_servants_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
