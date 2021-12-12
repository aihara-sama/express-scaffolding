import { userPasswordStub, userStub } from "../../tests/stubs/user.stub";
import bcrypt from "bcrypt";
export class UserModel {
  static findOne() {}
  static create() {}
  static exists() {}
}
UserModel.exists = jest.fn().mockResolvedValue(false);
UserModel.findOne = jest.fn().mockResolvedValue({
  ...userStub,
  toJSON() {
    return { ...userStub };
  },
  password: bcrypt.hashSync(userPasswordStub, 10),
});
UserModel.create = jest.fn().mockResolvedValue({
  ...userStub,
  toJSON() {
    return { ...userStub };
  },
});
