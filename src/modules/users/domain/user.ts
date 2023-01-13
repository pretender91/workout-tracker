import { Entity } from "../../../libs/entity/entity.js";
import type { Password } from "../../../value-objects/password.js";
import type { Username } from "../../../value-objects/username.js";

type UserParams = Pick<
  User,
  "id" | "username" | "password" | "createdAt" | "updatedAt"
>;

/**
 * TODO: Add aggregate root, domain events, etc.
 */
export class User extends Entity {
  public username: Username;
  public password: Password;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(params: UserParams) {
    super(params.id);

    this.username = params.username;
    this.password = params.password;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
