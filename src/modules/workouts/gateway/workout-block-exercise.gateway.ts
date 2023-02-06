import type { WorkoutBlockExercise } from "../domain/workout-block-exercise.js";

type CreateWorkoutBlockExerciseParams = Pick<
  WorkoutBlockExercise,
  "workoutBlockId" | "exerciseId" | "order"
>;

type UpdateWorkoutBlockExerciseParams = Pick<WorkoutBlockExercise, "id"> &
  Partial<Pick<WorkoutBlockExercise, "order" | "exerciseId">>;

export interface WorkoutBlockExerciseGateway {
  createWorkoutBlockExercise(
    params: CreateWorkoutBlockExerciseParams
  ): Promise<WorkoutBlockExercise>;
  updateWorkoutBlockExercise(
    params: UpdateWorkoutBlockExerciseParams
  ): Promise<WorkoutBlockExercise>;
  removeWorkoutBlockExercise(
    params: Pick<WorkoutBlockExercise, "id">
  ): Promise<void>;
  findWorkoutBlockExerciseById(
    params: Pick<WorkoutBlockExercise, "id">
  ): Promise<WorkoutBlockExercise | null>;
  findWorkoutBlockExercisesByWorkoutBlockId(
    params: Pick<WorkoutBlockExercise, "workoutBlockId">
  ): Promise<WorkoutBlockExercise[]>;
  findWorkoutBlockExercisesByExerciseId(
    params: Pick<WorkoutBlockExercise, "exerciseId">
  ): Promise<WorkoutBlockExercise[]>;
}
