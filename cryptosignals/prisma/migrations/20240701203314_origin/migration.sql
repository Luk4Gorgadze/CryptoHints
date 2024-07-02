-- CreateTable
CREATE TABLE "User" (
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

-- CreateTable
CREATE TABLE "cryptoData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "symbol" TEXT NOT NULL,
    "time" DATETIME NOT NULL,
    "timeVisual" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "CurrentFetchingCoin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "symbol" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TelegramChat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatId" TEXT,
    "Username" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramChatId_key" ON "User"("telegramChatId");
