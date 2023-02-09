import { afterAll, beforeAll, describe } from "@jest/globals";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import configuration from "../config";

describe("test task", () => {
  const testBed = supertest(app);
  let id: string;

  beforeAll(async () => {
    await mongoose.connect(configuration.DB_URL);
  });

  beforeAll(async () => {
    const response = await testBed
      .post("/graphql")
      .send({
        query: `
        mutation createTestUser {
            createUser(user: {
                name: "Create Task User"
                email: "task@test"
                password: "1234"
            }) {
                _id
            }
        }
        `,
      })
      .expect(200);
    id = response.body.data.createUser._id;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
