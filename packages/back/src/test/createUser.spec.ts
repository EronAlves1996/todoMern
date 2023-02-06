import {
  beforeAll,
  describe,
  test,
  expect,
  jest,
  afterAll,
} from "@jest/globals";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import configuration from "../config";

describe("create user", () => {
  beforeAll(async () => {
    await mongoose.connect(configuration.DB_URL);
    console.log("connected to database at 27016");
  });

  test("Create a user under valid schema", async () => {
    await supertest(app)
      .post("/graphql")
      .send({
        query: `
    mutation createUserTest($user: UserInput){
        createUser(user: $user){
            _id,
            name,
            email
        }
    }
    `,
        variables: {
          user: {
            name: "Test user",
            email: "test@test",
            password: "1234",
          },
        },
      })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((response) => {
        const { _id, name, email } = response.body.data.createUser;
        expect(_id).toBeTruthy();
        expect(name).toBe("Test user");
        expect(email).toBe("test@test");
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
