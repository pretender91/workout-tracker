import { UseCase } from "../../../libs/use-case.js";
import type { Password } from "../../../value-objects/password.js";
import type { Username } from "../../../value-objects/username.js";
import type { UserGateway } from "../../users/infrastructure/user.gateway.js";
import type { Session } from "../domain/session.js";
import type { SessionGateway } from "../gateway/session.gateway.js";

type CreateSessionParams = {
  username: Username;
  password: Password;
};

type CreateSessionContext = {
  userGateway: UserGateway;
  sessionGateway: SessionGateway;
};

type CreateSessionOutput = Session;

export class WrongCredentialsError extends Error {
  public override readonly name = "WrongCredentialsError";

  constructor() {
    super("Wrong credentials");
  }
}

export class CreateSession extends UseCase<
  CreateSessionParams,
  CreateSessionContext,
  CreateSessionOutput
> {
  public async execute(): Promise<CreateSessionOutput> {
    const { username, password } = this.params;

    const user = await this.context.userGateway.findByUsernameAndPassword({
      username,
      password,
    });

    if (!user) {
      throw new WrongCredentialsError();
    }

    return this.context.sessionGateway.createSession({ user });
  }
}
