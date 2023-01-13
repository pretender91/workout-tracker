import { Entity } from "../../../libs/entity/entity.js";
import type { Id } from "../../../value-objects/id.js";
import type { Token } from "../../../value-objects/token.js";

type SessionParams = Pick<Session, "id" | "createdAt" | "userId" | "token">;

export class Session extends Entity {
  public userId: Id;
  public token: Token;
  public createdAt: Date;

  constructor(params: SessionParams) {
    super(params.id);

    this.userId = params.userId;
    this.token = params.token;
    this.createdAt = params.createdAt;
  }
}
