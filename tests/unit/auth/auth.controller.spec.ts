import { Types } from "mongoose";
import { IUser } from "../../../common/interfaces/user.interface";
import faker from "faker";
import { login, logout, register } from "../../../controllers/auth.controller";
import { Request, Response } from "express";
import {
  createUser,
  getUserByCredsOrThrow,
} from "../../../services/auth.service";

jest.mock("../../../services/auth.service", () =>
  jest.requireActual("../../../__mocks__/services/auth.service")
);

describe("AuthController", () => {
  describe("#register", () => {
    let user: Omit<IUser, "password"> & { _id: Types.ObjectId };
    let req = {
      body: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.lorem.word(10),
      },
    };
    const res = {
      json: jest.fn().mockImplementation((data) => {
        user = data.user;
      }),
      status: jest.fn().mockReturnValue({
        json: jest.fn().mockImplementation((data) => {
          user = data.user;
        }),
      }),
    };

    beforeAll(async () => {
      await register(req as Request, res as unknown as Response, () => {});
    });
    it("Expect user to be defined", () => {
      expect(user).toBeDefined();
    });
    it("Expect createUser to be called with the right parameters", () => {
      expect(createUser).toBeCalledWith(req.body);
    });
    it("Expect res.json to be called with with the right parameters", () => {
      expect(res.status().json).toBeCalledWith({ user });
    });
  });
  describe("#login", () => {
    interface Session {
      user?: Omit<IUser, "password"> & { _id: Types.ObjectId };
    }
    let user: Omit<IUser, "password"> & { _id: Types.ObjectId };
    let req = {
      body: {
        email: faker.internet.email(),
        password: faker.lorem.word(10),
      },
      session: {} as Session,
    };
    const res = {
      json: jest.fn().mockImplementation((data) => {
        user = data.user;
      }),
    };

    beforeAll(async () => {
      await login(
        req as unknown as Request,
        res as unknown as Response,
        () => {}
      );
    });
    it("Expect user to be defined", () => {
      expect(user).toBeDefined();
    });
    it("Expect getUserByCredsOrThrow to be called with the right parameters", () => {
      expect(getUserByCredsOrThrow).toBeCalledWith(
        req.body.email,
        req.body.password
      );
    });
    it("Expect res.json to be called with with the right parameters", () => {
      expect(res.json).toBeCalledWith({ user });
    });
    it("Expect req.session.user to have the logged in user", () => {
      expect(req.session.user).toEqual(user);
    });
  });
  describe("#logout", () => {
    let req = {
      body: {
        email: faker.internet.email(),
        password: faker.lorem.word(10),
      },
      session: {
        destroy: jest.fn().mockImplementation((cb) => {
          cb();
        }),
      },
    };
    const res = {
      json: jest.fn().mockImplementation(() => {}),
      clearCookie: jest.fn().mockImplementation(() => {}),
    };

    beforeAll(async () => {
      logout(req as unknown as Request, res as unknown as Response, () => {});
    });
    it("Expect req.session.destroy to be called", () => {
      expect(req.session.destroy).toBeCalled();
    });
    it("Expect req.clearCookie to be called with the right parameter", () => {
      expect(res.clearCookie).toBeCalledWith("connect.sid");
    });
    it("Expect req.json to be called with the right parameter", () => {
      expect(res.json).toBeCalledWith({
        messsage: "You have successfully logged out",
      });
    });
  });
});
