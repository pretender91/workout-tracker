import { Mapper } from "../../../libs/mapper/mapper.js";
import { Id } from "../../../value-objects/id.js";
import { Token } from "../../../value-objects/token.js";
import { Session } from "../domain/session.js";
import type { SessionDTO } from "./session.dto.js";

export class SessionMapper extends Mapper<Session, SessionDTO> {
  public toDTO(domain: Session): SessionDTO {
    return {
      id: domain.id.valueOf(),
      token: domain.token.valueOf(),
      userId: domain.userId.valueOf(),
      createdAt: domain.createdAt,
    };
  }

  public toDomain(dto: SessionDTO): Session {
    return new Session({
      id: Id.fromString(dto.id),
      token: Token.fromString(dto.token),
      userId: Id.fromString(dto.userId),
      createdAt: new Date(dto.createdAt),
    });
  }
}
