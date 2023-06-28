-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_cityId_fkey";

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "cityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
