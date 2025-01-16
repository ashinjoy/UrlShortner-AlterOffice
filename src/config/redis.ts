import { createClient } from "redis";
import { secrets } from "../constants/secrets";
const redisClient = createClient({
  url: secrets.REDIS_CONNECTION_STRING,
});

function connectRedis() {
  try {
    redisClient.connect();
    redisClient.on("connect", () => {
      console.log("redis cache connected");
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { redisClient, connectRedis };
