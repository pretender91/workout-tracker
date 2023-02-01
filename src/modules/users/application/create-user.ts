import type { UseCase } from "../../../libs/use-case.js";
import type { Password } from "../../../value-objects/password.js";
import type { Username } from "../../../value-objects/username.js";
import type { User } from "../domain/user.js";
import type { UserGateway } from "../infrastructure/user.gateway.js";

type CreateUserParams = {
  username: Username;
  password: Password;
};

type CreateUserOutput = User;

type CreateUserContext = {
  userGateway: UserGateway;
};

export class UsernameAlreadyTakenError extends Error {
  public override readonly name = "UsernameAlreadyTakenError";

  constructor() {
    super("Username already taken");
  }
}

export class CreateUser implements UseCase<CreateUserParams, CreateUserOutput> {
  private context: CreateUserContext;

  constructor(context: CreateUserContext) {
    this.context = context;
  }

  public async execute(params: CreateUserParams): Promise<CreateUserOutput> {
    if (await this.context.userGateway.checkUsernameExists(params.username)) {
      throw new UsernameAlreadyTakenError();
    }

    return this.context.userGateway.createUser(params);
  }
}
