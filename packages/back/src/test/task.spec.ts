import { afterAll, beforeAll, describe, expect, it, test } from "@jest/globals";
import { sign } from "jsonwebtoken";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import configuration from "../config";

function postToGraphQl(app: supertest.SuperTest<supertest.Test>) {
  return app.post("/graphql");
}

describe("test task", () => {
  const testBed = supertest(app);
  let id: string;

  beforeAll(async () => {
    await mongoose.connect(configuration.DB_URL);
  });

  beforeAll(async () => {
    const response = await postToGraphQl(testBed)
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

  it("should create a task", async () => {
    const jwtLogin = sign(id, configuration.JWT_SECRET);
    const response = await postToGraphQl(testBed)
      .send({
        query: `
        mutation createTask($deadline: Date!, $description: String!){
            createTask(deadline: $deadline, description: $description){
                _id,
                creationDate,
                isCompleted
            }
        }
        `,
        variables: {
          deadline: new Date("2023 04 05"),
          description: "It's a test task",
        },
      })
      .expect(200);
    const { _id, creationDate, isCompleted } = response.body.data.createTask;

    const creationDateCasted: Date = creationDate;
    const year = creationDateCasted.getFullYear();
    const day = creationDateCasted.getDate();
    const month = creationDateCasted.getMonth();

    expect(_id).toBeTruthy();
    expect(isCompleted).toBeFalsy();
    expect(year).toBe(new Date().getFullYear());
    expect(day).toBe(new Date().getDate());
    expect(month).toBe(new Date().getMonth());
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
