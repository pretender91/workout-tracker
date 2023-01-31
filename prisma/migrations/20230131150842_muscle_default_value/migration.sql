-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "muscles" "Muscle"[] DEFAULT ARRAY[]::"Muscle"[];
