import type { Context } from "../../../context.js";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../../../libs/generic-errors.js";
import type { Connection, PaginationParams } from "../../../libs/pagination.js";
import type { UseCase } from "../../../libs/use-case.js";
import type { Workout } from "../domain/workout.js";

type FindWorkoutsInput = {
  pagination: PaginationParams;
  filter: Partial<
    Pick<Workout, "userId"> & {
      dateBefore: Date;
      dateAfter: Date;
    }
  >;
};
type FindWorkoutsOutput = Connection<Workout>;
type FindWorkoutsContext = Pick<Context, "workoutGateway" | "currentUser">;

export class FindWorkouts
  implements UseCase<FindWorkoutsInput, FindWorkoutsOutput>
{
  constructor(private readonly context: FindWorkoutsContext) {}

  public async execute(input: FindWorkoutsInput): Promise<FindWorkoutsOutput> {
    const { currentUser } = this.context;

    if (!currentUser) {
      throw new UnauthenticatedError();
    }

    // Only admins can filter by others user ID
    if (
      input.filter.userId &&
      currentUser.isUser &&
      !currentUser.id.equals(input.filter.userId)
    ) {
      throw new UnauthorizedError();
    }

    return this.context.workoutGateway.findAll(
      Object.assign({}, input, {
        filter: Object.assign({}, input.filter, {
          userId: input.filter.userId ?? currentUser.id,
        }),
      })
    );
  }
}
