import * as process from "process";
import { createClient } from "redis";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_URL: string;
    }
  }
}

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

await redisClient.connect();

export { redisClient };
