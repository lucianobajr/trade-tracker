/*
  Warnings:

  - You are about to drop the column `cep` on the `cities` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "cities_cep_key";

-- AlterTable
ALTER TABLE "cities" DROP COLUMN "cep";
