import { UseCase } from "../../../libs/use-case.js";
import type { Exercise } from "../domain/exercise.js";
import type { ExerciseGateway } from "../infrastructure/exercise.gateway.js";

type CreateExerciseParams = Pick<Exercise, "name" | "muscles">;

type CreateExeciseContext = {
  exerciseGateway: ExerciseGateway;
};

type CreateExerciseOutput = Exercise;

export class ExerciseNameAlreadyTakenError extends Error {
  public override readonly name = "ExerciseNameAlreadyTakenError";

  constructor() {
    super("Exercise name already taken");
  }
}

export class CreateExercise extends UseCase<
  CreateExerciseParams,
  CreateExeciseContext,
  CreateExerciseOutput
> {
  public async execute(): Promise<CreateExerciseOutput> {
    const { name, muscles } = this.params;

    if (await this.context.exerciseGateway.checkExerciseNameExists(name)) {
      throw new ExerciseNameAlreadyTakenError();
    }

    return this.context.exerciseGateway.createExercise({ name, muscles });
  }
}
