-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('breakfast', 'mainDishes', 'drinks', 'desserts');

-- CreateTable
CREATE TABLE "public"."MenuItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "category" "public"."Category" NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PagesItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "PagesItem_pkey" PRIMARY KEY ("id")
);
