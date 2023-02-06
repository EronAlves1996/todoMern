import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
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

describe("user features", () => {
  const testBed = supertest(app);

  beforeAll(async () => {
    await mongoose.connect(configuration.DB_URL);
    console.log("connected to database at 27016");
  });

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

        expect(cookie.startsWith("jwt-login-test")).toBeTruthy();
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

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
