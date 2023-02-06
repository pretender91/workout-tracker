import type { WorkoutBlockExerciseSet } from "../domain/workout-block-exercise-set.js";

type CreateWorkoutBlockExerciseSetParams = Pick<
  WorkoutBlockExerciseSet,
  "workoutBlockExerciseId" | "order" | "reps" | "weight"
>;

type UpdateWorkoutBlockExerciseSetParams = Pick<WorkoutBlockExerciseSet, "id"> &
  Partial<Pick<WorkoutBlockExerciseSet, "order" | "reps" | "weight">>;

export interface WorkoutBlockExerciseSetGateway {
  createWorkoutBlockExerciseSet(
    params: CreateWorkoutBlockExerciseSetParams
  ): Promise<WorkoutBlockExerciseSet>;
  updateWorkoutBlockExerciseSet(
    params: UpdateWorkoutBlockExerciseSetParams
  ): Promise<WorkoutBlockExerciseSet>;
  removeWorkoutBlockExerciseSet(
    params: Pick<WorkoutBlockExerciseSet, "id">
  ): Promise<void>;
  findWorkoutBlockExerciseSetById(
    params: Pick<WorkoutBlockExerciseSet, "id">
  ): Promise<WorkoutBlockExerciseSet | null>;
  findWorkoutBlockExerciseSetsByWorkoutBlockExerciseId(
    params: Pick<WorkoutBlockExerciseSet, "workoutBlockExerciseId">
  ): Promise<WorkoutBlockExerciseSet[]>;
}
