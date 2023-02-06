import { config } from "dotenv";

const args = process.argv;

const environmentFlagPosition = args.findIndex((arg) => arg === "--env");
const ENVIRONMENT_VALUE_POSITION = environmentFlagPosition + 1;

const environment =
  environmentFlagPosition !== -1 ? args[ENVIRONMENT_VALUE_POSITION] : "dev";

const envConfigPath = {
  prod: ".env",
  test: ".env.test",
  dev: ".env.dev",
} as const;

type KeyOfEnvConfig = keyof typeof envConfigPath;

const path = envConfigPath[environment as KeyOfEnvConfig];

config({ path });

const configuration = {
  COOKIE_NAME: process.env.COOKIE_NAME || "jwt-login",
  JWT_SECRET: process.env.JWT_SECRET || "MERN",
  DB_URL: "mongodb://" + (process.env.DB_URL || "localhost:27017/todo"),
};

export default configuration;
