import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../../common/errors/bad-request.error";
import { isNotAuth } from "../../../middlewares/is-not-auth.middleware";

describe("IsNotAuth Middleware", () => {
  describe("User session is present", () => {
    const req = {
      session: {
        user: {},
      },
    };
    const res = {};
    const next = jest.fn();

    beforeAll(() => {
      isNotAuth(req as Request, res as Response, next as NextFunction);
    });

    it("Expect to call next with BadRequestError parameter when req.session.user is truthy", () => {
      expect(next).toBeCalledWith(
        new BadRequestError(
          "You must be logged out",
          "connect.sid cookie header should not be present"
        )
      );
    });
  });
  describe("User session is not present", () => {
    const req = {
      session: {},
    };
    const res = {};
    const next = jest.fn();

    beforeAll(() => {
      isNotAuth(req as Request, res as Response, next as NextFunction);
    });

    it("Expect to call next without parameters when req.session.user is falsy", () => {
      expect(next).toBeCalledWith();
    });
  });
});
