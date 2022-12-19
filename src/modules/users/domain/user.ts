import { Username, UsernameFactory } from "./value-objects/username.js";
import { Password, PasswordFactory } from "./value-objects/password.js";
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

  constructor(params: UserParams) {
    super(params.id);

    this.username = params.username;
    this.password = params.password;
    this.createdAt = params.createdAt;
  }
}

export const UserFactory = {
  fromUsernameAndPassword(params: {
    username: string;
    password: string;
  }): Result<User, AggregateError> {
    return Result.all({
      username: UsernameFactory.fromString(params.username),
      password: PasswordFactory.fromString(params.password),
    })
      .map(
        ({ username, password }) =>
          new User({
            id: Id.generate(),
            username,
            password,
            createdAt: new Date(),
          })
      )
      .mapFailure((errors) => {
        return new AggregateError(
          Object.entries(errors).map(
            ([key, error]) => new ValidationError([key], error.message)
          ),
          "Can not create user."
        );
      });
  },
};
