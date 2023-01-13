import { Mapper } from "../../../libs/mapper/mapper.js";
import { Id } from "../../../value-objects/id.js";
import { Password } from "../../../value-objects/password.js";
import { Username } from "../../../value-objects/username.js";
import { User } from "../domain/user.js";
import type { UserDTO } from "./user.dto.js";

export class UserMapper extends Mapper<User, UserDTO> {
  public toDomain(dto: UserDTO): User {
    return new User({
      id: Id.fromString(dto.id),
      username: Username.fromString(dto.username),
      password: Password.fromHash(dto.password),
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    });
  }

  public toDTO(domain: User): UserDTO {
    return {
      id: domain.id.valueOf(),
      username: domain.username.valueOf(),
      password: domain.password.valueOf(),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
