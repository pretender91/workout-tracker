import { Mapper } from "../../../libs/mapper/mapper.js";
import { Id } from "../../../value-objects/id.js";
import { Workout } from "../domain/workout.js";
import type { WorkoutDTO } from "./wokrout.dto.js";

export class WorkoutMapper extends Mapper<Workout, WorkoutDTO> {
  public toDTO(domain: Workout): WorkoutDTO {
    return {
      id: domain.id.valueOf(),
      date: domain.date,
      userId: domain.userId.valueOf(),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public toDomain(dto: WorkoutDTO): Workout {
    return new Workout({
      id: Id.fromString(dto.id),
      date: new Date(dto.date),
      userId: Id.fromString(dto.userId),
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    });
  }
}
