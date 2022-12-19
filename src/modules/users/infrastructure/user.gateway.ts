import type { User } from "../domain/user.js";

export interface UserGateway {
  createUser(user: User): Promise<User>;
}
