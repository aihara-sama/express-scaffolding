import { Types } from "mongoose";
import { IUser } from "../../common/interfaces/user.interface";
import faker from "faker";

export const userStub: Omit<IUser, "password"> & { _id: Types.ObjectId } = {
  _id: new Types.ObjectId(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
};
export const userPasswordStub = faker.lorem.word(10);
