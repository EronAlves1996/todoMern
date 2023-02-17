import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { sign } from "jsonwebtoken";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import configuration from "../config";

function registerTestUser(testBed: supertest.SuperTest<supertest.Test>) {
  return testBed.post("/graphql").send({
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
  });
}

function makeLoginAsTestUser(testBed: supertest.SuperTest<supertest.Test>) {
  const credentials = "test@test:1234";
  const base64Credentials = Buffer.from(credentials);
  return testBed
    .post("/login")
    .set(
      "authorization",
      "Basic ".concat(base64Credentials.toString("base64"))
    );
}

function postToGraphQl(app: supertest.SuperTest<supertest.Test>) {
  return app.post("/graphql");
}

describe("overall integration test", () => {
  const testBed = supertest(app);
  beforeAll(async () => {
    await mongoose.connect(configuration.DB_URL);
    console.log("connected to database at " + configuration.DB_URL);
  });

  describe("user features", () => {
    test("Create a user under valid schema", async () => {
      await registerTestUser(testBed)
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then((response) => {
          const { _id, name, email } = response.body.data.createUser;
          expect(_id).toBeTruthy();
          expect(name).toBe("Test user");
          expect(email).toBe("test@test");
        });
    });

    test("Make a login as a user that gonna be registered", async () => {
      await registerTestUser(testBed);
      await makeLoginAsTestUser(testBed)
        .expect(200)
        .then((response) => {
          expect(response.headers["set-cookie"]).toBeTruthy();
          const [cookie]: string[] = response.headers["set-cookie"];

          expect(cookie.startsWith(configuration.COOKIE_NAME)).toBeTruthy();
        });
    });

    test("Verify if a cookie will be correctly detected", async () => {
      await registerTestUser(testBed);
      const response = await makeLoginAsTestUser(testBed);
      const [cookie]: string[] = response.headers["set-cookie"];
      const jwtToken = cookie.split(";")[0];

      await testBed
        .get("/verify")
        .set("cookie", jwtToken)
        .expect(200)
        .then((response) => {
          const { _id, name, email } = response.body;
          expect(_id).toBeTruthy();
          expect(name).toBe("Test user");
          expect(email).toBe("test@test");
        });
    });
  });

  describe("task features", () => {
    let id: string;
    let jwtLogin: string;

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

    test("should create a task", async () => {
      const jwtLogin = sign(id, configuration.JWT_SECRET);
      const response = await postToGraphQl(testBed)
        .set("Cookie", `${configuration.COOKIE_NAME}=${jwtLogin}`)
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

      const creationDateCasted = new Date(creationDate);
      const year = creationDateCasted.getFullYear();
      const day = creationDateCasted.getDate();
      const month = creationDateCasted.getMonth();

      expect(_id).toBeTruthy();
      expect(isCompleted).toBeFalsy();
      expect(year).toBe(new Date().getFullYear());
      expect(day).toBe(new Date().getDate());
      expect(month).toBe(new Date().getMonth());
    });

    test("should read the created task", async () => {
      const jwtLogin = sign(id, configuration.JWT_SECRET);
      const response = await postToGraphQl(testBed)
        .send({
          query: `
        query LoadTaskQuery($id: String!){
          loadTasks(userId: $id){
            _id
            description,
            creationDate,
            deadline,
            isCompleted
          }
        }
        `,
          variables: {
            id,
          },
        })
        .set("Cookie", configuration.COOKIE_NAME.concat("=", jwtLogin));
      const { loadTasks } = response.body.data;

      expect(loadTasks.length).toBe(1);
      expect(loadTasks[0].isCompleted).toBeFalsy();
      expect(loadTasks[0]._id).toBeTruthy();
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
