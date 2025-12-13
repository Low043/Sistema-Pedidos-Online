/*
  Warnings:

  - Added the required column `imagemUrl` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "imagemUrl" VARCHAR(200) NOT NULL;
