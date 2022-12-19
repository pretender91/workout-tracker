import { Entity } from "../../../libs/entity/entity.js";
import type { User } from "../../users/domain/user.js";
import type { Token } from "./token.js";

type SessionParams = Pick<Session, "id" | "createdAt" | "user" | "token">;

export class Session extends Entity {
  public user: User;
  public token: Token;
  public createdAt: Date;

  constructor(params: SessionParams) {
    super(params.id);

    this.user = params.user;
    this.token = params.token;
    this.createdAt = params.createdAt;
  }
}
