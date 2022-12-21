import { User } from "../domain/user.js";
import prismaClient from "../../../prisma-client.js";

export interface UserGateway {
  createUser(user: User): Promise<User>;

  checkUsernameExists(username: string): Promise<boolean>;
}

export const UserGateway: UserGateway = {
  createUser: async (user) => {
    const { id, username, password } = user;

    const prismaUser = await prismaClient.user.create({
      data: {
        id: id.valueOf(),
        username: username.valueOf(),
        password: password.valueOf(),
      },
    });

    return User.fromGateway(prismaUser).getOrThrow();
  },
  checkUsernameExists: async (username) => {
    const prismaUser = await prismaClient.user.findUnique({
      where: {
        username,
      },
    });

    return !!prismaUser;
  },
};
