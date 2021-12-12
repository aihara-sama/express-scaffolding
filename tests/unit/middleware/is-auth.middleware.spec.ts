import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../../../common/errors/not-authorized.error";
import { isAuth } from "../../../middlewares/is-auth.middleware";

describe("IsAuth Middleware", () => {
  describe("User session is present", () => {
    const req = {
      session: {
        user: {},
      },
    };
    const res = {};
    const next = jest.fn();

    beforeAll(() => {
      isAuth(req as Request, res as Response, next as NextFunction);
    });

    it("Expect to call next without parameters when req.session.user is truthy", () => {
      expect(next).toBeCalledWith();
    });
  });
  describe("User session is not present", () => {
    const req = {
      session: {},
    };
    const res = {};
    const next = jest.fn();

    beforeAll(() => {
      isAuth(req as Request, res as Response, next as NextFunction);
    });

    it("Expect to call next with NotAuthorizedError when req.session.user is falsy", () => {
      expect(next).toBeCalledWith(new NotAuthorizedError());
    });
  });
});
