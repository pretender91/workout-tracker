import { Entity } from "../../../libs/entity/entity.js";

type MuscleParams = Pick<Muscle, "id" | "createdAt" | "updatedAt" | "name">;

export class Muscle extends Entity {
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(params: MuscleParams) {
    super(params.id);

    this.name = params.name;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
