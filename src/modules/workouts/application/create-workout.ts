import type { Context } from "../../../context.js";
import type { UseCase } from "../../../libs/use-case.js";
import type { Workout } from "../domain/workout.js";

type CreateWorkoutInput = {
  date: Date;
};
type CreateWorkoutOutput = Workout;
type CreateWorkoutContext = Pick<Context, "workoutGateway" | "currentUser">;

export class CreateWorkout
  implements UseCase<CreateWorkoutInput, CreateWorkoutOutput>
{
  constructor(private readonly context: CreateWorkoutContext) {}

  public async execute(
    input: CreateWorkoutInput
  ): Promise<CreateWorkoutOutput> {
    if (!this.context.currentUser) throw new Error("Unauthorized");

    return this.context.workoutGateway.create({
      userId: this.context.currentUser.id,
      date: input.date,
    });
  }
}
