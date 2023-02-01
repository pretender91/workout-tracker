import type { Connection, PaginationParams } from "../../../libs/pagination.js";
import type { UseCase } from "../../../libs/use-case.js";
import type { User } from "../../users/domain/user.js";
import type { Session } from "../domain/session.js";
import type { SessionGateway } from "../gateway/session.gateway.js";

type Params = {
  user: User;
  pagination: PaginationParams;
};

type Context = {
  sessionGateway: SessionGateway;
};

type Output = Connection<Session>;

export class FindUserSessions implements UseCase<Params, Output> {
  private context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  public async execute(params: Params): Promise<Output> {
    return this.context.sessionGateway.findUserSessions(
      params.user,
      params.pagination
    );
  }
}
