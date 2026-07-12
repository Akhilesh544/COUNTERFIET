/*
  Warnings:

  - You are about to drop the column `confidence` on the `Scan` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `Scan` table. All the data in the column will be lost.
  - Added the required column `type` to the `Scan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verdict` to the `Scan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scan" DROP COLUMN "confidence",
DROP COLUMN "result",
ADD COLUMN     "mlProbability" DOUBLE PRECISION,
ADD COLUMN     "reasons" JSONB,
ADD COLUMN     "ruleScore" DOUBLE PRECISION,
ADD COLUMN     "scamProbability" DOUBLE PRECISION,
ADD COLUMN     "transcript" TEXT,
ADD COLUMN     "trustScore" DOUBLE PRECISION,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "verdict" TEXT NOT NULL;
