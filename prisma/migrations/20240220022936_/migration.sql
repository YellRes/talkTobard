/*
  Warnings:

  - You are about to drop the column `authorId` on the `History` table. All the data in the column will be lost.
  - Added the required column `userId` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `History` DROP FOREIGN KEY `History_authorId_fkey`;

-- AlterTable
ALTER TABLE `History` DROP COLUMN `authorId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
