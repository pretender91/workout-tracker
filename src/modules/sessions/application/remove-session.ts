import { UseCase } from "../../../libs/use-case.js";
import type { User } from "../../users/domain/user.js";
import type { UserGateway } from "../../users/infrastructure/user.gateway.js";
import type { Session } from "../domain/session.js";
import type { SessionGateway } from "../gateway/session.gateway.js";

type RemoveSessionParams = {
  token: Session["token"];
};

type RemoveSessionContext = {
  userGateway: UserGateway;
  sessionGateway: SessionGateway;
  currentUser?: User;
};

type RemoveSessionOutput = Promise<Session["id"] | null>;

export class RemoveSession extends UseCase<
  RemoveSessionParams,
  RemoveSessionContext,
  RemoveSessionOutput
> {
  public async execute(): Promise<RemoveSessionOutput> {
    const { token } = this.params;

    const session = await this.context.sessionGateway.findByToken(token);

    if (session === null) {
      return null;
    }

    if (session.userId.valueOf() !== this.context.currentUser?.id.valueOf()) {
      throw new Error("You can't remove other user's session");
    }

    await this.context.sessionGateway.removeSession(session);
    return session.id;
  }
}
