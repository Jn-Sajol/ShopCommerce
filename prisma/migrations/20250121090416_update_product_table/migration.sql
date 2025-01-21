/*
  Warnings:

  - You are about to drop the column `userId` on the `Adress` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `Adress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Adress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Adress" DROP CONSTRAINT "Adress_userId_fkey";

-- AlterTable
ALTER TABLE "Adress" DROP COLUMN "userId",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adress" ADD CONSTRAINT "Adress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adress" ADD CONSTRAINT "Adress_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
