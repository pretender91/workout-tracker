import { UseCase } from "../../../libs/use-case.js";
import type { Id } from "../../../value-objects/id.js";
import type { User } from "../domain/user.js";
import type { UserGateway } from "../infrastructure/user.gateway.js";

type FindUserByIdParams = {
  id: Id;
};

type FindUserByIdContext = {
  userGateway: UserGateway;
};

type FindUserByIdOutput = User;

export class FindUserById extends UseCase<
  FindUserByIdParams,
  FindUserByIdContext,
  FindUserByIdOutput
> {
  public async execute(): Promise<FindUserByIdOutput> {
    const { id } = this.params;
    const { userGateway } = this.context;

    const user = await userGateway.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
