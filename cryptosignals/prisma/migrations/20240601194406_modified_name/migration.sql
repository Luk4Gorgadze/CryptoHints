/*
  Warnings:

  - You are about to drop the `CurentFetchingCoin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CurentFetchingCoin";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CurrentFetchingCoin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "symbol" TEXT NOT NULL
);
