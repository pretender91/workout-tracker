
-- CreateTable
CREATE TABLE "Exercise" (
    "id" UUID NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

