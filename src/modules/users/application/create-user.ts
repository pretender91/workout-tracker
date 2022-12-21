import { User } from "../domain/user.js";
import type { UseCase } from "../../../libs/use-case.js";
import { Result } from "../../../libs/result/result.js";
import type { UserGateway } from "../infrastructure/user.gateway.js";
import { ValidationError } from "../../../libs/errors/validation-error.js";

type CreateUserInput = {
  username: string;
  password: string;
};

type CreateUserOutput = Result<User, AggregateError>;

export class CreateUser implements UseCase<CreateUserInput, CreateUserOutput> {
  private readonly userGateway: UserGateway;

  constructor(context: { userGateway: UserGateway }) {
    this.userGateway = context.userGateway;
  }

  public async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    if (await this.userGateway.checkUsernameExists(input.username)) {
      return Result.failure(
        ValidationError.aggregate(
          {
            username: new Error("User with such username already exists."),
          },
          "Can not create user."
        )
      );
    }

    const userResult = User.fromUsernameAndPassword(input);

    if (userResult.isFailure) {
      return userResult;
    }

    return Result.success(await this.userGateway.createUser(userResult.value));
  }
}
