import { config } from "dotenv";

config();

const configuration = {
  COOKIE_NAME: process.env.COOKIE_NAME || "jwt-login",
  JWT_SECRET: process.env.JWT_SECRET || "MERN",
};

export default configuration;
