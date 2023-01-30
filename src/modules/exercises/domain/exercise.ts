import { Entity } from "../../../libs/entity/entity.js";

type ExerciseParams = Pick<Exercise, "id" | "createdAt" | "updatedAt" | "name">;

export class Exercise extends Entity {
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(params: ExerciseParams) {
    super(params.id);

    this.name = params.name;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
