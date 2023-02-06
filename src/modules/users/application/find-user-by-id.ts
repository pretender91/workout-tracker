import type { Context } from "../../../context.js";
import { NotFoundError } from "../../../libs/generic-errors.js";
import type { UseCase } from "../../../libs/use-case.js";
import type { User } from "../domain/user.js";

type FindUserByIdInput = Pick<User, "id">;
type FindUserByIdOutput = User;
type FindUserByIdContext = Pick<Context, "userGateway">;

export class FindUserById
  implements UseCase<FindUserByIdInput, FindUserByIdOutput>
{
  constructor(private readonly context: FindUserByIdContext) {}

  public async execute(params: FindUserByIdInput): Promise<FindUserByIdOutput> {
    const { userGateway } = this.context;

    const user = await userGateway.findById(params.id);

    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }
}
