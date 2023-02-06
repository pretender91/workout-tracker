import type { Context } from "../../../context.js";
import {
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../../../libs/generic-errors.js";
import type { UseCase } from "../../../libs/use-case.js";
import type { Workout } from "../domain/workout.js";

type RemoveWorkoutInput = Pick<Workout, "id">;
type RemoveWorkoutOutput = void;
type RemoveWorkoutContext = Pick<Context, "workoutGateway" | "currentUser">;

export class RemoveWorkout
  implements UseCase<RemoveWorkoutInput, RemoveWorkoutOutput>
{
  constructor(private readonly context: RemoveWorkoutContext) {}

  public async execute(
    input: RemoveWorkoutInput
  ): Promise<RemoveWorkoutOutput> {
    const { currentUser } = this.context;

    if (!currentUser) {
      throw new UnauthenticatedError();
    }

    const workout = await this.context.workoutGateway.findById(input);

    if (!workout) {
      throw new NotFoundError();
    }

    if (currentUser.isUser && !workout.isCreatedBy(currentUser)) {
      throw new UnauthorizedError();
    }

    await this.context.workoutGateway.removeById(workout);
  }
}
