import type { Context } from "../../../context.js";
import {
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../../../libs/generic-errors.js";
import type { UseCase } from "../../../libs/use-case.js";
import type { Workout } from "../domain/workout.js";

type FindWorkoutByIdInput = Pick<Workout, "id">;
type FindWorkoutByIdOutput = Workout;

export class FindWorkoutById
  implements UseCase<FindWorkoutByIdInput, FindWorkoutByIdOutput>
{
  constructor(
    private readonly context: Pick<Context, "currentUser" | "workoutGateway">
  ) {}

  public async execute(
    input: FindWorkoutByIdInput
  ): Promise<FindWorkoutByIdOutput> {
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

    return workout;
  }
}
