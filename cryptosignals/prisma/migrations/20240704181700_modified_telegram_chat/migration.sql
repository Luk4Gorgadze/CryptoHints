/*
  Warnings:

  - You are about to alter the column `chatId` on the `TelegramChat` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TelegramChat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatId" INTEGER,
    "Username" TEXT NOT NULL
);
INSERT INTO "new_TelegramChat" ("Username", "chatId", "id") SELECT "Username", "chatId", "id" FROM "TelegramChat";
DROP TABLE "TelegramChat";
ALTER TABLE "new_TelegramChat" RENAME TO "TelegramChat";
PRAGMA foreign_key_check("TelegramChat");
PRAGMA foreign_keys=ON;
