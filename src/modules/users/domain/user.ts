import { Username } from "./value-objects/username.js";
import { Password } from "./value-objects/password.js";
import { Entity } from "../../../libs/entity/entity.js";
import { Result } from "../../../libs/result/result.js";
import { Id } from "../../../libs/value-object/id.js";
import { ValidationError } from "../../../libs/errors/validation-error.js";

type UserParams = Pick<User, "id" | "username" | "password" | "createdAt">;

/**
 * TODO: Add aggregate root, domain events, etc.
 */
export class User extends Entity {
  public username: Username;
  public password: Password;
  public createdAt: Date;

  private constructor(params: UserParams) {
    super(params.id);

    this.username = params.username;
    this.password = params.password;
    this.createdAt = params.createdAt;
  }

  public static fromUsernameAndPassword(params: {
    username: string;
    password: string;
  }): Result<User, AggregateError> {
    return Result.all({
      id: Id.generate(),
      username: Username.fromString(params.username),
      password: Password.fromString(params.password),
    })
      .map(
        ({ id, username, password }) =>
          new User({
            id,
            username,
            password,
            createdAt: new Date(),
          })
      )
      .mapFailure((errors) => {
        return ValidationError.aggregate(errors, "Can not create user.");
      });
  }

  public static fromGateway(params: {
    id: string;
    username: string;
    password: string;
    createdAt: Date;
  }): Result<User, AggregateError> {
    return Result.all({
      id: Id.fromString(params.id),
      username: Username.fromString(params.username),
      password: Password.fromString(params.password),
    })
      .map(
        ({ id, username, password }) =>
          new User({
            id,
            username,
            password,
            createdAt: params.createdAt,
          })
      )
      .mapFailure((errors) => {
        return ValidationError.aggregate(
          errors,
          "Can not fill user from gateway."
        );
      });
  }
}
