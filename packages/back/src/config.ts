import { config } from "dotenv";

const args = process.argv;
const environmentTestDefiner = args.findIndex((arg) => arg.includes("jest"));

const environment = environmentTestDefiner !== -1 ? "test" : "dev";

const envConfigPath = {
  test: ".env.test",
  dev: ".env.dev",
};

type KeyOfEnvConfig = keyof typeof envConfigPath;

const path = envConfigPath[environment as KeyOfEnvConfig];

config({ path });

const configuration = {
  COOKIE_NAME: process.env.COOKIE_NAME || "jwt-login",
  JWT_SECRET: process.env.JWT_SECRET || "MERN",
  DB_URL: "mongodb://" + (process.env.DB_URL || "localhost:27017/todo"),
};

export default configuration;
