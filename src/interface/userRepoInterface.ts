import { INewUser, IUser } from "./userInterface";

export interface IUserRepository {
  createUser(userdata: INewUser): Promise<IUser>;
  getUserByEmail(email: string | null | undefined): Promise<IUser | null>;
}
