import { userStub } from "../../tests/stubs/user.stub";

export const createUser = jest.fn().mockResolvedValue(userStub);
export const getUserByCredsOrThrow = jest.fn().mockResolvedValue(userStub);
