/*
Warnings:
- You are about to drop the `TelegramChatId` table. If the table is not empty, all the data it contains will be lost.
*/
-- CreateTable
CREATE TABLE "TelegramChat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatId" TEXT NOT NULL
);