/*
  Warnings:

  - Added the required column `city` to the `hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_address` to the `hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hotels` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `district` VARCHAR(191) NULL,
    ADD COLUMN `full_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL;
