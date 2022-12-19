import type { User } from "../domain/user.js";
import { UserFactory } from "../domain/user.js";
import type { UseCase } from "../../../libs/use-case.js";
import type { Result } from "../../../libs/result/result.js";

type CreateUserInput = {
  username: string;
  password: string;
};

type CreateUserOutput = Result<User, AggregateError>;

export class CreateUser implements UseCase<CreateUserInput, CreateUserOutput> {
  public async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    return UserFactory.fromUsernameAndPassword(input);
  }
}
