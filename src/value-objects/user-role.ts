import { ValidatorError } from "../libs/validator/validator-error.js";
import { ValueObject } from "../libs/value-object/value-object.js";

enum Role {
  Admin = "Admin",
  User = "User",
}

const RoleValues = new Set<string>([Role.Admin, Role.User]);

function isUserRole(value: unknown): value is Role {
  return typeof value === "string" && RoleValues.has(value);
}

export class UserRole extends ValueObject<Role> {
  private constructor(value: Role) {
    super(value);
  }

  public get isAdmin() {
    return this.valueOf() === Role.Admin;
  }

  public get isUser() {
    return this.valueOf() === Role.User;
  }

  public static fromString(value: string) {
    if (!isUserRole(value)) {
      throw ValidatorError.TypeMismatch(
        "UserRole",
        `"${value}" is not a "UserRole"`
      );
    }

    return new UserRole(value);
  }
}
