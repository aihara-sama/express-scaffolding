import Joi from "joi";
import { validator } from "../../../middlewares/validator.middleware";
import faker from "faker";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../../common/errors/bad-request.error";
describe("Validator Middleware", () => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  describe("Validator called without schema", () => {
    const req = {
      body: {
        name: faker.name.firstName(),
      },
    };
    const res = {};
    const next = jest.fn();
    const middleware = validator();

    beforeAll(() => {
      middleware(req as Request, res as Response, next as NextFunction);
    });

    it("Expect to call next without parameters", () => {
      expect(next).toBeCalledWith();
    });
  });
  describe("Validator called with a schema", () => {
    describe("Middleware called with right input", () => {
      const req = {
        body: {
          name: faker.name.firstName(),
        },
      };
      const res = {};
      const next = jest.fn();
      const middleware = validator(schema);
      beforeAll(() => {
        middleware(req as Request, res as Response, next as NextFunction);
      });
      it("Expect to call next without parameters", () => {
        expect(next).toBeCalledWith();
      });
    });
    describe("Middleware called with bad input", () => {
      const req = {
        body: {},
      };
      const res = {};
      const next = jest.fn();
      const middleware = validator(schema);
      beforeAll(() => {
        middleware(req as Request, res as Response, next as NextFunction);
      });
      it("Expect to call next with BadRequestError parameter", () => {
        expect(next).toBeCalledWith(new BadRequestError(`"name" is required`));
      });
    });
  });
});
