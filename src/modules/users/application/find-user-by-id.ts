import type { UseCase } from "../../../libs/use-case.js";
import type { Id } from "../../../value-objects/id.js";
import type { User } from "../domain/user.js";
import type { UserGateway } from "../infrastructure/user.gateway.js";

type FindUserByIdParams = {
  id: Id;
};

type FindUserByIdContext = {
  userGateway: UserGateway;
};

type FindUserByIdOutput = User | null;

export class FindUserById
  implements UseCase<FindUserByIdParams, FindUserByIdOutput>
{
  private context: FindUserByIdContext;

  constructor(context: FindUserByIdContext) {
    this.context = context;
  }

  public async execute(
    params: FindUserByIdParams
  ): Promise<FindUserByIdOutput> {
    const { userGateway } = this.context;

    return userGateway.findById(params.id);
  }
}
