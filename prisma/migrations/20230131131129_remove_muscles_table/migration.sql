/*
  Warnings:

  - You are about to drop the `Muscle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseToMuscle` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Muscle" AS ENUM ('Abdominals', 'Obliques', 'Forearms', 'Biceps', 'Shoulders', 'Traps', 'Chest', 'Quads', 'Hamstrings', 'Lowerback', 'Glutes', 'Lats', 'Traps_Middle', 'Calves', 'Triceps');

-- DropForeignKey
ALTER TABLE "_ExerciseToMuscle" DROP CONSTRAINT "_ExerciseToMuscle_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToMuscle" DROP CONSTRAINT "_ExerciseToMuscle_B_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "muscles" "Muscle"[];

-- DropTable
DROP TABLE "Muscle";

-- DropTable
DROP TABLE "_ExerciseToMuscle";
