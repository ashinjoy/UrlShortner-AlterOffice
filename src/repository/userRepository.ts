import { Model } from "mongoose";
import { INewUser, IUser } from "../interface/userInterface";

export class UserRepository {
  userModel: Model<IUser>;
  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }
  async createUser(userdata: INewUser): Promise<IUser> {
    try {
      return await this.userModel.create(userdata);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getUserByEmail(email:string):Promise<IUser|null>{
    try {
        return await this.userModel.findOne({email})
    } catch (error) {
        console.error(error);
        throw error
    }
  }
}
