import type { Context } from "../../../context.js";
import {
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../../../libs/generic-errors.js";
import type { UseCase } from "../../../libs/use-case.js";
import type { Workout } from "../domain/workout.js";

type UpdateWorkoutInput = Pick<Workout, "id" | "date">;
type UpdateWorkoutOutput = Workout;
type UpdateWorkoutContext = Pick<Context, "currentUser" | "workoutGateway">;

export class UpdateWorkout
  implements UseCase<UpdateWorkoutInput, UpdateWorkoutOutput>
{
  constructor(private readonly context: UpdateWorkoutContext) {}

  public async execute(
    input: UpdateWorkoutInput
  ): Promise<UpdateWorkoutOutput> {
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

    workout.date = input.date;

    return this.context.workoutGateway.update(workout);
  }
}
