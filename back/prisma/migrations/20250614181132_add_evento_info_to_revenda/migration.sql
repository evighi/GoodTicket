/*
  Warnings:

  - Added the required column `eventoId` to the `Revenda` table without a default value. This is not possible if the table is not empty.
  - Made the column `descricaoEvento` on table `Revenda` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Revenda" ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "eventoId" TEXT NOT NULL,
ADD COLUMN     "eventoImagem" TEXT,
ADD COLUMN     "eventoUrl" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ALTER COLUMN "descricaoEvento" SET NOT NULL;
