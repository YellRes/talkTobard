/*
  Warnings:

  - You are about to drop the column `createdAt` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `HistoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `HistoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `History` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `HistoryItem` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
