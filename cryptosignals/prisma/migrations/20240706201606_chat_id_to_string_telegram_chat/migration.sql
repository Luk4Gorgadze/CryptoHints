-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TelegramChat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatId" TEXT,
    "Username" TEXT NOT NULL
);
INSERT INTO "new_TelegramChat" ("Username", "chatId", "id") SELECT "Username", "chatId", "id" FROM "TelegramChat";
DROP TABLE "TelegramChat";
ALTER TABLE "new_TelegramChat" RENAME TO "TelegramChat";
PRAGMA foreign_key_check("TelegramChat");
PRAGMA foreign_keys=ON;
