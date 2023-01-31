import { Mapper } from "../../../libs/mapper/mapper.js";
import { Id } from "../../../value-objects/id.js";
import { Exercise, Muscle } from "../domain/exercise.js";
import type { ExerciseDTO } from "./exercise.dto.js";

export class ExerciseMapper extends Mapper<Exercise, ExerciseDTO> {
  public toDTO(domain: Exercise): ExerciseDTO {
    return {
      id: domain.id.valueOf(),
      name: domain.name,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      muscles: domain.muscles,
    };
  }

  public toDomain(dto: ExerciseDTO): Exercise {
    return new Exercise({
      id: Id.fromString(dto.id),
      name: dto.name,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      muscles: dto.muscles as Muscle[],
    });
  }
}
