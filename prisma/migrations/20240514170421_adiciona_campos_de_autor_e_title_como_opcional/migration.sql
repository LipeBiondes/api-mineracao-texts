-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_texts_sanitized" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "autor" TEXT,
    "content" TEXT NOT NULL
);
INSERT INTO "new_texts_sanitized" ("autor", "content", "id", "title") SELECT "autor", "content", "id", "title" FROM "texts_sanitized";
DROP TABLE "texts_sanitized";
ALTER TABLE "new_texts_sanitized" RENAME TO "texts_sanitized";
CREATE TABLE "new_texts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "autor" TEXT,
    "content" TEXT NOT NULL
);
INSERT INTO "new_texts" ("autor", "content", "id", "title") SELECT "autor", "content", "id", "title" FROM "texts";
DROP TABLE "texts";
ALTER TABLE "new_texts" RENAME TO "texts";
PRAGMA foreign_key_check("texts_sanitized");
PRAGMA foreign_key_check("texts");
PRAGMA foreign_keys=ON;
