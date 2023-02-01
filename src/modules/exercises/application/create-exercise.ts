import type { UseCase } from "../../../libs/use-case.js";
import type { User } from "../../users/domain/user.js";
import type { Exercise } from "../domain/exercise.js";
import type { ExerciseGateway } from "../infrastructure/exercise.gateway.js";

type CreateExerciseInput = Pick<Exercise, "name" | "muscles">;

type CreateExerciseContext = {
  exerciseGateway: ExerciseGateway;
  currentUser?: User;
};

type CreateExerciseOutput = Exercise;

export class ExerciseNameAlreadyTakenError extends Error {
  public override readonly name = "ExerciseNameAlreadyTakenError";

  constructor() {
    super("Exercise name already taken");
  }
}

export class CreateExercise
  implements UseCase<CreateExerciseInput, CreateExerciseOutput>
{
  private context: CreateExerciseContext;

  constructor(context: CreateExerciseContext) {
    this.context = context;
  }

  public async execute({
    name,
    muscles,
  }: CreateExerciseInput): Promise<CreateExerciseOutput> {
    if (!this.context.currentUser) {
      throw new Error("User not logged in");
    }

    if (this.context.currentUser.role.valueOf() !== "Admin") {
      throw new Error("User not authorized");
    }

    if (await this.context.exerciseGateway.checkExerciseNameExists(name)) {
      throw new ExerciseNameAlreadyTakenError();
    }

    return this.context.exerciseGateway.createExercise({
      name,
      muscles,
      createdById: this.context.currentUser.id,
    });
  }
}
