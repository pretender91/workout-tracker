import type { WorkoutBlock } from "../domain/workout-block.js";

type CreateWorkoutBlockParams = Pick<WorkoutBlock, "workoutId" | "order">;
type UpdateWorkoutBlockParams = Pick<WorkoutBlock, "id"> &
  Partial<Pick<WorkoutBlock, "order" | "updatedAt">>;

export interface WorkoutBlockGateway {
  createWorkoutBlock(params: CreateWorkoutBlockParams): Promise<WorkoutBlock>;
  updateWorkoutBlock(params: UpdateWorkoutBlockParams): Promise<WorkoutBlock>;
  removeWorkoutBlock(params: Pick<WorkoutBlock, "id">): Promise<void>;
  findWorkoutBlockById(
    params: Pick<WorkoutBlock, "id">
  ): Promise<WorkoutBlock | null>;
  findWorkoutBlocksByWorkoutId(
    params: Pick<WorkoutBlock, "workoutId">
  ): Promise<WorkoutBlock[]>;
}
