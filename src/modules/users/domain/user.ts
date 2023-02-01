import { Entity } from "../../../libs/entity/entity.js";
import type { Password } from "../../../value-objects/password.js";
import type { UserRole } from "../../../value-objects/user-role.js";
import type { Username } from "../../../value-objects/username.js";

type UserParams = Pick<
  User,
  "id" | "username" | "password" | "role" | "createdAt" | "updatedAt"
>;

/**
 * TODO: Add aggregate root, domain events, etc.
 */
export class User extends Entity {
  public username: Username;
  public password: Password;
  public role: UserRole;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(params: UserParams) {
    super(params.id);

    this.username = params.username;
    this.password = params.password;
    this.role = params.role;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
