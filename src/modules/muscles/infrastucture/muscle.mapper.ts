import { Mapper } from "../../../libs/mapper/mapper.js";
import { Id } from "../../../value-objects/id.js";
import { Muscle } from "../domain/muscle.js";
import type { MuscleDTO } from "./muscle.dto.js";

export class MuscleMapper extends Mapper<Muscle, MuscleDTO> {
  public toDTO(domain: Muscle): MuscleDTO {
    return {
      id: domain.id.valueOf(),
      name: domain.name,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public toDomain(dto: MuscleDTO): Muscle {
    return new Muscle({
      id: Id.fromString(dto.id),
      name: dto.name,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    });
  }
}
