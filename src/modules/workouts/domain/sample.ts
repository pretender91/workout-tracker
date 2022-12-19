import { Entity } from "../../../libs/entity/entity.js";

type SampleParams = Pick<Sample, "id">;

export class Sample extends Entity {
  constructor(params: SampleParams) {
    super(params.id);
  }
}
