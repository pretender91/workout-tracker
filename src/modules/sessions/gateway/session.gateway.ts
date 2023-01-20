import type { PaginationParams } from "../../../libs/pagination.js";
import {
  BackwardPaginationParams,
  Connection,
  Edge,
  ForwardPaginationParams,
  PageInfo,
} from "../../../libs/pagination.js";
import prismaClient from "../../../prisma-client.js";
import { redisClient } from "../../../redis-client.js";
import { Id } from "../../../value-objects/id.js";
import { Token } from "../../../value-objects/token.js";
import type { User } from "../../users/domain/user.js";
import type { Session } from "../domain/session.js";
import type { SessionDTO } from "./session.dto.js";
import type { SessionMapper } from "./session.mapper.js";

export interface SessionGateway {
  createSession(params: { user: User }): Promise<Session>;

  findByToken(token: Token): Promise<Session | null>;

  findUserSessions(
    user: User,
    pagination: PaginationParams
  ): Promise<Connection<Session>>;

  removeSession(session: Session): Promise<void>;
}

export class PrismaSessionGateway implements SessionGateway {
  private sessionMapper: SessionMapper;

  constructor(params: { sessionMapper: SessionMapper }) {
    this.sessionMapper = params.sessionMapper;
  }

  public getSessionKey(session: { token: Token }): string {
    return `session:${session.token.valueOf()}`;
  }

  public async findByToken(token: Token): Promise<Session | null> {
    const sessionFromCache = await this.getFromCache({ token });

    if (sessionFromCache) {
      return sessionFromCache;
    }

    const sessionDTO = await prismaClient.session.findUnique({
      where: {
        token: token.valueOf(),
      },
    });

    if (!sessionDTO) {
      return null;
    }

    const session = this.sessionMapper.toDomain(sessionDTO);

    await this.storeInCache(session);

    return session;
  }

  private async storeInCache(session: Session): Promise<void> {
    await redisClient.set(
      this.getSessionKey(session),
      JSON.stringify(this.sessionMapper.toDTO(session))
    );
  }

  private async removeFromCache(session: Session): Promise<void> {
    const sessionFromCache = await redisClient.get(this.getSessionKey(session));

    if (!sessionFromCache) {
      return;
    }

    await redisClient.del(this.getSessionKey(session));
  }

  public async removeSession(session: Session): Promise<void> {
    const sessionFromPrisma = await prismaClient.session.findFirst({
      where: {
        token: session.token.valueOf(),
      },
    });

    if (sessionFromPrisma === null) {
      return;
    }
    const prismaSessionFromDTO = this.sessionMapper.toDomain(sessionFromPrisma);

    await prismaClient.session.delete({
      where: {
        token: sessionFromPrisma.token.valueOf(),
      },
    });
    await this.removeFromCache(prismaSessionFromDTO);
  }

  private async getFromCache(params: {
    token: Token;
  }): Promise<Session | null> {
    const sessionFromCache = await redisClient.get(this.getSessionKey(params));

    if (!sessionFromCache) {
      return null;
    }
    return this.sessionMapper.toDomain(JSON.parse(sessionFromCache));
  }

  public async createSession(params: { user: User }): Promise<Session> {
    const sessionDTO = await prismaClient.session.create({
      data: {
        id: Id.generate().valueOf(),
        userId: params.user.id.valueOf(),
        token: Token.generate().valueOf(),
      },
    });

    const session = this.sessionMapper.toDomain(sessionDTO);

    await this.storeInCache(session);

    return session;
  }

  public async findUserSessions(
    user: { id: Id },
    pagination: PaginationParams
  ): Promise<Connection<Session>> {
    let sessionsDTO: SessionDTO[] = [];
    let take = 0;
    let hasNextPage = false;
    let hasPreviousPage = false;

    let totalCount = await prismaClient.session.count({
      where: {
        userId: user.id.valueOf(),
      },
    });

    if (pagination instanceof ForwardPaginationParams) {
      take = pagination.first.valueOf() + 1;
      sessionsDTO = await prismaClient.session.findMany({
        where: {
          userId: user.id.valueOf(),
        },
        take: take,
        skip: pagination.after ? 1 : 0,
        cursor: pagination.after
          ? {
              id: pagination.after.valueOf(),
            }
          : undefined,
        orderBy: {
          createdAt: "asc",
        },
      });

      hasNextPage = sessionsDTO.length > pagination.first.valueOf();
    }

    if (pagination instanceof BackwardPaginationParams) {
      take = pagination.last.valueOf() + 1;

      sessionsDTO = await prismaClient.session.findMany({
        where: {
          userId: user.id.valueOf(),
        },
        take: take,
        skip: pagination.before ? 1 : 0,
        cursor: pagination.before
          ? {
              id: pagination.before.valueOf(),
            }
          : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });

      hasPreviousPage = sessionsDTO.length > pagination.last.valueOf();
    }

    const sessions = this.sessionMapper.toDomainArray(
      sessionsDTO.slice(0, take - 1)
    );

    return new Connection<Session>({
      edges: sessions.map(
        (session) => new Edge<Session>({ node: session, cursor: session.id })
      ),
      totalCount,
      pageInfo: new PageInfo({
        hasNextPage,
        hasPreviousPage,
        endCursor: sessions.at(-1)?.id,
        startCursor: sessions.at(0)?.id,
      }),
    });
  }
}
