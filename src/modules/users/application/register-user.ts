import { UseCase } from "../../../libs/use-case.js";
import type { Password } from "../../../value-objects/password.js";
import type { Username } from "../../../value-objects/username.js";
import type { Session } from "../../sessions/domain/session.js";
import type { SessionGateway } from "../../sessions/gateway/session.gateway.js";
import type { User } from "../domain/user.js";
import type { UserGateway } from "../infrastructure/user.gateway.js";

type RegisterUserParams = {
  username: Username;
  password: Password;
};

type RegisterUserContext = {
  userGateway: UserGateway;
  sessionGateway: SessionGateway;
};

type RegisterUserOutput = {
  user: User;
  session: Session;
};

export class RegisterUser extends UseCase<
  RegisterUserParams,
  RegisterUserContext,
  RegisterUserOutput
> {
  public async execute(): Promise<RegisterUserOutput> {
    const { username, password } = this.params;
    const { userGateway, sessionGateway } = this.context;

    const user = await userGateway.createUser({ username, password });
    const session = await sessionGateway.createSession({ user });

    return { user, session };
  }
}
