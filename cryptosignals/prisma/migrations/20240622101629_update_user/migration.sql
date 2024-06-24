-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "subscriptionPlan" TEXT,
    "telegramChatId" TEXT,
    CONSTRAINT "User_telegramChatId_fkey" FOREIGN KEY ("telegramChatId") REFERENCES "TelegramChat" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "firstName", "id", "lastName", "password", "subscriptionPlan", "telegramChatId", "updatedAt") SELECT "createdAt", "email", "firstName", "id", "lastName", "password", "subscriptionPlan", "telegramChatId", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_telegramChatId_key" ON "User"("telegramChatId");
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
