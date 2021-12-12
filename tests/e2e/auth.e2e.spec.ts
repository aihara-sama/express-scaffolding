jest.setTimeout(30000);

import request from "supertest";
import app from "../../app";
import { connection, disconnect } from "mongoose";
import faker from "faker";
import { UserModel } from "../../models/user.model";
const server = app.listen(8000);

const userMockData = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.lorem.word(10),
};

describe.only("Auth", () => {
  beforeAll(async () => {
    await UserModel.deleteMany();
    await connection.collection("sessions").drop();
  });
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  afterAll((done) => {
    server.close(() =>
      disconnect().then(() => {
        app.get("mongoStore").close().then(done);
      })
    );
  });
  describe("Register - POST /auth/register", () => {
    it(`Fail: Missing request body fields`, (done) => {
      request(server)
        .post("/auth/register")
        .set({
          "Content-Type": "application/json",
        })
        .expect(400, (err, res) => {
          expect(res.headers["set-cookie"]).toBe(undefined);
          done();
        });
    });
    it(`Fail: An user with this email already exists in database`, (done) => {
      UserModel.create(userMockData).then(() => {
        request(server)
          .post("/auth/register")
          .set({
            "Content-Type": "application/json",
          })
          .send(userMockData)
          .expect(400, async (err, res) => {
            const users = await UserModel.find();
            expect(res.headers["set-cookie"]).toBe(undefined);
            expect(users.length).toBe(1);
            done();
          });
      });
    });
    it(`Success: A new user is added to database`, (done) => {
      request(server)
        .post("/auth/register")
        .set({
          "Content-Type": "application/json",
        })
        .send(userMockData)
        .expect(201, async (err, res) => {
          const user = await UserModel.findOne();
          expect(user).toBeTruthy();
          expect(res.headers["set-cookie"]).toBe(undefined);

          done();
        });
    });
  });
  describe("Login - POST /auth/login", () => {
    it(`Fail: Missing request body fields`, (done) => {
      request(server)
        .post("/auth/login")
        .set({
          "Content-Type": "application/json",
        })
        .expect(400, (err, res) => {
          expect(res.headers["set-cookie"]).toBe(undefined);
          done();
        });
    });
    it(`Fail: Email is incorrect`, (done) => {
      UserModel.create(userMockData).then(() => {
        request(server)
          .post("/auth/login")
          .set({
            "Content-Type": "application/json",
          })
          .send({
            email: "bad email",
            password: userMockData.password,
          })
          .expect(400, (err, res) => {
            expect(res.headers["set-cookie"]).toBe(undefined);
            done();
          });
      });
    });
    it(`Fail: Password is incorrect`, (done) => {
      UserModel.create(userMockData).then(() => {
        request(server)
          .post("/auth/login")
          .set({
            "Content-Type": "application/json",
          })
          .send({
            email: userMockData.email,
            password: "bad password",
          })
          .expect(400, (err, res) => {
            expect(res.headers["set-cookie"]).toBe(undefined);
            done();
          });
      });
    });
    it(`Success: User has logged in`, (done) => {
      UserModel.create(userMockData).then(() => {
        request(server)
          .post("/auth/login")
          .set({
            "Content-Type": "application/json",
          })
          .send({
            email: userMockData.email,
            password: userMockData.password,
          })
          .expect(200, async (err, res) => {
            const sessionsCount = await connection
              .collection("sessions")
              .find()
              .count();
            expect(sessionsCount).toBe(1);
            expect(res.headers["set-cookie"][0]).toContain("connect.sid");

            await connection.collection("sessions").drop();
            done();
          });
      });
    });
  });
  describe("Logout - POST /auth/logout", () => {
    it(`Fail: User in not logged in`, (done) => {
      request(server)
        .post("/auth/logout")
        .set({
          "Content-Type": "application/json",
        })
        .expect(401, (err, res) => {
          expect(res.headers["set-cookie"]).toBe(undefined);
          done();
        });
    });
    it(`Success: User has logged out`, (done) => {
      UserModel.create(userMockData).then(() => {
        request(server)
          .post("/auth/login")
          .set({
            "Content-Type": "application/json",
          })
          .send({
            email: userMockData.email,
            password: userMockData.password,
          })
          .end((err, res) => {
            request(server)
              .post("/auth/logout")
              .set({
                "Content-Type": "application/json",
                Cookie: res.headers["set-cookie"][0],
              })
              .expect(200, (err, res) => {
                expect(res.headers["set-cookie"][0]).toBe(
                  "connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
                );
                done();
              });
          });
      });
    });
  });
});
