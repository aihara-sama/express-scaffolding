import bcrypt from "bcrypt";
import faker from "faker";
import { UserModel } from "../../../models/user.model";
import { IRegisterUserDto } from "../../../dto/auth/register-user.dto";
import { userPasswordStub, userStub } from "../../stubs/user.stub";
import {
  createUser,
  getUserByCredsOrThrow,
} from "../../../services/auth.service";

bcrypt.compare = jest.fn().mockResolvedValue(true);

jest.mock("../../../models/user.model", () =>
  jest.requireActual("../../../__mocks__/models/user.model")
);

describe("AuthService", () => {
  describe("#createUser", () => {
    let user;
    const createUserDto: IRegisterUserDto = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.lorem.word(10),
    };
    beforeAll(async () => {
      user = await createUser(createUserDto);
    });

    it("Expect UserModel.exists to be called", () => {
      expect(UserModel.exists).toBeCalledWith({ email: createUserDto.email });
    });
    it("Expect UserModel.create to be called", () => {
      expect(UserModel.create).toBeCalledWith(createUserDto);
    });
    it("Expect createUser to return a user", () => {
      expect(user).toEqual(userStub);
    });
  });
  describe("#getUserByCredsOrThrow", () => {
    let user;
    const email = faker.internet.email();
    const password = userPasswordStub;
    beforeAll(async () => {
      user = await getUserByCredsOrThrow(email, password);
    });

    it("Expect UserModel.findOne to be called", () => {
      expect(UserModel.findOne).toBeCalledWith({ email });
    });
    it("Expect bcrypt.compare to be called", () => {
      expect(bcrypt.compare).toBeCalled();
    });
    it("Expect getUserByCredsOrThrow to return a user", () => {
      expect(user).toEqual(userStub);
    });
  });
});
