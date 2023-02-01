import { Mapper } from "../../../libs/mapper/mapper.js";
import { ExerciseName } from "../../../value-objects/exercise-name.js";
import { Id } from "../../../value-objects/id.js";
import { MuscleName } from "../../../value-objects/muscle-name.js";
import { Exercise } from "../domain/exercise.js";
import type { ExerciseDTO } from "./exercise.dto.js";

export class ExerciseMapper extends Mapper<Exercise, ExerciseDTO> {
  public toDTO(domain: Exercise): ExerciseDTO {
    return {
      id: domain.id.valueOf(),
      name: domain.name.valueOf(),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      muscles: domain.muscles.map((item) => item.valueOf()),
    };
  }

  public toDomain(dto: ExerciseDTO): Exercise {
    return new Exercise({
      id: Id.fromString(dto.id),
      name: ExerciseName.fromString(dto.name),
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      muscles: dto.muscles.map((muscle) => MuscleName.fromString(muscle)),
    });
  }
}
