/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `todos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "todos_userId_key" ON "todos"("userId");
