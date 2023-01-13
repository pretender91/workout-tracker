import type { Connection, PaginationParams } from "../../../libs/pagination.js";
import { UseCase } from "../../../libs/use-case.js";
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

export class FindUserSessions extends UseCase<Params, Context, Output> {
  public async execute(): Promise<Output> {
    const { params, context } = this;

    return context.sessionGateway.findUserSessions(
      params.user,
      params.pagination
    );
  }
}
