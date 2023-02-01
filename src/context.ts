import type { ExerciseGateway } from "./modules/exercises/infrastructure/exercise.gateway.js";
import { PrismaExerciseGateway } from "./modules/exercises/infrastructure/exercise.gateway.js";
import { ExerciseMapper } from "./modules/exercises/infrastructure/exercise.mapper.js";
import type { SessionGateway } from "./modules/sessions/gateway/session.gateway.js";
import { PrismaSessionGateway } from "./modules/sessions/gateway/session.gateway.js";
import { SessionMapper } from "./modules/sessions/gateway/session.mapper.js";
import type { UserGateway } from "./modules/users/infrastructure/user.gateway.js";
import { PrismaUserGateway } from "./modules/users/infrastructure/user.gateway.js";
import { UserMapper } from "./modules/users/infrastructure/user.mapper.js";

export class Context {
  public readonly userGateway: UserGateway;
  public readonly userMapper: UserMapper;
  public readonly exerciseGateway: ExerciseGateway;
  public readonly exerciseMapper: ExerciseMapper;
  public readonly sessionGateway: SessionGateway;
  public readonly sessionMapper: SessionMapper;

  constructor() {
    this.sessionMapper = new SessionMapper();
    this.userMapper = new UserMapper();
    this.exerciseMapper = new ExerciseMapper();

    this.userGateway = new PrismaUserGateway({ userMapper: this.userMapper });
    this.sessionGateway = new PrismaSessionGateway({
      sessionMapper: this.sessionMapper,
    });
    this.exerciseGateway = new PrismaExerciseGateway({
      exerciseMapper: this.exerciseMapper,
    });
  }

  public copy() {
    return {
      userGateway: this.userGateway,
      userMapper: this.userMapper,
      sessionGateway: this.sessionGateway,
      sessionMapper: this.sessionMapper,
      exerciseGateway: this.exerciseGateway,
    };
  }
}
