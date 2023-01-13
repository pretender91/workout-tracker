import type { Mapper } from "../../../libs/mapper/mapper.js";
import prismaClient from "../../../prisma-client.js";
import { redisClient } from "../../../redis-client.js";
import { Id } from "../../../value-objects/id.js";
import type { Password } from "../../../value-objects/password.js";
import type { Username } from "../../../value-objects/username.js";
import type { User } from "../domain/user.js";
import type { UserDTO } from "./user.dto.js";

export interface UserGateway {
  createUser(user: { username: Username; password: Password }): Promise<User>;

  checkUsernameExists(username: Username): Promise<boolean>;

  findById(id: Id): Promise<User | null>;

  findByUsernameAndPassword(params: {
    username: Username;
    password: Password;
  }): Promise<User | null>;
}

export class PrismaUserGateway implements UserGateway {
  private userMapper: Mapper<User, UserDTO>;

  constructor(params: { userMapper: Mapper<User, UserDTO> }) {
    this.userMapper = params.userMapper;
  }

  private getUserKey(user: { id: Id }) {
    return `user:${user.id.valueOf()}`;
  }

  private async storeInCache(user: User): Promise<void> {
    await redisClient.set(
      this.getUserKey(user),
      JSON.stringify(this.userMapper.toDTO(user))
    );
  }

  private async getFromCache(id: Id): Promise<User | null> {
    const cachedUser = await redisClient.get(this.getUserKey({ id }));

    if (!cachedUser) {
      return null;
    }

    return this.userMapper.toDomain(JSON.parse(cachedUser));
  }

  public async checkUsernameExists(username: Username): Promise<boolean> {
    const prismaUser = await prismaClient.user.findUnique({
      where: {
        username: username.valueOf(),
      },
    });

    return !!prismaUser;
  }

  public async createUser(credentials: {
    username: Username;
    password: Password;
  }): Promise<User> {
    const createdUser = await prismaClient.user.create({
      data: {
        id: Id.generate().valueOf(),
        username: credentials.username.valueOf(),
        password: credentials.password.valueOf(),
      },
    });

    const user = this.userMapper.toDomain(createdUser);

    await this.storeInCache(user);

    return user;
  }

  public async findById(id: Id): Promise<User | null> {
    const userFromCache = await this.getFromCache(id);

    if (userFromCache) {
      return userFromCache;
    }

    const userDTO = await prismaClient.user.findUnique({
      where: {
        id: id.valueOf(),
      },
    });

    if (!userDTO) {
      return null;
    }

    const user = this.userMapper.toDomain(userDTO);

    await this.storeInCache(user);

    return user;
  }

  public async findByUsernameAndPassword(params: {
    username: Username;
    password: Password;
  }): Promise<User | null> {
    const foundedUser = await prismaClient.user.findFirst({
      where: {
        username: params.username.valueOf(),
        password: params.password.valueOf(),
      },
    });

    return foundedUser ? this.userMapper.toDomain(foundedUser) : null;
  }
}
