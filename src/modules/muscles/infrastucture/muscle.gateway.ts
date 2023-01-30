import prismaClient from "../../../prisma-client.js";
import { Id } from "../../../value-objects/id.js";
import type { Muscle } from "../domain/muscle.js";
import type { MuscleMapper } from "./muscle.mapper.js";

export interface MuscleGateway {
  createMuscle(params: Pick<Muscle, "name">): Promise<Muscle>;
  removeMuscle(params: Pick<Muscle, "id">): Promise<Id | null>;
  updateMuscle(params: Pick<Muscle, "id"> & Partial<Muscle>): Promise<Muscle>;
  findById(params: Pick<Muscle, "id">): Promise<Muscle | null>;
}

export class PrismaMuscleGateway implements MuscleGateway {
  private muscleMapper: MuscleMapper;

  constructor(params: { muscleMapper: MuscleMapper }) {
    this.muscleMapper = params.muscleMapper;
  }

  async createMuscle(params: Pick<Muscle, "name">): Promise<Muscle> {
    const muscleDTO = await prismaClient.muscle.create({
      data: {
        id: Id.generate().valueOf(),
        name: params.name,
      },
    });

    const muscle = this.muscleMapper.toDomain(muscleDTO);
    return muscle;
  }

  async removeMuscle(params: Pick<Muscle, "id">): Promise<Id | null> {
    await prismaClient.muscle.delete({
      where: {
        id: params.id.valueOf(),
      },
    });

    return params.id;
  }

  async updateMuscle(
    params: Pick<Muscle, "id"> & Partial<Muscle>
  ): Promise<Muscle> {
    const { id, ...dataToUpdate } = params;
    const muscleDTO = await prismaClient.muscle.update({
      where: {
        id: id.valueOf(),
      },
      data: dataToUpdate,
    });

    const muscle = this.muscleMapper.toDomain(muscleDTO);

    return muscle;
  }

  async findById(params: Pick<Muscle, "id">): Promise<Muscle | null> {
    const muscleDTO = await prismaClient.muscle.findUnique({
      where: {
        id: params.id.valueOf(),
      },
    });

    if (!muscleDTO) {
      return null;
    }

    const muscle = this.muscleMapper.toDomain(muscleDTO);

    return muscle;
  }
}
