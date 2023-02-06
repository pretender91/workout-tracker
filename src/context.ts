import type { ExerciseGateway } from "./modules/exercises/infrastructure/exercise.gateway.js";
import { PrismaExerciseGateway } from "./modules/exercises/infrastructure/exercise.gateway.js";
import { ExerciseMapper } from "./modules/exercises/infrastructure/exercise.mapper.js";
import type { Session } from "./modules/sessions/domain/session.js";
import type { SessionGateway } from "./modules/sessions/gateway/session.gateway.js";
import { PrismaSessionGateway } from "./modules/sessions/gateway/session.gateway.js";
import { SessionMapper } from "./modules/sessions/gateway/session.mapper.js";
import type { User } from "./modules/users/domain/user.js";
import type { UserGateway } from "./modules/users/infrastructure/user.gateway.js";
import { PrismaUserGateway } from "./modules/users/infrastructure/user.gateway.js";
import { UserMapper } from "./modules/users/infrastructure/user.mapper.js";
import type { WorkoutGateway } from "./modules/workouts/gateway/workout.gateway.js";
import { PrismaWorkoutGateway } from "./modules/workouts/gateway/workout.gateway.js";
import { WorkoutMapper } from "./modules/workouts/gateway/workout.mapper.js";
import PrismaClient from "./prisma-client.js";
import type { Token } from "./value-objects/token.js";

export class Context {
  public readonly userGateway: UserGateway;
  public readonly userMapper: UserMapper;
  public readonly exerciseGateway: ExerciseGateway;
  public readonly exerciseMapper: ExerciseMapper;
  public readonly sessionGateway: SessionGateway;
  public readonly sessionMapper: SessionMapper;
  public readonly workoutMapper: WorkoutMapper;
  public readonly workoutGateway: WorkoutGateway;
  public readonly prisma: typeof PrismaClient;
  public currentUser?: User;
  public currentSession?: Session;

  constructor() {
    this.prisma = PrismaClient;
    this.sessionMapper = new SessionMapper();
    this.userMapper = new UserMapper();
    this.exerciseMapper = new ExerciseMapper();
    this.workoutMapper = new WorkoutMapper();

    this.userGateway = new PrismaUserGateway(this);
    this.sessionGateway = new PrismaSessionGateway(this);
    this.exerciseGateway = new PrismaExerciseGateway(this);
    this.workoutGateway = new PrismaWorkoutGateway(this);
  }

  public async loadCurrents(token?: Token): Promise<void> {
    if (!token) {
      return;
    }

    const session = await this.sessionGateway.findByToken(token);

    if (!session) {
      return;
    }

    this.currentSession = session;
    this.currentUser =
      (await this.userGateway.findById(session.userId)) ?? undefined;
  }
}
